'use client'

// // 'use client'

// // import { useState } from 'react'
// // import { motion, AnimatePresence } from 'framer-motion'

// // export const WhyUs = ({ data }: any) => {
// //   const [selected, setSelected] = useState(data.Cards[0])

// //   const descriptionText = data?.description?.root?.children?.[0]?.children?.[0]?.text || ''

// //   return (
// //     <section className="w-full px-5 sm:px-8 md:px-16 py-16 bg-gradient-to-br from-[#0f0f0f] to-black text-white">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header Section */}
// //         <div className="text-left sm:text-center mb-14">
// //           <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500">
// //             {data.heading}
// //           </h2>
// //           <p className="mt-5 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
// //             {descriptionText}
// //           </p>
// //         </div>

// //         <div className="flex flex-col md:flex-row gap-10">
// //           {/* Left List */}
// //           <ul className="space-y-4 md:w-1/2">
// //             {data.Cards.map((card: any) => (
// //               <motion.li
// //                 layout
// //                 key={card.id}
// //                 onClick={() => setSelected(card)}
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 className={`cursor-pointer px-5 py-4 rounded-xl transition-all duration-300 border ${
// //                   selected.id === card.id
// //                     ? 'bg-gradient-to-r from-white via-gray-200 to-white text-black font-bold shadow-xl'
// //                     : 'text-gray-400 hover:text-white hover:bg-gray-900 border-gray-700'
// //                 }`}
// //               >
// //                 {card.heading}
// //               </motion.li>
// //             ))}
// //           </ul>

// //           {/* Right Description */}
// //           <div className="md:w-1/2 text-base text-gray-300 leading-relaxed">
// //             <AnimatePresence mode="wait">
// //               <motion.div
// //                 key={selected.id}
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: -20 }}
// //                 transition={{ duration: 0.4 }}
// //               >
// //                 <p className="text-lg text-gray-200 bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-md">
// //                   {selected.description}
// //                 </p>
// //               </motion.div>
// //             </AnimatePresence>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// export const WhyUs = ({ data }: any) => {
//   const hasValidCards = data?.Cards?.length > 0
//   const [selected, setSelected] = useState(hasValidCards ? data.Cards[0] : null)

//   const descriptionText = data?.description?.root?.children?.[0]?.children?.[0]?.text || ''

//   useEffect(() => {
//     if (hasValidCards && !selected) {
//       setSelected(data.Cards[0])
//     }
//   }, [data])

//   if (!data || !hasValidCards) {
//     return (
//       <section className="w-full px-5 sm:px-8 md:px-16 py-16 bg-gradient-to-br from-[#0f0f0f] to-black text-white">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-100">Why Choose Us</h2>
//           <p className="mt-4 text-gray-400">
//             No data available at the moment. Please try again later.
//           </p>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="w-full px-5 sm:px-8 md:px-16 py-16 bg-gradient-to-br from-[#0f0f0f] to-black text-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-left sm:text-center mb-14">
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500">
//             {data.heading || 'Why Choose Us'}
//           </h2>
//           <p className="mt-5 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             {descriptionText || 'We bring unmatched value and excellence to your business needs.'}
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-10">
//           {/* Left List */}
//           <ul className="space-y-4 md:w-1/2">
//             {data.Cards.map((card: any) => (
//               <motion.li
//                 layout
//                 key={card.id}
//                 onClick={() => setSelected(card)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`cursor-pointer px-5 py-4 rounded-xl transition-all duration-300 border ${
//                   selected?.id === card.id
//                     ? 'bg-gradient-to-r from-white via-gray-200 to-white text-black font-bold shadow-xl'
//                     : 'text-gray-400 hover:text-white hover:bg-gray-900 border-gray-700'
//                 }`}
//               >
//                 {card.heading}
//               </motion.li>
//             ))}
//           </ul>

//           {/* Right Description */}
//           <div className="md:w-1/2 text-base text-gray-300 leading-relaxed">
//             <AnimatePresence mode="wait">
//               {selected && (
//                 <motion.div
//                   key={selected.id}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <p className="text-lg text-gray-200 bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-md">
//                     {selected.description}
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type LexicalTextNode = { text?: string }
type LexicalParagraphNode = { children?: LexicalTextNode[] }
type LexicalRoot = { root?: { children?: LexicalParagraphNode[] } }

type WhyUsCard = {
  id?: string
  heading?: string
  description?: string
  image?: unknown
  images?: unknown[] | null
  imageUrls?: string[] | null
}

type WhyUsData = {
  heading?: string | null
  description?: LexicalRoot | string | null
  cards?: WhyUsCard[] | null
  Cards?: WhyUsCard[] | null
}

type MediaLike = {
  url?: string | null
  filename?: string | null
  alt?: string | null
}

type ImageItem = {
  src?: string
  alt?: string
  label?: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const normalizeCards = (value: unknown): WhyUsCard[] =>
  Array.isArray(value) ? (value.filter(isRecord) as WhyUsCard[]) : []

const getLexicalText = (value: LexicalRoot | string | null | undefined) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  const paragraphs = value?.root?.children
  if (!Array.isArray(paragraphs)) return ''
  const text = paragraphs
    .map((paragraph: LexicalParagraphNode) => {
      if (!Array.isArray(paragraph?.children)) return ''
      return paragraph.children
        .map((child: LexicalTextNode) => (typeof child?.text === 'string' ? child.text : ''))
        .join('')
    })
    .join(' ')
    .trim()
  return text
}

