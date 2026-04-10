'use client'

import { useEffect, useState } from 'react'

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

const getMediaUrl = (media: any): string | null => {
  if (!media) return null
  if (typeof media === 'string') return normalizeUrl(media)
  if (typeof media === 'object' && typeof media?.url === 'string') {
    return normalizeUrl(media.url)
  }
  return null
}

const isLikelyId = (value: string) => /^[a-f0-9]{24}$/i.test(value.trim())

const resolveMediaId = (media: any): string | null => {
  if (!media) return null
  if (typeof media === 'string') return media.trim() || null
  if (typeof media === 'object') {
    const maybeId = (media as { id?: unknown }).id
    if (typeof maybeId === 'string') return maybeId.trim()
  }
  return null
}

export const CoreTeamSection = ({ cta }: any) => {
  const heading = cta?.heading || 'Meet the Team'
  const buttonText = cta?.Button?.[0]?.['Button Text'] || 'Learn More'
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null)
  const fallbackUrl =
    'https://media.istockphoto.com/id/1359684836/photo/group-of-creative-people-working-together-on-new-project-young-business-men-and-women.jpg?s=2048x2048&w=is&k=20&c=B00Git5LXuSIcz6otQo1tnQBR-WQzZhtIXEGLTVX5bI='

  useEffect(() => {
    const directUrl = getMediaUrl(cta?.image)
    if (directUrl && !isLikelyId(directUrl)) {
      setResolvedUrl(directUrl)
      return
    }

    const mediaId = resolveMediaId(cta?.image)
    if (!mediaId) {
      setResolvedUrl(null)
      return
    }

    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(`/api/media/${mediaId}`)
        if (!res.ok) return
        const data = await res.json()
        const url = getMediaUrl(data)
        if (!cancelled && url) setResolvedUrl(url)
      } catch {
        // ignore fetch errors, fallback will render
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [cta?.image])

  return (
    <section className="relative min-h-[400px] md:min-h-[500px] bg-[#3ef4a5] overflow-hidden px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
        {/* Text Content */}
        <div className="z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-6">
            {heading}
          </h2>
          <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-xl text-lg font-semibold shadow-lg">
            {buttonText}
          </button>
        </div>

        {/* Image with border effects */}
        <div className="relative w-full h-[280px] md:h-[400px]">
          <div className="absolute inset-0 z-0 transform rotate-3 scale-105 rounded-xl border-[6px] border-pink-500"></div>
          <div className="absolute inset-0 z-0 transform -rotate-2 scale-95 rounded-xl border-[6px] border-yellow-400"></div>
          <img
            src={resolvedUrl || fallbackUrl}
            alt="Team"
            className="object-cover w-full h-full relative z-10 rounded-xl"
          />
        </div>
      </div>

      {/* Optional decorative shape */}
      <div className="absolute right-16 top-10 w-24 h-24 bg-blue-800 opacity-60 rotate-45 rounded-lg hidden md:block" />
    </section>
  )
}
