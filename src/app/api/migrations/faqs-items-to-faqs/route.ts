import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ObjectId } from 'mongodb'

type FaqItem = {
  question?: string | null
  answer?: unknown
  tags?: unknown
  isActive?: boolean | null
  order?: number | null
}

type FaqDoc = {
  id: string
  faqs?: FaqItem[] | null
  items?: FaqItem[] | null
  question?: string | null
  answer?: unknown
  tags?: unknown
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

const normalizeTags = (tags: unknown): unknown[] => {
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string') {
    const cleaned = tags.replace(/^example\s*:\s*/i, '')
    return cleaned
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return []
}

const normalizeItem = (item: FaqItem, fallbackTags: unknown) => {
  const question = typeof item.question === 'string' ? item.question.trim() : ''
  const answer = item.answer ?? null
  if (!question && !answer) return null
  return {
    question,
    answer,
    tags: normalizeTags(item.tags ?? fallbackTags),
    isActive: item.isActive,
    order: item.order,
  }
}

const buildFaqs = (doc: FaqDoc) => {
  const fallbackTags = doc.tags

  if (Array.isArray(doc.faqs) && doc.faqs.length > 0) {
    return doc.faqs
      .map((item) => normalizeItem(item, fallbackTags))
      .filter(Boolean)
  }

  if (Array.isArray(doc.items) && doc.items.length > 0) {
    return doc.items
      .map((item) => normalizeItem(item, fallbackTags))
      .filter(Boolean)
  }

  const singleItem = normalizeItem(
    { question: doc.question, answer: doc.answer, tags: doc.tags },
    fallbackTags,
  )

  return singleItem ? [singleItem] : []
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

  const collection = payload.db.collections?.faqs?.collection
  if (!collection) {
    return {
      dryRun,
      totalDocs: allDocs.length,
      error: 'Mongo collection not available.',
    }
  }

  const updates: { id: string; faqsCount: number }[] = []

  for (const doc of allDocs) {
    const faqs = buildFaqs(doc)
    if (faqs.length === 0) continue

    if (!dryRun) {
      await collection.updateOne(
        { _id: new ObjectId(doc.id) },
        {
          $set: { faqs },
          $unset: { items: '', question: '', answer: '', tags: '' },
        },
      )
    }

    updates.push({ id: doc.id, faqsCount: faqs.length })
  }

  return {
    dryRun,
    totalDocs: allDocs.length,
    updatedDocs: updates.length,
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
