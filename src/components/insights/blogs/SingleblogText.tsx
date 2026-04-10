'use client'

import { motion } from 'framer-motion'

export const SingleblogText = () => {
  return (
    <section className="px-4 pb-20 md:px-10 lg:px-32 w-screen mx-auto bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed"
      >
        <p className="mb-6">
          In a world where smartphones have become digital lifelines, mobile app development is no
          longer a luxury&mdash;it&apos;s a necessity. As we move deeper into 2025, the landscape of
          mobile applications continues to evolve at a breathtaking pace, driven by emerging
          technologies and changing user expectations.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Why Mobile App Development Matters</h3>
        <p className="mb-6">
          With over 7 billion mobile users worldwide, mobile apps serve as the gateway to digital
          engagement. From banking to fitness, e-commerce to education, nearly every industry is
          leveraging mobile solutions to enhance user experience and streamline operations.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Key Trends in 2025</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>5G Integration:</strong> Faster speeds and lower latency are enabling more
            immersive mobile experiences.
          </li>
          <li>
            <strong>AI &amp; Machine Learning:</strong> Apps are becoming smarter, providing
            personalized content, predictive analytics, and automation.
          </li>
          <li>
            <strong>Cross-Platform Development:</strong> Frameworks like Flutter and React Native
            continue to gain traction, reducing time-to-market.
          </li>
          <li>
            <strong>Enhanced Security:</strong> With increasing data breaches, security is a top
            priority in app development.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Conclusion</h3>
        <p>
          The future of mobile app development is not just about coding—it&apos;s about creating
          seamless, intuitive, and secure digital experiences. Whether you&apos;re a startup or an
          enterprise, the time to invest in mobile is now.
        </p>
      </motion.div>
    </section>
  )
}
