import { HeadingSection } from '@/components/ServicesPage/Headingsection'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ServiceList } from '@/components/ServicesPage/ServiceList'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Page, Service } from '@/payload-types'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

type ServiceCategoryKey = NonNullable<Service['category']>

const CATEGORY_ID_MAP: Record<ServiceCategoryKey, string> = {
  ai: 'ai-services',
  web: 'web-development',
  cloud: 'cloud-and-hosting',
  marketing: 'digital-marketing',
}

const DEFAULT_SECTIONS: Array<{
  category: ServiceCategoryKey
  label: string
  heading: string
  subheading: string
  description: string
  bullets: string[]
  cardNote: string
  exploreLabel: string
}> = [
  {
    category: 'ai',
    label: 'AI Services',
    heading: 'AI Services',
    subheading: 'Intelligent Systems for Modern Businesses',
    description:
      'We build AI-powered solutions that enhance efficiency, automate workflows, and enable data-driven decisions at scale.',
    bullets: ['AI Consulting', 'AI Chatbots', 'AI Agents', 'Generative AI'],
    cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
    exploreLabel: 'Explore AI Services ->',
  },
  {
    category: 'web',
    label: 'Web Development',
    heading: 'Web Development',
    subheading: 'High-Performance Digital Platforms',
    description:
      'Custom-built, scalable, and SEO-friendly web solutions designed to deliver seamless user experiences and measurable business results.',
    bullets: ['Frontend Development', 'Backend Systems', 'UI/UX Design', 'CMS Development'],
    cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
    exploreLabel: 'Explore Web Development ->',
  },
  {
    category: 'cloud',
    label: 'Cloud and Hosting',
    heading: 'Cloud and Hosting',
    subheading: 'Secure and Scalable Infrastructure',
    description:
      'From cloud migration to managed hosting, we ensure reliable performance, enhanced security, and operational efficiency.',
    bullets: ['Cloud Migration', 'Managed Hosting', 'DevOps Automation', 'Security & Monitoring'],
    cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
    exploreLabel: 'Explore Cloud and Hosting ->',
  },
  {
    category: 'marketing',
    label: 'Digital Marketing',
    heading: 'Digital Marketing',
    subheading: 'Growth Strategies Backed by Data',
    description:
      'We combine SEO, paid campaigns, and performance analytics to increase visibility, drive traffic, and maximize ROI.',
    bullets: ['SEO Optimization', 'Paid Campaigns', 'Content Strategy', 'Performance Analytics'],
    cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
    exploreLabel: 'Explore Digital Marketing ->',
  },
]

type ServicesPageSection = {
  category?: ServiceCategoryKey | null
  label?: string | null
  heading?: string | null
  subheading?: string | null
  description?: string | null
  cardNote?: string | null
  exploreLabel?: string | null
  exploreLink?: string | null
  bullets?: Array<{ text?: string | null }> | null
  image?: unknown
}

type ServicesPageContent = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroButtons?: Array<{ text?: string | null; link?: string | null }> | null
  sections?: ServicesPageSection[] | null
}

type PageHierarchyItem = {
  id?: string | number
  title?: string | null
  slug?: string | null
}

const normalizePathSegment = (value: string) =>
  value.replace(/^\/+/, '').replace(/\/+$/, '')

const resolvePageHref = (parentSlug?: string | null, childSlug?: string | null) => {
  const child = (childSlug || '').trim()
  if (!child) return '#'
  if (child.includes('/')) {
    return `/${normalizePathSegment(child)}`
  }
  const parent = (parentSlug || '').trim()
  if (!parent) return `/${normalizePathSegment(child)}`
  return `/${normalizePathSegment(parent)}/${normalizePathSegment(child)}`
}

const normalizeBullets = (value?: ServicesPageSection['bullets']) =>
  Array.isArray(value)
    ? value
        .map((item) => (typeof item?.text === 'string' ? item.text.trim() : ''))
        .filter(Boolean)
    : []

const sortServices = (a: Service, b: Service) => {
  const orderA = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY
  const orderB = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY
  if (orderA !== orderB) return orderA - orderB
  return a.title.localeCompare(b.title)
}

