import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

type FrameworkSection = {
  eyebrow?: string
  heading: string
  description: string
  features?: {
    icon?: 'robot' | 'shield' | 'sync' | null
    title: string
    description: string
  }[]
}

type StrategySection = {
  eyebrow?: string
  heading: string
  description: string
  ctaText?: string
  services?: {
    title: string
    description: string
  }[]
}

type WhyUsSection = {
  heading: string
  description: any
  cards?: {
    heading: string
    description: string
  }[]
}

type TrustedBySection = {
  heading: string
  description: any
  blobcard?: {
    label: string
    value: string
  }[]
  logos?: any[]
}

type SeedIndustry = {
  title: string
  slug: string
  shortDescription: string
  order: number
  heroTitle: string
  heroDescription: string
  heroCtaText: string
  heroCtaLink: string
  frameworkSection: FrameworkSection
  strategySection: StrategySection
  whyUsSection: WhyUsSection
  trustedBySection: TrustedBySection
}

const makeLexical = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const defaultWhyUsCards = [
  {
    heading: 'Industry Expertise',
    description:
      'Deep domain knowledge and proven delivery across complex industry workflows.',
  },
  {
    heading: 'Security & Compliance',
    description:
      'Security-first architecture with compliance-ready controls and audit trails.',
  },
  {
    heading: 'Scalable Architecture',
    description:
      'Systems engineered to scale with users, transactions, and data volume.',
  },
  {
    heading: 'Fast Delivery',
    description:
      'Agile teams delivering measurable outcomes quickly and predictably.',
  },
]

const defaultTrustedBy = {
  heading: 'Trusted by Top Technologies',
  description: makeLexical(
    'We are trusted by leading technologies and enterprises across the globe.',
  ),
  blobcard: [
    { label: '500+', value: 'Happy Clients' },
    { label: '50+', value: 'Team Members' },
    { label: '10+', value: 'Years Experience' },
    { label: '100+', value: 'Projects Completed' },
    { label: '24/7', value: 'Support' },
  ],
}

const buildFramework = (title: string): FrameworkSection => ({
  eyebrow: 'FRAMEWORK FOR SMART APP DEVELOPMENT',
  heading: `The Secret Behind Intelligent ${title} Apps`,
  description:
    `TechAhead redefines ${title} with digital solutions built for speed, scale, and precision, turning data into decisions and complexity into control across your ecosystem. We deliver software that is reliable, responsive, and ready for the real world.`,
  features: [
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
  ],
})

