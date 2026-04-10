'use client'

import { motion } from 'framer-motion'
import { FaRobot, FaBrain, FaCodeBranch, FaRocket, FaChartLine, FaComments } from 'react-icons/fa'
import { ReactElement } from 'react'

export const Hero4 = ({ hero4 }: any) => {
  const icons: ReactElement[] = [
    <FaBrain key="brain" className="text-3xl text-blue-400" />,
    <FaRocket key="rocket" className="text-3xl text-purple-400" />,
    <FaChartLine key="chart" className="text-3xl text-pink-400" />,
    <FaCodeBranch key="branch" className="text-3xl text-green-400" />,
    <FaComments key="chat" className="text-3xl text-yellow-400" />,
    <FaRobot key="robot" className="text-3xl text-red-400" />,
  ]

  return (
    <section className="bg-white text-white py-20 px-6 md:px-30">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent leading-tight bg-clip-text mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {hero4.heading}
        </motion.h2>
        <motion.p
          className="text-gray-700 max-w-3xl mx-auto "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {hero4.subheading}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        {hero4.Cards.map((card: any, idx: number) => (
          <motion.div
            key={card.id}
            className="bg-[#f1f1f1] p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="mb-4">{icons[idx % icons.length]}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{card.heading}</h3>
            <p className="text-gray-700 text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {hero4.Button.length > 0 && (
        <div className="mt-12 text-center">
          <motion.a
            href={hero4.Button[0]['Button Link']}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-md border-2 text-black font-semibold transition-all relative overflow-hidden group inline-block"
            style={{ borderColor: '#4993cd' }}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              {hero4.Button[0]['Button Text']} →
            </span>
            <span
              className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0 z-0"
              style={{ backgroundColor: '#4993cd' }}
            ></span>
          </motion.a>
        </div>
      )}
    </section>
  )
}
