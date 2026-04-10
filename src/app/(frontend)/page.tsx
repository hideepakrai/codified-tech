import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import './styles.css'

import { LandingHero } from '@/components/Homepage/Hero'
import { InfiniteTechScroll } from '@/components/Homepage/InfiniteSlider'
import { Hero2 } from '@/components/Homepage/Hero2'
import { Hero3 } from '@/components/Homepage/Hero3'
import { Hero4 } from '@/components/Homepage/Hero4'
import { Testimonial } from '@/components/Homepage/Testimonial'
import type { Industry, Page } from '@/payload-types'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

export const dynamic = 'force-dynamic'

const getMediaUrl = (media: unknown) => {
  if (!media) return null

  if (typeof media === 'string') {
    return media
  }

  if (typeof media === 'object') {
    const maybeUrl = (media as { url?: unknown })?.url
    return typeof maybeUrl === 'string' ? maybeUrl : null
  }

  return null
}

export async function generateMetadata() {
  try {
    const payloadInstance = await getPayload({ config })
    const data = await payloadInstance.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    const page = data?.docs?.[0]


    // const ogImage = getMediaUrl(page?.openGraph?.ogImage)
    //   ? `${process.env.NEXT_PUBLIC_SITE_URL}${getMediaUrl(
    //     page?.openGraph?.ogImage,
    //   )}`
    //   : `${process.env.NEXT_PUBLIC_SITE_URL}/default-og.jpg`

    const ogImage = "https://codifiedweb.com/wp-content/uploads/2025/06/codified-white-logo.png"

    const metaTitle =
      page?.meta?.title ?? page?.metaTitle ?? 'Codified Solutions'
    const metaDescription =
      page?.meta?.description ??
      page?.metaDescription ??
      DEFAULT_META_DESCRIPTION
    const ogTitle =
      page?.meta?.ogTitle ?? page?.openGraph?.ogTitle ?? metaTitle
    const ogDescription =
      page?.meta?.ogDescription ??
      page?.openGraph?.ogDescription ??
      metaDescription

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: "Logo",
          },
        ],
        type: 'website',
      },
    }
  } catch (error) {

    return {
      title: 'Codified Solutions',
      description: DEFAULT_META_DESCRIPTION,
    }
  }
}

export default async function HomePage() {
  let page: Page | null = null
  let industries: Industry[] = []

  try {
    const payloadInstance = await getPayload({ config })
    const { docs } = await payloadInstance.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    page = docs?.[0] || null

    const { docs: industryDocs } = await payloadInstance.find({
      collection: 'industries',
      where: { showInMenu: { equals: true } },
      sort: 'order',
      limit: 100,
    })
    industries = industryDocs || []
  } catch (error) {
    console.error('Error fetching home page from CMS:', error)
  }

  if (!page) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>Content not available</h1>
        <p>The homepage content is temporarily unavailable.</p>
      </div>
    )
  }

  const blocks = (Array.isArray(page?.blocks) ? page.blocks : []) as NonNullable<
    Page['blocks']
  >
  type PageBlock = NonNullable<Page['blocks']>[number]
  const hero1 = blocks.find((block: PageBlock) => block?.blockType === 'hero')
  const hero2 = blocks.find(
    (block: PageBlock) => block?.blockName === 'Services',
  )
  const hero3 = blocks.find(
    (block: PageBlock) =>
      block?.blockType === 'Single-Column-Section' &&
      block?.blockName === 'Industry',
  )
  const hero4 = blocks.find(
    (block: PageBlock) =>
      block?.blockType === 'Single-Column-Section' &&
      block?.blockName === 'Strategy',
  )
  const testimonial = blocks.find(
    (block: PageBlock) => block?.blockType === 'Testimonials',
  )


  return (
    <>
      {hero1 && <LandingHero hero1={hero1} />}

      <InfiniteTechScroll />

      {hero2 && <Hero2 hero2={hero2} />}
      {hero3 && <Hero3 hero3={hero3} industries={industries} />}
      {hero4 && <Hero4 hero4={hero4} />}
      {testimonial && <Testimonial testimonials={testimonial} />}
    </>
  )
}