const buildStrategy = (title: string, slug: string): StrategySection => {
  const base = {
    eyebrow: 'STRATEGY FOR SUCCESS',
    heading: `Digital Solutions that Redefine ${title}`,
    description:
      'We develop intelligent digital systems that future-proof your operations, combining automation, analytics, and connectivity to improve precision, scale confidently, and position your business for long-term success.',
    ctaText: 'Get a Quote',
  }

  const bySlug: Record<string, { services: { title: string; description: string }[] }> = {
    fintech: {
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

  return {
    ...base,
    services: bySlug[slug]?.services ?? [],
  }
}

const seedIndustries: SeedIndustry[] = [
  {
    title: 'Fintech',
    slug: 'fintech',
    shortDescription:
      'Banking, payments, lending, wallets, wealth management.',
    order: 1,
    heroTitle: 'Fintech',
    heroDescription:
      'Innovative financial technology solutions transforming the banking and finance sector.',
    heroCtaText: 'Get a Free Quote',
    heroCtaLink: '/contact-us',
    frameworkSection: buildFramework('Fintech'),
    strategySection: buildStrategy('Fintech', 'fintech'),
    whyUsSection: {
      heading: 'Why Choose Us',
      description: makeLexical(
        'We provide unmatched quality, support, and innovation to empower your business.',
      ),
      cards: defaultWhyUsCards,
    },
    trustedBySection: defaultTrustedBy,
  },
  {
    title: 'Healthcare & HealthTech',
    slug: 'healthcare-healthtech',
    shortDescription:
      'EMR systems, telemedicine, diagnostics, health monitoring.',
    order: 2,
    heroTitle: 'Healthcare & HealthTech',
    heroDescription:
      'Secure digital health solutions for modern care delivery and patient outcomes.',
    heroCtaText: 'Get a Free Quote',
    heroCtaLink: '/contact-us',
    frameworkSection: buildFramework('Healthcare & HealthTech'),
    strategySection: buildStrategy('Healthcare & HealthTech', 'healthcare-healthtech'),
    whyUsSection: {
      heading: 'Why Choose Us',
      description: makeLexical(
        'We build compliant, patient-first health tech platforms that scale with care teams.',
      ),
      cards: defaultWhyUsCards,
    },
    trustedBySection: defaultTrustedBy,
  },
  {
    title: 'E-Commerce & Retail',
    slug: 'e-commerce-retail',
    shortDescription:
      'Online stores, POS, inventory, personalized shopping.',
    order: 3,
    heroTitle: 'E-Commerce & Retail',
    heroDescription:
      'Omnichannel commerce experiences with personalization and smart operations.',
    heroCtaText: 'Get a Free Quote',
    heroCtaLink: '/contact-us',
    frameworkSection: buildFramework('E-Commerce & Retail'),
    strategySection: buildStrategy('E-Commerce & Retail', 'e-commerce-retail'),
    whyUsSection: {
      heading: 'Why Choose Us',
      description: makeLexical(
        'We help retailers grow with conversion-focused experiences and operational efficiency.',
      ),
      cards: defaultWhyUsCards,
    },
    trustedBySection: defaultTrustedBy,
  },
  {
    title: 'Education & EdTech',
    slug: 'education-edtech',
    shortDescription:
      'Learning platforms, virtual classrooms, exam portals.',
    order: 4,
    heroTitle: 'Education & EdTech',
    heroDescription:
      'Engaging learning platforms designed for outcomes, access, and scale.',
    heroCtaText: 'Get a Free Quote',
    heroCtaLink: '/contact-us',
    frameworkSection: buildFramework('Education & EdTech'),
    strategySection: buildStrategy('Education & EdTech', 'education-edtech'),
    whyUsSection: {
      heading: 'Why Choose Us',
      description: makeLexical(
        'We create learner-centric platforms with robust analytics and content delivery.',
      ),
      cards: defaultWhyUsCards,
    },
    trustedBySection: defaultTrustedBy,
  },
  {
    title: 'Real Estate & PropTech',
    slug: 'real-estate-proptech',
    shortDescription:
      'Property listings, virtual tours, CRM for agents.',
    order: 5,
    heroTitle: 'Real Estate & PropTech',
    heroDescription:
      'Modern property technology for listings, tours, and agent productivity.',
    heroCtaText: 'Get a Free Quote',
    heroCtaLink: '/contact-us',
    frameworkSection: buildFramework('Real Estate & PropTech'),
    strategySection: buildStrategy('Real Estate & PropTech', 'real-estate-proptech'),
    whyUsSection: {
      heading: 'Why Choose Us',
      description: makeLexical(
        'We build PropTech solutions that streamline sales, leasing, and management.',
      ),
      cards: defaultWhyUsCards,
    },
    trustedBySection: defaultTrustedBy,
  },
]

const isEmptyText = (value: unknown) =>
  value === null || value === undefined || (typeof value === 'string' && value.trim() === '')

const isEmptyArray = (value: unknown) =>
  !Array.isArray(value) || value.length === 0

const isEmptySection = (section: any, keys: string[]) => {
  if (!section || typeof section !== 'object') return true
  return keys.every((key) => {
    const value = (section as Record<string, unknown>)[key]
    if (Array.isArray(value)) return value.length === 0
    return isEmptyText(value)
  })
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const fillDefaults = searchParams.get('fillDefaults') === '1'

    const payload = await getPayload({ config })

    const existing = await payload.find({
      collection: 'industries',
      limit: 200,
    })

    const existingSlugs = new Set(
      existing.docs
        .map((doc) => (typeof doc?.slug === 'string' ? doc.slug : ''))
        .filter(Boolean)
    )

    const toCreate = seedIndustries.filter(
      (industry) => !existingSlugs.has(industry.slug)
    )

    for (const industry of toCreate) {
      await payload.create({
        collection: 'industries',
        data: {
          title: industry.title,
          slug: industry.slug,
          shortDescription: industry.shortDescription,
          showInMenu: true,
          order: industry.order,
          heroTitle: industry.heroTitle,
          heroDescription: industry.heroDescription,
          heroCtaText: industry.heroCtaText,
          heroCtaLink: industry.heroCtaLink,
          frameworkSection: industry.frameworkSection,
          strategySection: industry.strategySection,
          whyUsSection: industry.whyUsSection,
          trustedBySection: industry.trustedBySection,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: `This is the ${industry.title} industry page content.`,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      })
    }

    if (fillDefaults) {
      for (const doc of existing.docs) {
        const slug = typeof doc?.slug === 'string' ? doc.slug : ''
        const defaults = seedIndustries.find((item) => item.slug === slug)
        if (!defaults) continue

        const update: Record<string, unknown> = {}

        if (isEmptyText(doc?.heroTitle)) update.heroTitle = defaults.heroTitle
        if (isEmptyText(doc?.heroDescription)) update.heroDescription = defaults.heroDescription
        if (isEmptyText(doc?.heroCtaText)) update.heroCtaText = defaults.heroCtaText
        if (isEmptyText(doc?.heroCtaLink)) update.heroCtaLink = defaults.heroCtaLink

        if (isEmptySection(doc?.frameworkSection, ['eyebrow', 'heading', 'description']) ||
          isEmptyArray(doc?.frameworkSection?.features)) {
          update.frameworkSection = defaults.frameworkSection
        }

        if (isEmptySection(doc?.strategySection, ['eyebrow', 'heading', 'description']) ||
          isEmptyArray(doc?.strategySection?.services)) {
          update.strategySection = defaults.strategySection
        }

        if (isEmptySection(doc?.whyUsSection, ['heading', 'description']) ||
          isEmptyArray(doc?.whyUsSection?.cards)) {
          update.whyUsSection = defaults.whyUsSection
        }

        if (isEmptySection(doc?.trustedBySection, ['heading', 'description']) &&
          isEmptyArray(doc?.trustedBySection?.blobcard) &&
          isEmptyArray(doc?.trustedBySection?.logos)) {
          update.trustedBySection = defaults.trustedBySection
        }

        if (Object.keys(update).length > 0) {
          await payload.update({
            collection: 'industries',
            id: doc.id,
            data: update,
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${toCreate.length} industries.${fillDefaults ? ' Defaults filled where missing.' : ''}`,
      created: toCreate.map((i) => i.slug),
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed industries',
        details: String(error),
      },
      { status: 500 }
    )
  }
}
