import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound, redirect } from 'next/navigation'
import slugify from 'slugify'

import { Singleserviceheading } from '@/components/ServicesPage/Singleservice'
import { Techstacks } from '@/components/ServicesPage/Techstack'
import { WhyUs } from '@/components/ServicesPage/Whyus'
import { Trustedby } from '@/components/Trusted'
import { Advancetech } from '@/components/ServicesPage/Advancetech'
import type { Page, Service } from '@/payload-types'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

export const dynamic = 'force-dynamic'

/* =========================
   Types
========================= */
type PageParams = {
  slug: string
}

type PageProps = {
  params: Promise<PageParams>
}

/* =========================
   Metadata
========================= */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  const payloadInstance = await getPayload({ config })
  await ensurePayloadConnected(payloadInstance)
  const data = await safeFind(payloadInstance, {
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  const page = await resolvePageBySlug(
    payloadInstance,
    slug,
    data.docs?.[0] as Page | undefined,
  )
  if (page) {
    return {
      title:
        page?.meta?.title ??
        page?.metaTitle ??
        'Codified Solutions',
      description:
        page?.meta?.description ??
        page?.metaDescription ??
        DEFAULT_META_DESCRIPTION,
    }
  }

  const serviceData = await safeFind(payloadInstance, {
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  const service = await resolveServiceBySlug(
    payloadInstance,
    slug,
    serviceData.docs?.[0] as Service | undefined,
  )

  return {
    title: service?.meta?.title ?? service?.title ?? 'Codified Solutions',
    description:
      service?.meta?.description ??
      service?.shortDescription ??
      DEFAULT_META_DESCRIPTION,
  }
}

type LexicalTextNode = { text?: string }
type LexicalParagraphNode = { children?: LexicalTextNode[] }
type LexicalRoot = { root?: { children?: LexicalParagraphNode[] } }

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>

const ensurePayloadConnected = async (payloadInstance: PayloadInstance) => {
  const db = payloadInstance?.db as {
    connect?: (options?: { hotReload?: boolean }) => Promise<void>
    connection?: { readyState?: number }
  }
  if (!db?.connect) return
  if (db?.connection?.readyState === 1) return
  try {
    await db.connect({ hotReload: process.env.NODE_ENV !== 'production' })
  } catch (err) {
    console.error('Payload DB connection failed:', err)
  }
}

const safeFind = async (
  payloadInstance: PayloadInstance,
  args: Parameters<PayloadInstance['find']>[0],
) => {
  try {
    return await payloadInstance.find(args)
  } catch (err) {
    console.error('Payload find failed:', err)
    return { docs: [] } as { docs: unknown[] }
  }
}

const renderLexical = (value: unknown) => {
  if (!value) return null
  if (typeof value === 'string') {
    return <p>{value}</p>
  }

  const paragraphs = Array.isArray((value as LexicalRoot)?.root?.children)
    ? (value as LexicalRoot).root?.children
    : null
  if (!paragraphs) return null

  return paragraphs.map((paragraph, i: number) => {
    if (!Array.isArray(paragraph?.children)) return null
    const text = paragraph.children
      .map((child) => (typeof child?.text === 'string' ? child.text : ''))
      .join('')
      .trim()

    if (!text) return null
    return (
      <p key={i} className="mb-4 text-gray-700 leading-relaxed">
        {text}
      </p>
    )
  })
}

const normalizeSlug = (value: string) =>
  slugify(value, { lower: true, strict: true, trim: true })

const normalizeLoose = (value: string) =>
  normalizeSlug(value).replace(/-/g, '')

const extractSlugSegment = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  const parts = trimmed.split('/').filter(Boolean)
  return parts.length ? parts[parts.length - 1] : trimmed
}

const normalizeForMatch = (value: string) =>
  normalizeSlug(extractSlugSegment(value))

const buildMatchCandidates = (value: string) => {
  const raw = value || ''
  const segment = extractSlugSegment(raw)
  const strict = normalizeSlug(raw)
  const loose = normalizeLoose(raw)
  const strictSegment = normalizeSlug(segment)
  const looseSegment = normalizeLoose(segment)
  return new Set([strict, loose, strictSegment, looseSegment].filter(Boolean))
}

const levenshtein = (a: string, b: string) => {
  if (a === b) return 0
  if (!a) return b.length
  if (!b) return a.length

  const aLen = a.length
  const bLen = b.length
  const dp = Array.from({ length: aLen + 1 }, () => new Array(bLen + 1).fill(0))

  for (let i = 0; i <= aLen; i += 1) dp[i][0] = i
  for (let j = 0; j <= bLen; j += 1) dp[0][j] = j

  for (let i = 1; i <= aLen; i += 1) {
    for (let j = 1; j <= bLen; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      )
    }
  }

  return dp[aLen][bLen]
}

type SluggedDoc = {
  slug?: string | null
  title?: string | null
}

const findFuzzyMatch = <T extends SluggedDoc>(
  docs: T[],
  slug: string,
  maxDistance = 2,
): T | undefined => {
  const normalized = normalizeSlug(slug)
  const normalizedLoose = normalizeLoose(slug)

  let bestDoc: T | undefined
  let bestScore = Number.POSITIVE_INFINITY

  for (const doc of docs) {
    const docSlug = typeof doc?.slug === 'string' ? doc.slug : ''
    const docTitle = typeof doc?.title === 'string' ? doc.title : ''
    const candidates = new Set([
      ...buildMatchCandidates(docSlug),
      ...buildMatchCandidates(docTitle),
    ])

    for (const candidate of candidates) {
      const score = Math.min(
        levenshtein(normalized, candidate),
        levenshtein(normalizedLoose, candidate),
      )
      if (score < bestScore) {
        bestScore = score
        bestDoc = doc
      }
    }
  }

  return bestScore <= maxDistance ? bestDoc : undefined
}

const humanizeSlug = (value: string) =>
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const resolveServiceBySlug = async (
  payloadInstance: PayloadInstance,
  slug: string,
  direct?: Service | null,
): Promise<Service | undefined> => {
  if (direct) return direct
  if (!slug) return undefined

  const { docs } = await safeFind(payloadInstance, {
    collection: 'services',
    limit: 200,
    overrideAccess: true,
  })

  const serviceDocs = docs as Service[]

  const normalized = normalizeSlug(slug)
  const normalizedLoose = normalizeLoose(slug)
  const exactMatch = serviceDocs.find((doc) => {
    const docSlug = typeof doc?.slug === 'string' ? doc.slug : ''
    const docTitle = typeof doc?.title === 'string' ? doc.title : ''
    const slugCandidates = buildMatchCandidates(docSlug)
    const titleCandidates = buildMatchCandidates(docTitle)
    return (
      slugCandidates.has(normalized) ||
      slugCandidates.has(normalizedLoose) ||
      titleCandidates.has(normalized) ||
      titleCandidates.has(normalizedLoose) ||
      normalizeForMatch(docSlug) === normalized ||
      normalizeSlug(docTitle) === normalized
    )
  })

  return exactMatch || findFuzzyMatch(serviceDocs, slug)
}

const resolvePageBySlug = async (
  payloadInstance: PayloadInstance,
  slug: string,
  direct?: Page | null,
): Promise<Page | undefined> => {
  if (direct) return direct
  if (!slug) return undefined

  const { docs } = await safeFind(payloadInstance, {
    collection: 'pages',
    limit: 200,
    overrideAccess: true,
  })

  const pageDocs = docs as Page[]

  const normalized = normalizeSlug(slug)
  const normalizedLoose = normalizeLoose(slug)
  const exactMatch = pageDocs.find((doc) => {
    const docSlug = typeof doc?.slug === 'string' ? doc.slug : ''
    const docTitle = typeof doc?.title === 'string' ? doc.title : ''
    const slugCandidates = buildMatchCandidates(docSlug)
    const titleCandidates = buildMatchCandidates(docTitle)
    return (
      slugCandidates.has(normalized) ||
      slugCandidates.has(normalizedLoose) ||
      titleCandidates.has(normalized) ||
      titleCandidates.has(normalizedLoose) ||
      normalizeForMatch(docSlug) === normalized ||
      normalizeSlug(docTitle) === normalized
    )
  })

  return exactMatch || findFuzzyMatch(pageDocs, slug)
}

/* =========================
   Page
========================= */
const SingleServicesPage = async ({ params }: PageProps) => {
  const { slug } = await params

  const payloadInstance = await getPayload({ config })
  await ensurePayloadConnected(payloadInstance)
  const [pagedata, serviceData] = await Promise.all([
    safeFind(payloadInstance, {
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    }),
    safeFind(payloadInstance, {
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    }),
  ])

  const page = await resolvePageBySlug(
    payloadInstance,
    slug,
    pagedata.docs?.[0] as Page | undefined,
  )
  const service = await resolveServiceBySlug(
    payloadInstance,
    slug,
    serviceData.docs?.[0] as Service | undefined,
  )

  const requested = normalizeSlug(slug)
  if (page?.slug && normalizeSlug(page.slug) !== requested) {
    redirect(`/services/${extractSlugSegment(page.slug)}`)
  }
  if (!page && service?.slug && normalizeSlug(service.slug) !== requested) {
    redirect(`/services/${extractSlugSegment(service.slug)}`)
  }
  if (!page) {
    if (!service) notFound()

    return (
      <section className="px-6 py-16 md:px-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {service.title}
          </h1>
          {service.shortDescription && (
            <p className="text-lg text-gray-600 mb-8">
              {service.shortDescription}
            </p>
          )}
          {service.content && (
            <div className="prose max-w-none">
              {renderLexical(service.content)}
            </div>
          )}
        </div>
      </section>
    )
  }

  // ✅ Normalize blocks
  const blocks = (Array.isArray(page?.blocks) ? page.blocks : []) as NonNullable<
    Page['blocks']
  >
  type PageBlock = NonNullable<Page['blocks']>[number]
  const findBlock = (name: string, type?: string) =>
    blocks.find((block: PageBlock) => block.blockName === name) ??
    (type
      ? blocks.find((block: PageBlock) => block.blockType === type)
      : undefined)

  const heroBlock = findBlock('Hero', 'hero')
  const heroFallback = {
    heading: page?.title ?? service?.title ?? humanizeSlug(slug),
    subheading:
      page?.meta?.description ??
      page?.metaDescription ??
      service?.shortDescription ??
      '',
  }
  const hero = { ...heroFallback, ...(heroBlock || {}) }
  const whyus = findBlock('Why Us')
  const techstack = findBlock('Tech Stack')
  const AdvanceTech = findBlock('Advance Tech')
  const TrustedBy = findBlock('Trustedby')


  return (
    <section className="relative">
      <Singleserviceheading hero={hero} />
      <WhyUs data={whyus} />
      <Techstacks techstack={techstack} />
      <Advancetech AdvanceTech={AdvanceTech} />
      <Trustedby TrustedBy={TrustedBy} />

    </section>
  )
}

export default SingleServicesPage