export async function generateMetadata() {
  const payloadInstance = await getPayload({ config })
  const pagedata = await payloadInstance.find({
    collection: 'pages',
    where: { slug: { equals: 'services' } },
    limit: 1,
  })

  const page = pagedata.docs?.[0] as Page | undefined

  return {
    title:
      page?.meta?.title ??
      page?.metaTitle ??
      page?.title ??
      'Codified Solutions',
    description:
      page?.meta?.description ??
      page?.metaDescription ??
      DEFAULT_META_DESCRIPTION,
  }
}

const ServicesPage = async () => {
  const payloadInstance = await getPayload({ config })
  const [pagedata, servicesdata] = await Promise.all([
    payloadInstance.find({
      collection: 'pages',
      where: { slug: { equals: 'services' } },
    }),
    payloadInstance.find({
      collection: 'services',
      limit: 200,
      sort: 'order',
    }),
  ])

  if (!pagedata.docs.length) {
    notFound()
  }

  const page = pagedata.docs[0] as Page & {
    servicesPageContent?: ServicesPageContent
  }
  const childResult = await payloadInstance.find({
    collection: 'pages',
    where: {
      parent: { equals: page.id },
    },
    sort: 'order',
    limit: 5,
    overrideAccess: true,
  })
  const children = (childResult.docs || []) as PageHierarchyItem[]
  const services = (servicesdata.docs || []) as Service[]
  const visibleServices = services.filter((service) => service.showInMenu !== false)
  const pageContent = page?.servicesPageContent ?? {}
  const rawSections = Array.isArray(pageContent?.sections) && pageContent.sections.length > 0
    ? pageContent.sections
    : DEFAULT_SECTIONS

  const sections = rawSections.map((rawSection, index) => {
    const categoryKey =
      (rawSection as ServicesPageSection)?.category ||
      DEFAULT_SECTIONS[index]?.category ||
      'ai'
    const fallback = DEFAULT_SECTIONS.find((section) => section.category === categoryKey)
    const categoryServices = visibleServices
      .filter((service) => service.category === categoryKey)
      .sort(sortServices)

    const bullets = normalizeBullets((rawSection as ServicesPageSection)?.bullets)

    return {
      id: CATEGORY_ID_MAP[categoryKey],
      label:
        (rawSection as ServicesPageSection)?.label ||
        fallback?.label ||
        categoryKey,
      heading:
        (rawSection as ServicesPageSection)?.heading ||
        fallback?.heading ||
        categoryKey,
      subheading:
        (rawSection as ServicesPageSection)?.subheading ||
        fallback?.subheading ||
        '',
      description:
        (rawSection as ServicesPageSection)?.description ||
        fallback?.description ||
        '',
      bullets: bullets.length > 0 ? bullets : fallback?.bullets || [],
      cardNote:
        (rawSection as ServicesPageSection)?.cardNote ||
        fallback?.cardNote ||
        '',
      exploreLabel:
        (rawSection as ServicesPageSection)?.exploreLabel ||
        fallback?.exploreLabel ||
        '',
      reverse: index % 2 === 1,
      icon: categoryKey,
      categoryImage:
        (rawSection as ServicesPageSection)?.image,
      exploreHref:
        (rawSection as ServicesPageSection)?.exploreLink ||
        (categoryServices[0]?.slug ? `/services/${categoryServices[0].slug}` : '#'),
      services: categoryServices.map((service) => ({
        id: service.id,
        title: service.title,
        description: service.shortDescription,
        href: service.slug ? `/services/${service.slug}` : '#',
        icon: service.icon,
      })),
    }
  })

  return (
    <>
      <HeadingSection
        title={pageContent?.heroTitle || undefined}
        subtitle={pageContent?.heroSubtitle || undefined}
        buttons={(pageContent?.heroButtons || undefined) as { text?: string; link?: string }[]}
      />
      {children.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 -mt-10 pb-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Browse
                  </p>
                  <Link
                    href={resolvePageHref(null, page.slug)}
                    className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 hover:text-blue-600"
                  >
                    {page.title || 'Services'}
                    <span className="text-slate-400">→</span>
                  </Link>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {children.length} Categories
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {children.map((child, index) => {
                  const key = child.id || child.slug || child.title || index
                  const label = child.title || child.slug || 'Untitled'
                  const href = resolvePageHref(page.slug, child.slug)
                  return (
                    <Link
                      key={key}
                      href={href}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    >
                      <span>{label}</span>
                      <span className="text-slate-400 transition group-hover:text-slate-600">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
      {sections.map((section) => (
        <ServiceList key={section.id} section={section} />
      ))}
    </>
  )
}

export default ServicesPage