const normalizeKey = (value?: string | null) =>
  (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const normalizeImageSrc = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^[a-zA-Z]:\\/.test(trimmed)) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }
  const cleaned = trimmed.replace(/^\.?\//, '')
  return `/${cleaned}`
}

const resolveMediaUrl = (value: unknown) => {
  if (!value) return ''
  if (typeof value === 'string') return normalizeImageSrc(value)
  const media = value as MediaLike
  if (typeof media?.url === 'string' && media.url.trim()) {
    return normalizeImageSrc(media.url)
  }
  if (typeof media?.filename === 'string' && media.filename.trim()) {
    return normalizeImageSrc(`/media/${media.filename}`)
  }
  return ''
}

const normalizeImageList = (value: unknown) => {
  if (!value) return [] as ImageItem[]
  const list = Array.isArray(value) ? value : [value]
  return list
    .map((entry) => {
      const src = resolveMediaUrl(entry)
      if (!src) return null
      const media = entry as MediaLike
      const alt = typeof media?.alt === 'string' ? media.alt : ''
      return { src, alt } as ImageItem
    })
    .filter((item): item is ImageItem => Boolean(item?.src))
}

const truncateText = (value: string, maxLength = 160) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.length <= maxLength) return trimmed
  const sliced = trimmed.slice(0, maxLength)
  const safeCut = sliced.replace(/\s+\S*$/, '').trim()
  return `${safeCut || sliced}...`
}

const fallbackImageIdeas: Record<string, ImageItem> = {
  'ai-readiness-assessment': {
    label: 'Data Analytics Dashboard',
    src: '/media/businessman-using-fintech-business-intelligence-charts-cloud-computing-blockchain-payments_1313853-62767.jpg',
  },
  'use-case-discovery-prioritization': {
    label: 'Strategy Workshop',
    src: '/media/group-multinational-busy-people-working-office_146671-15661.avif',
  },
  'ai-strategy-roadmap': {
    label: 'Growth Analytics',
    src: '/media/businessman-using-fintech-business-intelligence-charts-cloud-computing-blockchain-payments_1313853-62768.jpg',
  },
  'model-selection-architecture': {
    label: 'Model Architecture',
    src: '/media/software-engr-1.webp',
  },
  'poc-pilot-projects': {
    label: 'Prototype Testing',
    src: '/media/istockphoto-1308639642-612x612-3.jpg',
  },
  'ai-governance-risk-management': {
    label: 'Compliance Checklist',
    src: '/media/istockphoto-1308639642-612x612-4.jpg',
  },
}

const defaultImageIdea: ImageItem = {
  label: 'AI Strategy',
  src: '/media/software-engr-1.webp',
}

const fallbackKeyAliases: Record<string, string> = {
  'proof-of-concept-poc-pilot-projects': 'poc-pilot-projects',
  'proof-of-concept-poc-and-pilot-projects': 'poc-pilot-projects',
  'use-case-discovery-and-prioritization': 'use-case-discovery-prioritization',
  'model-selection-and-architecture': 'model-selection-architecture',
  'ai-governance-and-risk-management': 'ai-governance-risk-management',
}

export const WhyUs = ({
  data,
  useFallback = true,
}: {
  data?: unknown
  useFallback?: boolean
}) => {
  const resolved = isRecord(data) ? (data as WhyUsData) : undefined
  const cards = normalizeCards(resolved?.cards ?? resolved?.Cards)

  const descriptionText =
    getLexicalText(resolved?.description) ||
    (useFallback
      ? 'We provide unmatched quality, support, and innovation to empower your business.'
      : '')
  const heading = resolved?.heading || (useFallback ? 'Why Choose Us' : '')

  const hasContent =
    Boolean(heading) ||
    Boolean(descriptionText) ||
    cards.length > 0

  const resolvedCards = useMemo(
    () =>
      cards.map((card) => {
        const imagesFromCard = [
          ...normalizeImageList(card.images),
          ...normalizeImageList(card.image),
          ...normalizeImageList(card.imageUrls),
        ]
        const key = normalizeKey(card.heading)
        const mappedKey = fallbackKeyAliases[key] || key
        const fallback = fallbackImageIdeas[mappedKey] || defaultImageIdea
        return {
          ...card,
          imageItem: imagesFromCard[0] || fallback,
        }
      }),
    [cards],
  )

  if (!hasContent && !useFallback) return null

  return (
    <section className="w-full px-5 sm:px-8 md:px-16 py-16 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-left sm:text-center mb-14">
          {heading && (
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#A855F7]">
              {heading}
            </h2>
          )}
          {descriptionText && (
            <p className="mt-5 text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              {descriptionText}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resolvedCards.map((card, index) => {
            const imageItem = card.imageItem as ImageItem | undefined
            const title = card.heading || `Item ${index + 1}`
            const description = card.description
              ? truncateText(card.description, 120)
              : 'Details coming soon.'
            return (
              <motion.div
                key={card.id || card.heading || index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-40 w-full bg-slate-100">
                  {imageItem?.src ? (
                    <Image
                      src={imageItem.src}
                      alt={imageItem.alt || imageItem.label || title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized={imageItem.src.startsWith('http')}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-white to-slate-100" />
                  )}
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 text-slate-700 text-xs font-semibold px-3 py-1 shadow">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed min-h-[72px]">
                    {description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
