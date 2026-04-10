'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/* ----------------------------------
   Lexical helpers (SAFE)
----------------------------------- */

const getPlainTextFromLexical = (value: unknown): string => {
  if (!value) return ''
  if (typeof value === 'string') return value

  const texts: string[] = []

  const walk = (node: any) => {
    if (!node) return
    if (typeof node.text === 'string') texts.push(node.text)
    if (Array.isArray(node.children)) {
      node.children.forEach(walk)
    }
  }

  walk((value as any)?.root)

  return texts.join(' ').replace(/\s+/g, ' ').trim()
}

const renderLexical = (value: unknown) => {
  if (!value) return null

  // ✅ String support (fallback)
  if (typeof value === 'string') {
    return <p className="mb-2 last:mb-0">{value}</p>
  }

  const paragraphs = (value as any)?.root?.children
  if (!Array.isArray(paragraphs)) return null

  return paragraphs.map((paragraph: any, i: number) => {
    if (!Array.isArray(paragraph?.children)) return null

    const text = paragraph.children
      .map((child: any) =>
        typeof child?.text === 'string' ? child.text : ''
      )
      .join('')

    if (!text) return null

    return (
      <p key={i} className="mb-2 last:mb-0 text-gray-700">
        {text}
      </p>
    )
  })
}

/* ----------------------------------
   TEMP STATIC DATA (safe)
   👉 later replace with CMS props
----------------------------------- */

const faqs = [
  {
    question: 'What services does Codified Solutions offer?',
    answer:
      'We specialize in custom software development, AI/ML solutions, mobile apps, web development, UI/UX design, SEO, and cloud infrastructure.',
  },
  {
    question: 'Do you provide AI integration into existing apps?',
    answer:
      'Yes! We can integrate intelligent AI models like ChatGPT, custom LLMs, or ML workflows into your current product with ease.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We work across industries including healthcare, e-commerce, fintech, logistics, and education, delivering tailored digital solutions.',
  },
  {
    question: 'How do I start a project with Codified Solutions?',
    answer:
      'Simply contact us through our website or drop an email. We’ll schedule a discovery call to understand your needs and goals.',
  },
]

/* ----------------------------------
   Component
----------------------------------- */

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full px-4 md:px-10 py-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-lg md:text-xl font-medium focus:outline-none"
              >
                <span className="text-black">
                  {getPlainTextFromLexical(faq.question)}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-6 h-6 text-blue-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 text-base md:text-lg">
                      {renderLexical(faq.answer)}
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
