'use client'

import { motion } from 'framer-motion'
import Waves from '../ServicesPage/Waves'

interface IndustriesHeroProps {
  industries: any[]
  heading?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}

export const IndustriesHero = ({
  industries,
  heading,
  description,
  ctaText,
  ctaLink,
}: IndustriesHeroProps) => {

  return (
    <>
      {/* <section className="relative text-white py-24 px-6 md:px-16 w-full h-screen  overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-20"
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-screen h-screen bg-[linear-gradient(295deg,_rgb(134,179,249)_60%,_rgb(189,218,251)_100%,_rgb(144,195,250)_100%)] opacity-40 blur-2xl"
        />
      </motion.div>


      <div className="relative z-10 max-w-4xl text-center space-y-6">
        <motion.h1
          initial={{ y: 40, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabol text-white bg-clip-text"
        >
          Empowering Industries with Innovation
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Discover how our digital solutions revolutionize businesses across every industry through
          advanced technology and intelligent automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm md:text-base rounded-full shadow-lg hover:brightness-110 transition-all duration-300">
            Talk with Expert
          </button>
        </motion.div>
      </div>
    </section> */}

      <section className="relative text-white py-24 px-6 md:px-16 w-full h-screen overflow-hidden flex items-center justify-center">
        <Waves
          lineColor="rgba(255, 255, 255, 0.2)"
          backgroundColor="#101828"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />

        {/* Overlay content */}
        <div className="absolute z-10 text-center flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            {heading || 'Transform Your Vision'}
          </h1>

          <p className="text-lg md:text-xl max-w-xl">
            {description ||
              'Discover AI-powered exterior design solutions tailored to your home.'}
          </p>

          {ctaText && (
            <motion.a
              href={ctaLink || '#'}
              className="relative px-6 py-2 border-2 text-white font-medium rounded-md overflow-hidden group cursor-pointer"
              style={{ borderColor: '#4993cd' }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {ctaText}
              </span>
              <span
                className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0 z-0"
                style={{ backgroundColor: '#4993cd' }}
              />
            </motion.a>
          )}
        </div>
      </section>
    </>
  )
}