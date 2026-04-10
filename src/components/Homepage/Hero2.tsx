'use client'

import { motion } from 'framer-motion'
import { Cpu, Server, Globe, Layers } from 'lucide-react'

const icons = [Cpu, Server, Globe, Layers]

export const Hero2 = ({ hero2 }: any) => {
  if (!hero2) return null

  const headingLeft = hero2?.['Side-1']?.['Left Heading']
  const descriptionLeft =
    hero2?.['Side-1']?.Description?.root?.children?.[0]?.children?.[0]?.text || ''
  const buttonText = hero2?.['Side-1']?.Button?.[0]?.['Button Text'] || 'Explore Services'

  const blobCard = hero2?.['Side-1']?.blobcard

  const headingRight = hero2?.['Side-2']?.['Right Heading']
  // const descriptionRight =
  //   hero2?.['Side-2']?.Description?.root?.children?.[0]?.children?.[0]?.text || ''
  const cards = hero2?.['Side-2']?.Cards || []

  return (
    <section className="bg-section px-6 py-16 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left Content */}
      <div className="flex flex-col gap-6">
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold leading-tight text-[#4994cc]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {headingLeft}
        </motion.h2>

        <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800">{headingRight}</h3>

        <p className="text-gray-700">{descriptionLeft}</p>

        <div className="flex gap-8 text-center">
          {blobCard.map((d: any, idx: number) => {
            return (
              <div key={idx}>
                <p className="text-4xl font-bold text-black">{d.label}</p>
                <span className="text-sm text-gray-700 font-semibold">{d.value}</span>
              </div>
            )
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-black border-2 border-[#4993cd] rounded-lg overflow-hidden group"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            {buttonText}
          </span>
          <span className="absolute inset-0 w-full h-full bg-[#4993cd] transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0"></span>
        </motion.button>
      </div>

      {/* Right Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card: any, index: number) => {
          const Icon = icons[index % icons.length]
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-3 shadow hover:shadow-[#4994cc]/100 transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#4993cd] bg-transparent">
                <Icon className="w-6 h-6 text-[#4993cd]" />
              </div>
              <h3 className="text-xl font-semibold text-[#000]">{card.heading}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
