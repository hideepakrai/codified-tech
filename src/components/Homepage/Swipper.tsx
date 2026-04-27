'use client'

// 'use client'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, Navigation, Pagination } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

// export const Swipper = () => {
//   const data = [
//     {
//       industry: 'Tour & Travel',
//       description:
//         'Modern travel platforms with real-time booking, trip planning, and smart recommendations.',
//     },
//     {
//       industry: 'Food & Restaurant',
//       description:
//         'Delivery apps, QR menus, POS systems, and kitchen management tools for modern dining.',
//     },
//     {
//       industry: 'Healthcare & Fitness',
//       description:
//         'HIPAA-compliant apps, telemedicine, virtual coaching, and health tracking solutions.',
//     },
//     {
//       industry: 'Education & E-Learning',
//       description:
//         'Interactive learning platforms, live classes, LMS, and AI-based adaptive learning.',
//     },
//     {
//       industry: 'Gaming & Sports',
//       description:
//         'Game development, fantasy leagues, real-time stats, and immersive AR/VR features.',
//     },
//     {
//       industry: 'Social Networking',
//       description:
//         'Scalable social platforms with messaging, communities, and AI-driven content feeds.',
//     },
//     {
//       industry: 'Finance & Insurance',
//       description:
//         'Secure fintech solutions including wallets, analytics, KYC, and digital claim systems.',
//     },
//     {
//       industry: 'Ecommerce',
//       description:
//         'B2B/B2C stores, multi-vendor platforms, smart checkout, and CRM-integrated systems.',
//     },
//   ]

//   return (
//     <div className="w-full px-5 py-10 bg-black text-white">
//       <Swiper
//         modules={[Autoplay]}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         loop={true}
//         spaceBetween={20}
//         breakpoints={{
//           0: { slidesPerView: 1.2 },
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 2.5 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 },
//         }}
//       >
//         {data.map((d, index) => (
//           <SwiperSlide key={index}>
//             <div className="h-full w-full flex flex-col gap-3 p-6 rounded-xl border border-gray-700 bg-[#111111]">
//               <span className="size-14 text-xl font-bold rounded-full flex items-center justify-center border-2 border-gray-500">
//                 H
//               </span>
//               <h3 className="text-xl font-semibold">{d.industry}</h3>
//               <p className="text-sm text-gray-300 h-18">{d.description}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   )
// }

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Card = {
  heading?: string
  description?: string
  slug?: string
  button?: Array<{
    'Button Link'?: string
  }>
}

type Industry = {
  title?: string
  slug?: string
}

type Props = {
  cards: Card[]
  industries?: Industry[]
}

const normalizeSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

const resolveIndustrySlug = (card: Card, industries: Industry[] = []) => {
  const cardSlug =
    typeof card?.slug === 'string' ? card.slug.trim() : ''
  if (cardSlug) return cardSlug

  const buttonLink =
    typeof card?.button?.[0]?.['Button Link'] === 'string'
      ? card.button[0]['Button Link']!.trim()
      : ''
  if (buttonLink) {
    if (buttonLink.startsWith('/industries/')) {
      return buttonLink.replace('/industries/', '').split('?')[0].split('#')[0]
    }
  }

  const headingSlug =
    typeof card?.heading === 'string' ? normalizeSlug(card.heading) : ''
  if (!headingSlug) return ''

  if (industries.length) {
    const exact = industries.find(
      (industry) =>
        normalizeSlug(industry?.slug || '') === headingSlug ||
        normalizeSlug(industry?.title || '') === headingSlug,
    )
    if (exact?.slug) return exact.slug

    const partial = industries.find((industry) => {
      const industrySlug = normalizeSlug(industry?.slug || '')
      const industryTitle = normalizeSlug(industry?.title || '')
      return (
        (industrySlug && industrySlug.includes(headingSlug)) ||
        (headingSlug && headingSlug.includes(industrySlug)) ||
        (industryTitle && industryTitle.includes(headingSlug)) ||
        (headingSlug && headingSlug.includes(industryTitle))
      )
    })
    if (partial?.slug) return partial.slug
  }

  return headingSlug
}

export const Swipper = ({ cards = [], industries = [] }: Props) => {
  const [resolvedIndustries, setResolvedIndustries] = useState<Industry[]>(
    industries || [],
  )

  useEffect(() => {
    let mounted = true

    if (industries?.length) {
      setResolvedIndustries(industries)
      return
    }

    const loadIndustries = async () => {
      try {
        const res = await fetch('/api/industries?limit=200', {
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        if (mounted && Array.isArray(data?.docs)) {
          setResolvedIndustries(data.docs)
        }
      } catch (err) {
        // silent: fallback to heading slug
      }
    }

    loadIndustries()

    return () => {
      mounted = false
    }
  }, [industries])

  return (
    <div className="w-full px-5 py-10 text-white">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {cards.map((card, index) => {
          const industrySlug = resolveIndustrySlug(card, resolvedIndustries)

          return (
            <SwiperSlide key={index}>
              <Link
                href={industrySlug ? `/industries/${industrySlug}` : '#'}
                className="block h-full"
              >
                <div className="h-full w-full flex flex-col gap-3 p-6 rounded-xl border border-gray-700 bg-gray-800 shadow transition-all duration-300 hover:scale-105 hover:bg-gray-700 cursor-pointer">
                  <span className="size-14 text-xl font-bold rounded-full flex items-center justify-center border-2 border-gray-500">
                    {card.heading?.charAt(0) || 'H'}
                  </span>
                  <h4 className="text-xl font-semibold">{card.heading}</h4>
                  <p className="text-sm text-gray-300 h-18 text-wrap">
                    {card.description}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
