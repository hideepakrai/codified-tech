'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
// import { FaPlay } from 'react-icons/fa'
import '../../css/hero3.css'
import type { Media, Testimonial as TestimonialType } from '@/payload-types'

const DEFAULTS = {
  headingPrefix: 'Discover how',
  headingAccent: "we've transformed businesses",
  description:
    'with exceptional user experience design, innovative app development, cutting-edge product optimization, and dedicated ongoing support',
  subheading: 'Exceeding Expectations, Delivering Excellence',
  ratingLabel: 'Clutch',
  ratingValue: '5.0',
  ratingStars: 5,
}

type RichTextNode = {
  type?: string
  text?: string
  children?: RichTextNode[]
}

type RichText = {
  root?: {
    children?: RichTextNode[]
  }
}

type TestimonialsBlock = {
  heading?: string | null
  description?: RichText | string | null
  subheading?: string | null
  ratingLabel?: string | null
  ratingValue?: string | null
  ratingStars?: number | null
  'testimonial data'?: Array<TestimonialType | string> | null
}

const normalizeUrl = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed

  const webBase = process.env.NEXT_PUBLIC_WEB_URI?.replace(/\/$/, '') || ''
  const payloadBase =
    process.env.NEXT_PUBLIC_PAYLOAD_URL?.replace(/\/$/, '') || ''

  if (payloadBase && trimmed.startsWith(payloadBase)) {
    return webBase ? trimmed.replace(payloadBase, webBase) : trimmed.replace(payloadBase, '')
  }

  if (webBase && trimmed.startsWith('/')) {
    return `${webBase}${trimmed}`
  }

  return trimmed
}

const getApiBase = (): string => {
  const payloadBase =
    process.env.NEXT_PUBLIC_PAYLOAD_URL?.replace(/\/$/, '') || ''
  if (!payloadBase) return ''
  if (payloadBase.includes('your-payload-domain.com')) return ''
  return payloadBase
}

const isLikelyId = (value: string) => /^[a-f0-9]{24}$/i.test(value.trim())

const getMediaUrl = (media: unknown): string | null => {
  if (!media) return null
  if (typeof media === 'string') {
    const trimmed = media.trim()
    if (!trimmed || isLikelyId(trimmed)) return null
    return normalizeUrl(trimmed)
  }
  if (typeof media === 'object' && media !== null) {
    const maybeUrl = (media as Media)?.url
    if (typeof maybeUrl === 'string') {
      return normalizeUrl(maybeUrl)
    }
  }
  return null
}

const resolveMediaId = (media: unknown): string | null => {
  if (!media) return null
  if (typeof media === 'string') {
    const trimmed = media.trim()
    return trimmed && isLikelyId(trimmed) ? trimmed : null
  }
  if (typeof media === 'object' && media !== null) {
    const maybeId = (media as { id?: unknown }).id
    if (typeof maybeId === 'string') return maybeId.trim()
  }
  return null
}

const getMediaAlt = (media: unknown): string | null => {
  if (!media || typeof media !== 'object') return null
  const maybeAlt = (media as Media)?.alt
  return typeof maybeAlt === 'string' ? maybeAlt : null
}

const getRichTextParagraphs = (description: unknown): string[] => {
  if (typeof description === 'string') {
    const trimmed = description.trim()
    return trimmed ? [trimmed] : []
  }

  const nodes = (description as RichText | null)?.root?.children
  if (!Array.isArray(nodes)) return []

  const readText = (node?: RichTextNode | RichTextNode[]): string => {
    if (!node) return ''
    if (Array.isArray(node)) return node.map(readText).join(' ')
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) return node.children.map(readText).join(' ')
    return ''
  }

  return nodes
    .map((node) => {
      if (node?.type !== 'paragraph') return ''
      return readText(node.children).replace(/\s+/g, ' ').trim()
    })
    .filter((text) => text.length > 0)
}

const buildStarString = (value: number) => {
  const count = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0
  return count > 0 ? '\u2605'.repeat(count) : ''
}

