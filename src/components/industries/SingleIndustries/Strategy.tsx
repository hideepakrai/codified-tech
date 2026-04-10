'use client'

// DigitalSolutions.tsx

type StrategyService = {
  title?: string
  description?: string
}

type StrategySection = {
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  ctaText?: string | null
  services?: StrategyService[] | null
}

type IndustryInfo = {
  slug?: string | null
  title?: string | null
}

const sanitizeText = (value?: string | null) => (typeof value === 'string' ? value.trim() : '')

const normalizeServices = (services?: StrategyService[] | null) =>
  Array.isArray(services)
    ? services.filter(
        (service) => sanitizeText(service?.title) || sanitizeText(service?.description),
      )
    : []

const normalizeKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const defaultServices: StrategyService[] = [
  {
    title: 'Platform Modernization',
    description:
      'We upgrade legacy systems into scalable, cloud-ready platforms that improve performance and reliability.',
  },
  {
    title: 'Workflow Automation',
    description:
      'We streamline manual processes with intelligent automation, reducing friction and improving speed.',
  },
  {
    title: 'Data & Analytics',
    description:
      'We turn operational data into real-time insights that guide smarter decisions and growth.',
  },
  {
    title: 'Security & Compliance',
    description:
      'We build secure architectures with compliance-ready controls and audit-friendly reporting.',
  },
]

const strategyFallbacks: Record<
  string,
  {
    services: StrategyService[]
    ctaText?: string
    eyebrow?: string
    heading?: string
    description?: string
  }
> = {
  fintech: {
    ctaText: 'Get a Quote',
    services: [
      {
        title: 'Digital Banking Platforms',
        description:
          'Secure, scalable banking experiences with KYC, account management, and personalized user journeys.',
      },
      {
        title: 'Payments & Wallets',
        description:
          'Real-time payments, wallet systems, and reconciliation flows that reduce friction and increase conversion.',
      },
      {
        title: 'Lending & Credit Automation',
        description:
          'Automated underwriting, credit scoring, and loan servicing with integrated risk controls.',
      },
      {
        title: 'Fraud & Risk Intelligence',
        description:
          'AI-driven monitoring, alerts, and compliance reporting that protect transactions and meet regulations.',
      },
    ],
  },
  'healthcare-healthtech': {
    ctaText: 'Get a Quote',
    services: [
      {
        title: 'Telemedicine & Virtual Care',
        description:
          'HIPAA-ready telehealth apps with scheduling, video visits, and care coordination workflows.',
      },
      {
        title: 'EMR & Health Data Platforms',
        description:
          'Interoperable records, data exchange, and clinician dashboards for faster clinical decisions.',
      },
      {
        title: 'Remote Monitoring & IoT',
        description:
          'Connected devices, alerts, and patient monitoring for proactive, continuous care.',
      },
      {
        title: 'Compliance & Security',
        description:
          'Privacy-first architecture, audit trails, and secure access across clinical operations.',
      },
    ],
  },
  'e-commerce-retail': {
    ctaText: 'Get a Quote',
    services: [
      {
        title: 'Omnichannel Storefronts',
        description:
          'Unified web, mobile, and in-store experiences that boost conversion and retention.',
      },
      {
        title: 'Inventory & Order Management',
        description:
          'Real-time inventory, fulfillment, and returns automation across every channel.',
      },
      {
        title: 'Personalization & Loyalty',
        description:
          'AI-driven recommendations, segmentation, and rewards programs that grow lifetime value.',
      },
      {
        title: 'Analytics & Growth Optimization',
        description:
          'Performance dashboards, A/B testing, and funnel insights to scale revenue confidently.',
      },
    ],
  },
  'education-edtech': {
    ctaText: 'Get a Quote',
    services: [
      {
        title: 'Learning Management Platforms',
        description:
          'Flexible LMS solutions with content delivery, progress tracking, and certification paths.',
      },
      {
        title: 'Virtual Classrooms & Collaboration',
        description:
          'Live classes, whiteboards, and collaboration tools built for remote learning at scale.',
      },
      {
        title: 'Assessments & Proctoring',
        description:
          'Secure testing, proctoring, and grading workflows with integrity controls.',
      },
      {
        title: 'Analytics & Engagement',
        description:
          'Insights into learner outcomes, engagement trends, and targeted interventions.',
      },
    ],
  },
  'real-estate-proptech': {
    ctaText: 'Get a Quote',
    services: [
      {
        title: 'Property Listing Platforms',
        description:
          'Searchable listings with lead capture, CRM integration, and advanced filtering.',
      },
      {
        title: 'Virtual Tours & Visualization',
        description:
          'Immersive 3D tours, floorplans, and rich media that increase buyer confidence.',
      },
      {
        title: 'Agent CRM & Workflow',
        description:
          'Lead routing, follow-ups, and deal pipelines to streamline agent productivity.',
      },
      {
        title: 'Smart Property Management',
        description:
          'Maintenance, payments, and tenant communication automation in one platform.',
      },
    ],
  },
}

export const Strategy = ({
  strategy,
  industry,
}: {
  strategy?: StrategySection
  industry?: IndustryInfo
}) => {
  const industryKey = normalizeKey(industry?.slug || industry?.title || '')
  const fallback = strategyFallbacks[industryKey]
  const resolvedEyebrow =
    sanitizeText(strategy?.eyebrow) ||
    sanitizeText(fallback?.eyebrow) ||
    'STRATEGY FOR SUCCESS'
  const resolvedHeading =
    sanitizeText(strategy?.heading) ||
    sanitizeText(fallback?.heading) ||
    `Digital Solutions that Redefine ${industry?.title || 'Your Industry'}`
  const resolvedDescription =
    sanitizeText(strategy?.description) ||
    sanitizeText(fallback?.description) ||
    'We develop intelligent digital systems that future-proof your operations, combining automation, analytics, and connectivity to improve precision, scale confidently, and position your business for long-term success.'
  const resolvedCtaText =
    sanitizeText(strategy?.ctaText) || sanitizeText(fallback?.ctaText) || 'Get a Quote'
  const strategyServices = normalizeServices(strategy?.services)
  const fallbackServices = normalizeServices(fallback?.services)
  const resolvedServices =
    strategyServices.length > 0
      ? strategyServices
      : fallbackServices.length > 0
        ? fallbackServices
        : defaultServices

  const hasStrategy =
    Boolean(resolvedEyebrow) ||
    Boolean(resolvedHeading) ||
    Boolean(resolvedDescription) ||
    resolvedServices.length > 0

  if (!hasStrategy) return null

  return (
    <section className="bg-[#0A0A1A] text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {resolvedEyebrow && (
          <h4 className="text-sm font-bold uppercase text-blue-400 mb-3">{resolvedEyebrow}</h4>
        )}
        {resolvedHeading && (
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            {resolvedHeading}
          </h2>
        )}
        {resolvedDescription && (
          <p className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto mb-8">
            {resolvedDescription}
          </p>
        )}
        {resolvedCtaText && (
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition mb-12">
            {resolvedCtaText}
          </button>
        )}

        {resolvedServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {resolvedServices.map((service: StrategyService, i: number) => (
              <div
                key={i}
                className="bg-gradient-to-b from-[#131326] to-[#1C2732] rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center mb-4">
                  I
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base mb-2">
                  {sanitizeText(service.title) || 'Untitled Service'}
                </h3>
                <hr className="border-gray-600 mb-2" />
                <p className="text-sm text-gray-300 leading-relaxed">
                  {sanitizeText(service.description)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
