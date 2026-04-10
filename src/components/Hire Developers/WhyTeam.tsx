'use client'

import { motion } from 'framer-motion'
import { FaRocket, FaCogs, FaShieldAlt, FaMobileAlt, FaUsers, FaClock } from 'react-icons/fa'

const reasons = [
  {
    icon: FaRocket,
    title: 'Scalable Solutions',
    description: 'Custom-built apps grow with your business—you’ll never outgrow your software.',
  },
  {
    icon: FaCogs,
    title: 'Future‑Proof Tech',
    description: 'We use the latest frameworks for flexibility, performance, and security.',
  },
  {
    icon: FaShieldAlt,
    title: 'Enterprise‑Grade Security',
    description: 'Built-in protections and compliance ensure your data stays safe.',
  },
  {
    icon: FaMobileAlt,
    title: 'UX‑Focused Design',
    description: 'We deliver app–like experiences that delight users and drive engagement.',
  },
  {
    icon: FaUsers,
    title: 'Dedicated Team',
    description: 'Collaborative, expert developers aligned to your goals—no freelancers, no gaps.',
  },
  {
    icon: FaClock,
    title: 'Faster Time‑to‑Market',
    description: 'Our streamlined processes help you launch quicker and smarter.',
  },
]

export const WhyUseOurTeam = () => (
  <section className="bg-gray-100 text-black py-20 px-6 md:px-12 lg:px-20 bg-[#99adff]">
    <div className="max-w-5xl mx-auto text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
        Why Choose Our Development Team?
      </h2>
      <p className="text-lg text-gray-600">
        Unlock business growth with software that’s built for scale, security, and lasting impact.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {reasons.map((r, i) => {
        const Icon = r.icon
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center mb-4">
              <Icon size={24} />
            </div>
            <h3 className="text-xl text-black font-semibold mb-2">{r.title}</h3>
            <p className="text-gray-600 leading-relaxed">{r.description}</p>
          </motion.div>
        )
      })}
    </div>
  </section>
)
