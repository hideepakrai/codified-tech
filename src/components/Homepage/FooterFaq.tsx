'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { normalizeFaqs } from '@/lib/normalizeFaqs'

type Faq = {
  id: string
  question: string
  answer: unknown
  order?: number
}


const getPlainTextFromLexical = (value: unknown) => {
  if (!value) return ''
  if (typeof value === 'string') return value

  const texts: string[] = []
  const walk = (node: any) => {
    if (!node) return
    if (typeof node.text === 'string') texts.push(node.text)
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }

  walk((value as any)?.root)

  return texts.join(' ').replace(/\s+/g, ' ').trim()
}

const getFaqTagFilters = (pathname?: string | null) => {
  if (!pathname) return []
  const clean = pathname.split('?')[0]?.split('#')[0] ?? ''
  if (clean === '/' || clean === '') return ['home']
  const segments = clean.split('/').filter(Boolean)
  if (segments.length === 0) return ['home']
  const last = segments[segments.length - 1]
  return last ? [last] : []
}

export const FooterFaq = () => {
  const pathname = usePathname()
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const loadFaqs = async () => {
      const tagFilters = getFaqTagFilters(pathname)
      const params = [
        `where[isActive][equals]=true`,
        `sort=order`,
        `depth=1`,
        `limit=200`,
      ]
      const query = `/api/faqs?${params.join('&')}`
      const res = await fetch(query, { cache: 'no-store' })
      if (!res.ok) {
        setFaqs([])
        return
      }
      const data = await res.json()
      const docs = Array.isArray(data?.docs) ? data.docs : []
      setFaqs(
        normalizeFaqs(docs, {
          tagIds: tagFilters.length > 0 ? tagFilters : undefined,
        })
      )
    }

    loadFaqs()
  }, [pathname])

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="w-full px-4 md:px-10 py-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent leading-tight bg-clip-text mb-6 mx-auto text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 mt-8">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-2xl bg-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-lg md:text-xl font-medium focus:outline-none"
              >
                <span className="text-black">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-blue-700" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-gray-700 text-base md:text-lg">
                      {getPlainTextFromLexical(faq.answer)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
