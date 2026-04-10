import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type FaqItem = {
  question?: string
  answer?: unknown
  tags?: string[]
}

type FaqDoc = {
  id: string
  pageType?: string
  pageSlug?: string
  question?: string
  answer?: unknown
  faqs?: FaqItem[]
  items?: FaqItem[]
  tags?: string[] | string
  isActive?: boolean
  order?: number
  createdAt?: string
}

const getExpectedSecret = () =>
  process.env.MIGRATION_SECRET || process.env.PAYLOAD_SECRET

const isAuthorized = (req: Request) => {
  const expected = getExpectedSecret()
  if (!expected) return false

  const url = new URL(req.url)
  const querySecret = url.searchParams.get('secret')
  const headerSecret = req.headers.get('x-migration-secret')

  return querySecret === expected || headerSecret === expected
}

const normalizeTags = (tags: FaqDoc['tags']) => {
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return []
}

const unionTags = (allTags: string[][]) => {
  const map = new Map<string, string>()
  allTags.flat().forEach((tag) => {
    const key = tag.trim().toLowerCase()
    if (!key) return
    if (!map.has(key)) map.set(key, tag.trim())
  })
  return Array.from(map.values())
}

const sortDocs = (docs: FaqDoc[]) => {
  return [...docs].sort((a, b) => {
    const orderA = Number.isFinite(a.order) ? (a.order as number) : 999999
    const orderB = Number.isFinite(b.order) ? (b.order as number) : 999999
    if (orderA !== orderB) return orderA - orderB

    const timeA = a.createdAt ? Date.parse(a.createdAt) : 0
    const timeB = b.createdAt ? Date.parse(b.createdAt) : 0
    return timeA - timeB
  })
}

const buildFaqs = (docs: FaqDoc[]) => {
  const faqs: FaqItem[] = []

  docs.forEach((doc) => {
    const docFaqs = Array.isArray(doc.faqs) ? doc.faqs : []
    if (docFaqs.length > 0) {
      docFaqs.forEach((item) =>
        faqs.push({
          ...item,
          tags: normalizeTags(item?.tags),
        }),
      )
      return
    }

    const docItems = Array.isArray(doc.items) ? doc.items : []
    if (docItems.length > 0) {
      docItems.forEach((item) =>
        faqs.push({
          ...item,
          tags: normalizeTags(item?.tags),
        }),
      )
      return
    }

    const question =
      typeof doc.question === 'string' ? doc.question.trim() : ''
    const answer = doc.answer
    if (!question && !answer) return
    faqs.push({ question, answer })
  })

  return faqs
}

const pickTargetDoc = (docs: FaqDoc[]) => {
  const withFaqs = docs.find((doc) => Array.isArray(doc.faqs) && doc.faqs.length > 0)
  if (withFaqs) return withFaqs
  const withItems = docs.find(
    (doc) => Array.isArray(doc.items) && doc.items.length > 0,
  )
  return withItems ?? docs[0]
}

const computeActive = (docs: FaqDoc[]) =>
  docs.some((doc) => doc.isActive !== false)

const computeMinOrder = (docs: FaqDoc[]) => {
  const orders = docs
    .map((doc) => doc.order)
    .filter((order): order is number => Number.isFinite(order))
  if (orders.length === 0) return undefined
  return Math.min(...orders)
}

const migrateFaqs = async (dryRun: boolean) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const allDocs: FaqDoc[] = []
  const limit = 100
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'faqs',
      limit,
      page,
    })

    allDocs.push(...(result.docs as FaqDoc[]))

    const hasNextPage =
      typeof result.hasNextPage === 'boolean'
        ? result.hasNextPage
        : page < (result.totalPages ?? page)

    if (!hasNextPage) break
    page += 1
  }

  const groups = new Map<string, FaqDoc[]>()
  const skipped: FaqDoc[] = []

  allDocs.forEach((doc) => {
    if (!doc.pageType || !doc.pageSlug) {
      skipped.push(doc)
      return
    }
    const key = `${doc.pageType}::${doc.pageSlug}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(doc)
  })

  const updates: {
    key: string
    targetId: string
    itemsCount: number
    deactivatedIds: string[]
  }[] = []

  for (const [key, docs] of groups.entries()) {
    const sortedDocs = sortDocs(docs)
    const targetDoc = pickTargetDoc(sortedDocs)
    const faqs = buildFaqs(sortedDocs)
    const tags = unionTags(sortedDocs.map((doc) => normalizeTags(doc.tags)))
    const isActive = computeActive(sortedDocs)
    const minOrder = computeMinOrder(sortedDocs)

    const data: Record<string, unknown> = {}
    if (faqs.length > 0) data.faqs = faqs
    if (tags.length > 0) data.tags = tags
    if (typeof isActive === 'boolean') data.isActive = isActive
    if (typeof minOrder === 'number') data.order = minOrder

    if (!dryRun && Object.keys(data).length > 0) {
      await payload.update({
        collection: 'faqs',
        id: targetDoc.id,
        data,
      })
    }

    const deactivatedIds: string[] = []
    const otherDocs = sortedDocs.filter((doc) => doc.id !== targetDoc.id)
    if (!dryRun) {
      for (const doc of otherDocs) {
        if (doc.isActive === false) continue
        await payload.update({
          collection: 'faqs',
          id: doc.id,
          data: { isActive: false },
        })
        deactivatedIds.push(doc.id)
      }
    } else {
      otherDocs.forEach((doc) => {
        if (doc.isActive === false) return
        deactivatedIds.push(doc.id)
      })
    }

    updates.push({
      key,
      targetId: targetDoc.id,
      itemsCount: faqs.length,
      deactivatedIds,
    })
  }

  return {
    dryRun,
    totalDocs: allDocs.length,
    skippedDocs: skipped.length,
    groups: updates.length,
    updates,
  }
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Unauthorized. Provide ?secret=... or x-migration-secret.' },
      { status: 401 },
    )
  }

  const url = new URL(req.url)
  const dryRun = url.searchParams.get('dryRun') === '1'

  try {
    const result = await migrateFaqs(dryRun)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed.' },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  return GET(req)
}
