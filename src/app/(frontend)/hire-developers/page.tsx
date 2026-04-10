// app/(frontend)/hire-developers/page.tsx (or your correct path)

import { getPayload } from 'payload'
import config from '@payload-config'
import { HireHero } from '@/components/Hire Developers/Hirehero'
import { HireDeveloperSection } from '@/components/Hire Developers/Hiretech'
import { WhyUseOurTeam } from '@/components/Hire Developers/WhyTeam'
import { Trustedby } from '@/components/Trusted'
import { ServicesSection } from '@/components/industries/Research'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

export const revalidate = 0

const resolveMediaUrl = (media: unknown) => {
  if (!media) return null
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    const maybeUrl = (media as { url?: unknown })?.url
    return typeof maybeUrl === 'string' ? maybeUrl : null
  }
  return null
}

export async function generateMetadata() {
  const payloadInstance = await getPayload({ config })
  const data = await payloadInstance.find({
    collection: 'pages',
    where: { slug: { equals: 'hire-developers' } },
    limit: 1,
  })

  const page = data.docs?.[0] as
    | { meta?: { title?: string; description?: string }; metaTitle?: string; metaDescription?: string }
    | undefined

  return {
    title: page?.meta?.title ?? page?.metaTitle ?? 'Codified Solutions',
    description:
      page?.meta?.description ?? page?.metaDescription ?? DEFAULT_META_DESCRIPTION,
  }
}

const Hiredevelopers = async () => {
  const payload = await getPayload({ config })

  const [industriesResponse, pageResponse] = await Promise.all([
    payload.find({
      collection: 'industries',
      where: {
        showInMenu: { equals: true },
      },
      sort: 'order',
      limit: 200,
    }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'hire-developers' } },
      limit: 1,
      depth: 1,
    }),
  ])

  const industries = industriesResponse?.docs || []
  const page = pageResponse?.docs?.[0] as
    | {
        hireDevelopersPageContent?: {
          heroTitleLine1?: string
          heroTitleLine2?: string
          heroSubtitle?: string
          heroCtaLabel?: string
          heroCtaLink?: string
          heroImage?: unknown
          heroImageAlt?: string
          skillsEyebrow?: string
          skillsHeading?: string
          skills?: Array<{ label?: string; icon?: unknown }>
        }
      }
    | undefined

  const content = page?.hireDevelopersPageContent
  const heroImageUrl = resolveMediaUrl(content?.heroImage)
  const skills =
    content?.skills
      ?.map((skill) => {
        const name = typeof skill?.label === 'string' ? skill.label.trim() : ''
        if (!name) return null
        return {
          name,
          iconUrl: resolveMediaUrl(skill?.icon),
        }
      })
      .filter(Boolean) ?? []

  return (
    <section>
      <HireHero
        titleLine1={content?.heroTitleLine1}
        titleLine2={content?.heroTitleLine2}
        subtitle={content?.heroSubtitle}
        ctaLabel={content?.heroCtaLabel}
        ctaLink={content?.heroCtaLink}
        imageUrl={heroImageUrl}
        imageAlt={content?.heroImageAlt}
      />
      <HireDeveloperSection
        skills={skills as Array<{ name: string; iconUrl?: string | null }>}
        eyebrow={content?.skillsEyebrow}
        heading={content?.skillsHeading}
      />
      <WhyUseOurTeam />

      <ServicesSection industries={industries} />

      <Trustedby />
    </section>
  )
}

export default Hiredevelopers
