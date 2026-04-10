'use client'

import '../../css/hero3.css'
import { Swipper } from './Swipper'
import { motion } from 'framer-motion'

export const Hero3 = ({ hero3, industries }: any) => {
  if (!hero3) return null

  const heading = hero3?.heading || 'Industry We Serve'
  const subheading = hero3?.subheading || 'Future-ready digital solutions for every sector.'
  const description =
    hero3?.description?.root?.children?.[0]?.children?.[0]?.text ||
    'We empower businesses with intelligent, scalable, and user-first digital solutions.'

  return (
    <section className="box-border text-white bg-gray-900 grid grid-cols-1 gap-12 p-5 py-[80px] md:px-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-5 justify-items-center"
      >
        <div className="max-w-[520px] md:max-w-full flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold relative inline-block w-fit">
            {heading}
            <span className="absolute bottom-0 left-0 h-[3px] w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></span>
          </h1>

          <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            {subheading}
          </h2>

          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </motion.div>

      <Swipper cards={hero3?.Cards || []} industries={industries} />
    </section>
  )
}
