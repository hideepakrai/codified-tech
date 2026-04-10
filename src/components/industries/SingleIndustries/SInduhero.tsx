'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'

export const SingleIndustryHeroSection = ({ industry }: any) => {
  const heroImage = industry?.heroImage || industry?.icon
  const heroImageUrl = heroImage?.url
  const heroImageAlt =
    heroImage?.alt || industry?.title || 'Industry View'
  const heroCtaText = industry?.heroCtaText?.trim()
  const heroCtaLink = industry?.heroCtaLink?.trim()

  return (
    <section className="relative overflow-hidden bg-black min-h-[90vh] flex items-center px-6 py-20">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-800 via-indigo-900 to-black opacity-40"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* <p className="text-sm font-medium text-gray-400">
            <span className="font-bold text-white">Home</span> &gt;{' '}
            <span className="font-bold text-white">Industries</span> &gt; Travel App Development
            Company
          </p> */}

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-6 leading-tight">
            {industry?.heroTitle || industry?.title || 'Industry'}
            <br /> Services
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            {industry?.heroDescription ||
              industry?.shortDescription ||
              'Custom digital solutions built for your industry.'}
          </p>

          {heroCtaText && heroCtaLink ? (
            <motion.a
              href={heroCtaLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md items-center gap-2"
            >
              {heroCtaText} <BsArrowRight />
            </motion.a>
          ) : null}
          {heroCtaText && !heroCtaLink ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md flex items-center gap-2"
            >
              {heroCtaText} <BsArrowRight />
            </motion.button>
          ) : null}
        </motion.div>

        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* <motion.div
            className="absolute -bottom-10 left-0 w-full h-[200px]"
            initial={{ x: '-10%' }}
            animate={{ x: '110%' }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="relative">
              <svg
                viewBox="0 0 300 150"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,100 C100,50 200,150 300,100"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
              <motion.div
                className="absolute left-1/2 bottom-0 text-white text-xl"
                animate={{
                  x: ['-50%', '150%'],
                  }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: 'linear',
                }}
              >
                ✈️
              </motion.div>
            </div>
          </motion.div> */}

          <div className="relative rounded-[50px] border-[16px] border-gray-800 shadow-xl overflow-hidden w-[300px] h-[420px] bg-gray-900">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-[32px]"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
