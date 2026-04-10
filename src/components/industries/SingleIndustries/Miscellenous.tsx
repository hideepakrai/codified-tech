'use client'

// SmartAppFramework.tsx

import type { ReactNode } from 'react'
import { FaRobot, FaShieldAlt, FaSyncAlt } from 'react-icons/fa'

type FrameworkFeature = {
  icon?: string | null
  title?: string | null
  description?: string | null
}

type FrameworkSection = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  features?: FrameworkFeature[] | null
}

type IndustryWithFramework = {
  frameworkSection?: FrameworkSection
  title?: string | null
}

const iconMap: Record<string, ReactNode> = {
  robot: <FaRobot className="text-white text-xl" />,
  shield: <FaShieldAlt className="text-white text-xl" />,
  sync: <FaSyncAlt className="text-white text-xl" />,
}

export const SmartAppFramework = ({
  industry,
}: {
  industry?: IndustryWithFramework
}) => {
  const framework = industry?.frameworkSection
  const industryTitle = industry?.title || 'Your Industry'
  const defaultFeatures: FrameworkFeature[] = [
    {
      icon: 'robot',
      title: 'Automation-First Development',
      description:
        'We prioritize automation from the start, streamlining manual processes with intelligent workflows, integrations, and auto-alert systems to reduce delays and boost throughput.',
    },
    {
      icon: 'shield',
      title: 'Reliability-Focused Engineering',
      description:
        'Every feature we build is tested to ensure uptime, durability, and uninterrupted performance under real-world conditions.',
    },
    {
      icon: 'sync',
      title: 'Continuous Process Optimization',
      description:
        'Using analytics and feedback loops, we help teams identify bottlenecks, reduce waste, and make continuous improvements across operations.',
    },
  ]

  const hasFramework =
    Boolean(framework?.eyebrow?.trim()) ||
    Boolean(framework?.heading?.trim()) ||
    Boolean(framework?.description?.trim()) ||
    (framework?.features?.length ?? 0) > 0

  const resolvedFramework = {
    eyebrow:
      framework?.eyebrow?.trim() || (hasFramework ? '' : 'FRAMEWORK FOR SMART APP DEVELOPMENT'),
    heading:
      framework?.heading?.trim() ||
      (hasFramework ? '' : `The Secret Behind Intelligent ${industryTitle} Apps`),
    description:
      framework?.description?.trim() ||
      (hasFramework
        ? ''
        : `TechAhead redefines ${industryTitle} with digital solutions built for speed, scale, and precision, turning data into decisions and complexity into control across your ecosystem. We deliver software that is reliable, responsive, and ready for the real world.`),
    features:
      framework?.features && framework.features.length > 0
        ? framework.features
        : hasFramework
          ? []
          : defaultFeatures,
  }

  const hasContent =
    Boolean(resolvedFramework.eyebrow) ||
    Boolean(resolvedFramework.heading) ||
    Boolean(resolvedFramework.description) ||
    resolvedFramework.features.length > 0

  if (!hasContent) return null

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {resolvedFramework.eyebrow && (
          <h4 className="text-sm font-bold tracking-widest text-black uppercase mb-3">
            {resolvedFramework.eyebrow}
          </h4>
        )}
        {resolvedFramework.heading && (
          <h2 className="text-3xl md:text-5xl font-semibold text-black mb-6">
            {resolvedFramework.heading}
          </h2>
        )}
        {resolvedFramework.description && (
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12">
            {resolvedFramework.description}
          </p>
        )}
        {resolvedFramework.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resolvedFramework.features.map((features: FrameworkFeature, index: number) => (
              <div
                key={index}
                className="bg-blue-50 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                  {iconMap[features.icon || 'robot'] || iconMap.robot}
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{features.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{features.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
