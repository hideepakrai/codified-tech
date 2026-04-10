'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type HireHeroProps = {
  titleLine1?: string
  titleLine2?: string
  subtitle?: string
  ctaLabel?: string
  ctaLink?: string
  imageUrl?: string | null
  imageAlt?: string
}

export const HireHero = ({
  titleLine1 = 'Hire Dedicated Developers',
  titleLine2 = 'That Build with Impact',
  subtitle = 'Scale your team with vetted developers experienced in building modern, scalable, and reliable web, mobile, and enterprise solutions.',
  ctaLabel = 'Get a Free Quote',
  ctaLink,
  imageUrl = 'https://www.4cornerresources.com/wp-content/uploads/2023/10/employment-contract-to-hire-agreement.jpg',
  imageAlt = 'Hire Developers Illustration',
}: HireHeroProps) => {
  return (
    <section className="relative bg-gray-900 overflow-hidden py-24 px-6 sm:px-12 lg:px-20">
      {/* Gradient Blur Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-purple-700/20 rounded-full blur-[180px] z-0" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] z-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="text-white max-w-2xl text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-5xl lg:text-4xl font-extrabold leading-tight"
          >
            {titleLine1}
            {titleLine2 ? (
              <>
                <br />
                {titleLine2}
              </>
            ) : null}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-gray-300 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {ctaLink ? (
              <Link
                href={ctaLink}
                className="mt-8 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {ctaLabel}
              </Link>
            ) : (
              <button className="mt-8 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                {ctaLabel}
              </button>
            )}
          </motion.div>
        </div>

        {/* Optional Developer Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block w-full max-w-md"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto rounded-md"
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