const normalizeTestimonialText = (value: string) =>
  value.replace(/codified\s*tech/gi, 'Codified').replace(/\s{2,}/g, ' ').trim()

const normalizeCompanyName = (value?: string | null) => {
  if (!value) return value
  return value.replace(/make my website/gi, 'Stratus Innovations').trim()
}

type TestimonialProps = {
  testimonials?: TestimonialsBlock | null
}

export const Testimonial = ({ testimonials }: TestimonialProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [resolvedImages, setResolvedImages] = useState<Record<string, string>>({})
  const [fetchedItems, setFetchedItems] = useState<TestimonialType[]>([])
  const block: TestimonialsBlock = testimonials ?? {}

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const screenWidth = window.innerWidth
    const isLargeScreen = screenWidth >= 1024 // lg breakpoint

    const scrollAmount = isLargeScreen
      ? container.scrollWidth / container.children.length
      : container.offsetWidth

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const relationData = block['testimonial data']
  const baseItems = useMemo(() => {
    if (!Array.isArray(relationData)) return []
    return relationData.filter(
      (entry): entry is TestimonialType => entry !== null && typeof entry === 'object',
    )
  }, [relationData])
  const baseIds = useMemo(() => {
    return new Set(
      baseItems
        .map((item) => (typeof item?.id === 'string' ? item.id : null))
        .filter(Boolean),
    )
  }, [baseItems])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const apiBase = getApiBase()
        const url = apiBase
          ? `${apiBase}/api/testimonials?limit=200&depth=1&sort=-createdAt`
          : '/api/testimonials?limit=200&depth=1&sort=-createdAt'
        const res = await fetch(url)
        if (!res.ok) return
        const data = await res.json()
        const docs = Array.isArray(data?.docs)
          ? data.docs.filter(
            (doc: unknown): doc is TestimonialType =>
              doc !== null &&
              typeof doc === 'object' &&
              typeof (doc as { id?: unknown }).id === 'string',
          )
          : []
        if (!cancelled) {
          setFetchedItems(docs)
        }
      } catch {
        // ignore fetch errors
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const items = useMemo(() => {
    if (!baseItems.length) return fetchedItems
    if (!fetchedItems.length) return baseItems
    const merged = [...baseItems]
    fetchedItems.forEach((item) => {
      const id = typeof item?.id === 'string' ? item.id : null
      if (id && !baseIds.has(id)) merged.push(item)
    })
    return merged
  }, [baseItems, baseIds, fetchedItems])

  const headingRaw =
    typeof block.heading === 'string' ? block.heading.trim() : ''
  const headingParts = headingRaw
    ? headingRaw.split('|').map((part: string) => part.trim()).filter(Boolean)
    : []
  const hasHeading = headingParts.length > 0
  const headingPrefix = hasHeading ? headingParts[0] : DEFAULTS.headingPrefix
  const headingAccent = hasHeading
    ? headingParts.length > 1
      ? headingParts.slice(1).join(' ')
      : ''
    : DEFAULTS.headingAccent

  const descriptionParagraphs = getRichTextParagraphs(block.description)
  const subheading =
    typeof block.subheading === 'string' && block.subheading.trim()
      ? block.subheading.trim()
      : DEFAULTS.subheading
  const ratingLabel =
    typeof block.ratingLabel === 'string' && block.ratingLabel.trim()
      ? block.ratingLabel.trim()
      : DEFAULTS.ratingLabel
  const ratingValue =
    typeof block.ratingValue === 'string' && block.ratingValue.trim()
      ? block.ratingValue.trim()
      : DEFAULTS.ratingValue
  const ratingStars =
    typeof block.ratingStars === 'number' ? block.ratingStars : DEFAULTS.ratingStars

  useEffect(() => {
    if (!items.length) return

    const pending = items
      .map((item) => {
        const directUrl = getMediaUrl(item?.image)
        const mediaId = resolveMediaId(item?.image)
        const key = item?.id || mediaId

        return {
          key,
          directUrl,
          mediaId,
        }
      })
      .filter(
        (entry) => entry?.key && !entry.directUrl && entry.mediaId && isLikelyId(entry.mediaId),
      )

    if (!pending.length) return

    let cancelled = false

    const load = async () => {
      const apiBase = getApiBase()
      const results = await Promise.all(
        pending.map(async (entry) => {
          try {
            const mediaApiUrl = apiBase
              ? `${apiBase}/api/media/${entry.mediaId}`
              : `/api/media/${entry.mediaId}`
            const res = await fetch(mediaApiUrl)
            if (!res.ok) return null
            const data = await res.json()
            const mediaUrl = getMediaUrl(data)
            return mediaUrl ? { key: entry.key, url: mediaUrl } : null
          } catch {
            return null
          }
        }),
      )

      if (cancelled) return

      const next: Record<string, string> = {}
      results.forEach((result) => {
        if (result?.key && result?.url) next[result.key] = result.url
      })

      if (Object.keys(next).length > 0) {
        setResolvedImages((prev) => ({ ...prev, ...next }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [items])

  return (
    <section className="bg-gray-900 text-white py-20 px-5 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {headingPrefix}
            {headingAccent ? (
              <>
                {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {headingAccent}
                </span>
              </>
            ) : null}
          </h2>
          {descriptionParagraphs.length > 0 ? (
            descriptionParagraphs.map((text, index) => (
              <p key={index} className="mt-4 text-md text-gray-300 max-w-3xl">
                {text}
              </p>
            ))
          ) : (
            <p className="mt-4 text-md text-gray-300 max-w-3xl">{DEFAULTS.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
            {subheading}
          </p>
          <p className="flex items-center gap-1 text-white font-bold text-lg">
            {ratingLabel}{' '}
            <span className="text-red-500 text-xl">{ratingValue}</span>
            <span className="text-red-500">{buildStarString(ratingStars)}</span>
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-scroll gap-1 lg:gap-3 py-2 overflow-y-hidden scroll-smooth snap-mandatory custom-scrollbar"
        >
          {items.map((data, i) => {
            const logoKey = data.id || resolveMediaId(data?.image) || ''
            const logoDirect = getMediaUrl(data?.image)
            const logoUrl = logoDirect || (logoKey ? resolvedImages[logoKey] : null)
            const logoAlt =
              getMediaAlt(data.image) ||
              data.testimonialname ||
              data.name ||
              'Client logo'
            const companyName = data?.name
            const personName = data?.testimonialname
            const designation = data?.testimonialposition
            const ratingValue = typeof data?.rating === 'number' ? data.rating : null
            const ratingStars = ratingValue ? buildStarString(ratingValue) : ''
            const normalizedCompanyName = normalizeCompanyName(companyName)
            const displayName = personName || normalizedCompanyName
            const testimonialText = normalizeTestimonialText(data.testimonial || '')

            return (
              <motion.div
                key={data.id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex w-full lg:w-[600px] flex-col rounded-xl overflow-hidden border border-[#222] bg-gradient-to-b from-gray-800 to-gray-700 text-white snap-left flex-none"
              >
                <div className="bg-white border-b border-white/10 flex items-center justify-center px-6 py-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl || '/codified-logo.png'}
                    alt={logoAlt}
                    className="max-w-[70%] max-h-16 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-between p-5">
                  <div>
                    <p className="font-semibold text-white mb-1">
                      {normalizedCompanyName || personName}
                    </p>
                    <p className="text-sm italic text-gray-300 mb-4 leading-relaxed">
                      &ldquo;{testimonialText}&rdquo;
                    </p>
                    {personName ? (
                      <p className="text-sm font-semibold text-white">{personName}</p>
                    ) : null}
                    {designation ? (
                      <p className="text-xs text-gray-400">{designation}</p>
                    ) : null}
                  </div>
                  {ratingStars ? (
                    <p className="text-xs text-red-400 mt-2">{ratingStars}</p>
                  ) : null}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => scroll('left')}
            className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Prev
          </button>
          <button
            onClick={() => scroll('right')}
            className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
