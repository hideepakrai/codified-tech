import { getPayload } from 'payload'
import config from '@payload-config'

import { Aboutusheading } from '@/components/aboutus/Aboutusheading'
import { Achiements } from '@/components/aboutus/Achievment'
import { CoreTeamSection } from '@/components/aboutus/Cta'
import { Section2 } from '@/components/aboutus/Section2'
import type { Page } from '@/payload-types'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

export const dynamic = 'force-dynamic'

/* =========================
   Metadata
========================= */
export async function generateMetadata() {
  const payloadInstance = await getPayload({ config })

  const data = await payloadInstance.find({
    collection: 'pages',
    where: { slug: { equals: 'about-us' } },
    limit: 1,
    depth: 1,
  })

  const page = data.docs?.[0]

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

/* =========================
   Page Component
========================= */
const AboutUsPage = async () => {
  const payloadInstance = await getPayload({ config })

  const pagedata = await payloadInstance.find({
    collection: 'pages',
    where: { slug: { equals: 'about-us' } },
    limit: 1,
    depth: 2,
  })

  const page = pagedata.docs?.[0] as Page | undefined
  const blocks = (page?.blocks ?? []) as NonNullable<Page['blocks']>
  type PageBlock = NonNullable<Page['blocks']>[number]
  const hero = blocks.find((block: PageBlock) => block?.blockName === 'hero')
  const achievement = blocks.find(
    (block: PageBlock) => block?.blockName === 'achievement',
  )
  const about_us = blocks.filter(
    (block: PageBlock) => block?.blockName === 'section',
  )
  const cta = blocks.find((block: PageBlock) => block?.blockName === 'cta')

  return (
    <section className="relative text-white">
      <Aboutusheading hero={hero} />
      <Section2 achievement={achievement} />
      <Achiements about_us={about_us} />
      <CoreTeamSection cta={cta} />
    </section>
  )
}

export default AboutUsPage
