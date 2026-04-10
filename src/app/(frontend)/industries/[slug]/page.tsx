import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Industry } from '@/payload-types'

import { SmartAppFramework } from '@/components/industries/SingleIndustries/Miscellenous'
import { SingleIndustryHeroSection } from '@/components/industries/SingleIndustries/SInduhero'
import { Strategy } from '@/components/industries/SingleIndustries/Strategy'
import { WhyUs } from '@/components/ServicesPage/Whyus'
import { Trustedby } from '@/components/Trusted'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

export const revalidate = 0
export const dynamic = 'force-dynamic'

const getMediaUrl = (media: unknown) => {
  if (!media) return null
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    const maybeUrl = (media as { url?: unknown })?.url
    return typeof maybeUrl === 'string' ? maybeUrl : null
  }
  return null
}

const toAbsoluteUrl = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url
  const base = process.env.NEXT_PUBLIC_WEB_URI?.replace(/\/$/, '')
  if (!base) return url
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}

const normalizeSlug = (value: string) => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const compactSlug = (value: string) => normalizeSlug(value).replace(/-/g, '')

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'industries',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  const industry = docs?.[0] as Industry | undefined

  if (!industry) {
    return {
      title: 'Codified Solutions',
      description: DEFAULT_META_DESCRIPTION,
    }
  }

  const metaTitle = industry.meta?.title ?? industry.title ?? 'Codified Solutions'
  const metaDescription =
    industry.meta?.description ??
    industry.shortDescription ??
    DEFAULT_META_DESCRIPTION
  const ogTitle = industry.meta?.ogTitle ?? metaTitle
  const ogDescription = industry.meta?.ogDescription ?? metaDescription
  const ogImage = getMediaUrl(industry.meta?.ogImage ?? industry.meta?.image)

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(ogImage
        ? {
          images: [
            {
              url: toAbsoluteUrl(ogImage),
            },
          ],
        }
        : {}),
      type: 'website',
    },
  }
}

const SingleIndustryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'industries',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  let industry: Industry | null | undefined = docs[0]

  if (!industry) {
    const { docs: allIndustries } = await payload.find({
      collection: 'industries',
      limit: 200,
      depth: 2,
    })

    const requested = normalizeSlug(slug)
    const requestedCompact = compactSlug(slug)

    const industryDocs = allIndustries as Industry[]

    industry =
      industryDocs.find((doc) => {
        const docSlug = normalizeSlug(doc?.slug || '')
        const docTitle = normalizeSlug(doc?.title || '')
        if (docSlug === requested || docTitle === requested) return true

        const docCompact = compactSlug(doc?.slug || '')
        const titleCompact = compactSlug(doc?.title || '')
        return (
          (requestedCompact && docCompact.includes(requestedCompact)) ||
          (requestedCompact && requestedCompact.includes(docCompact)) ||
          (requestedCompact && titleCompact.includes(requestedCompact)) ||
          (requestedCompact && requestedCompact.includes(titleCompact))
        )
      }) || undefined

    if (industry?.slug && industry.slug !== slug) {
      redirect(`/industries/${industry.slug}`)
    }

    if (!industry) {
      return notFound()
    }
  }

  if (!industry) {
    return notFound()
  }

  const industryData = industry as Industry
  const strategySection = industryData.strategySection
  const strategyData = {
    ...strategySection,
    services: strategySection.services ?? undefined,
  }

  return (
    // <section>
    //   <SingleIndustryHeroSection industry={industry} />
    //   <WhyUs data={industryData?.whyUsSection} useFallback />
    //   <Trustedby TrustedBy={industryData?.trustedBySection} useFallback />
    //   <SmartAppFramework industry={industry} />
    //   <Strategy strategy={industryData?.strategySection} industry={industryData} />
    //   <FaqSection faqs={faqs} />
    //   {/* <GamingSports /> */}

    // </section>

    <>




    </>
  )
}

export default SingleIndustryPage
