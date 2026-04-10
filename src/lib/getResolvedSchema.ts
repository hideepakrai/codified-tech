import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_noStore } from 'next/cache'

const getSchemaValue = (value: unknown) => {
  if (typeof value === 'string') return value.trim() || null
  if (value && typeof value === 'object') {
    try {
      const json = JSON.stringify(value)
      return json.trim() || null
    } catch {
      return null
    }
  }
  return null
}

const normalizePathname = (value: string) => {
  const trimmed = value?.trim() ?? ''
  const withoutQuery = trimmed.split('?')[0]?.split('#')[0] ?? ''
  const clean = withoutQuery.replace(/\/+$/g, '')
  return clean === '' ? '/' : clean
}

const INDUSTRY_SLUG_ALIASES: Record<string, string> = {
  healthtech: 'healthcare-healthtech',
  healthcare: 'healthcare-healthtech',
  edtech: 'education-edtech',
  education: 'education-edtech',
  realestate: 'real-estate-proptech',
  'real-estate': 'real-estate-proptech',
  'e-commerceretail': 'e-commerce-retail',
  'ecommerce-retail': 'e-commerce-retail',
}

const resolveIndustrySlug = (slug: string) => {
  const normalized = slug.trim().toLowerCase()
  return INDUSTRY_SLUG_ALIASES[normalized] || normalized
}

const PAGE_SLUG_ALIASES: Record<string, string[]> = {
  'hire-developers': ['hire-developer', 'hiredevelopers'],
  'contact-us': ['contact', 'contactus'],
}

const findSchema = async (collection: 'pages' | 'services' | 'industries', slug: string) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  const doc = docs?.[0] as
    | { meta?: { schema?: unknown }; seo?: { schema?: unknown }; schema?: unknown }
    | undefined

  return (
    getSchemaValue(doc?.meta?.schema) ||
    getSchemaValue(doc?.seo?.schema) ||
    getSchemaValue(doc?.schema)
  )
}

const resolvePageSchema = async (slug: string) => {
  const primary = await findSchema('pages', slug)
  if (primary) return primary

  const aliases = PAGE_SLUG_ALIASES[slug] || []
  for (const alias of aliases) {
    const found = await findSchema('pages', alias)
    if (found) return found
  }

  const compact = slug.replace(/-/g, '')
  if (compact && compact !== slug) {
    const found = await findSchema('pages', compact)
    if (found) return found
  }

  return null
}

export const resolveSchemaByPath = async (pathname: string) => {
  unstable_noStore()
  const clean = normalizePathname(pathname)

  if (clean === '/') {
    return resolvePageSchema('home')
  }

  if (clean === '/services') {
    return resolvePageSchema('services')
  }

  if (clean.startsWith('/services/')) {
    const slug = clean.replace('/services/', '')
    const [pageSchema, serviceSchema] = await Promise.all([
      resolvePageSchema(slug),
      findSchema('services', slug),
    ])
    return pageSchema || serviceSchema
  }

  if (clean === '/industries') {
    const [pageSchema, industrySchema] = await Promise.all([
      resolvePageSchema('industries'),
      findSchema('industries', 'industries'),
    ])
    return pageSchema || industrySchema
  }

  if (clean.startsWith('/industries/')) {
    const slug = clean.replace('/industries/', '')
    const normalizedSlug = resolveIndustrySlug(slug)
    const pageSchemaPromise = resolvePageSchema(slug)
    const industrySchema =
      (await findSchema('industries', slug)) ||
      (normalizedSlug !== slug ? await findSchema('industries', normalizedSlug) : null)
    const pageSchema = await pageSchemaPromise
    return pageSchema || industrySchema
  }

  const pageSlug = clean.replace(/^\/+/, '')
  return resolvePageSchema(pageSlug || 'home')
}
