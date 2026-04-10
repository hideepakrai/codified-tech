'use client'

import { motion } from 'framer-motion'

export const Advancetech = ({ AdvanceTech }: any) => {
  if (!AdvanceTech) return null

  console.log(AdvanceTech)

  const { heading, subheading, description, Cards } = AdvanceTech

  const parsedDescription = description?.root?.children
    ?.map((paragraph: any) => paragraph.children.map((child: any) => child.text).join(''))
    .join('\n')

  return (
    <div className="min-h-screen text-white bg-section font-sans px-4 py-20 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
        {/* Left Side */}
        <div className="md:sticky top-24 h-fit space-y-6">
          <h3 className="text-indigo-400 text-lg tracking-wide uppercase font-medium">
            {subheading}
          </h3>
          <h2 className="text-4xl p-3 pl-0 sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {heading}
          </h2>
          <p className="text-gray-700 text-md">{parsedDescription}</p>
        </div>

        {/* Right Side */}
        <ul className="space-y-10 pr-4">
          {Cards?.map((card: any, i: number) => (
            <li key={card.id} className="p-6 rounded-2xl transition-transform duration-300">
              {card.image && (
                <motion.div
                  whileInView={{ scale: 1.2 }}
                  initial={{ scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="w-10 h-10 relative"
                >
                  <img src={`${card.image.url}`} alt={card.image.alt} className="object-contain" />
                </motion.div>
              )}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-3 text-black">
                {i + 1}. {card.heading}
              </h3>
              <p className="text-lg text-gray-700 mt-2">{card.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
