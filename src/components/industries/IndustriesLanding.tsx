'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Waves from '@/components/ServicesPage/Waves'

type MediaLike = {
  url?: string | null
  filename?: string | null
  alt?: string | null
}

type Industry = {
  id?: string
  title?: string | null
  shortDescription?: string | null
  slug?: string | null
  icon?: MediaLike | string | null
}

type PageHierarchyItem = {
  id?: string | number
  title?: string | null
  slug?: string | null
}

type PageHierarchy = {
  parent?: PageHierarchyItem | null
  children?: PageHierarchyItem[] | null
}

const normalizeImageSrc = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^[a-zA-Z]:\\/.test(trimmed)) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }
  const cleaned = trimmed.replace(/^\.?\//, '')
  return `/${cleaned}`
}

const resolveMediaUrl = (value: unknown) => {
  if (!value) return ''
  if (typeof value === 'string') return normalizeImageSrc(value)
  const media = value as MediaLike
  if (typeof media?.url === 'string' && media.url.trim()) {
    return normalizeImageSrc(media.url)
  }
  if (typeof media?.filename === 'string' && media.filename.trim()) {
    return normalizeImageSrc(`/media/${media.filename}`)
  }
  return ''
}

const getIndustryLabel = (industry: Industry, fallback: string) =>
  industry?.title?.trim() || fallback

const normalizePathSegment = (value: string) =>
  value.replace(/^\/+/, '').replace(/\/+$/, '')

const resolvePageHref = (parentSlug?: string | null, childSlug?: string | null) => {
  const child = (childSlug || '').trim()
  if (!child) return '#'
  if (child.includes('/')) {
    return `/${normalizePathSegment(child)}`
  }
  const parent = (parentSlug || '').trim()
  if (!parent) return `/${normalizePathSegment(child)}`
  return `/${normalizePathSegment(parent)}/${normalizePathSegment(child)}`
}

const challengeMap: Record<
  string,
  { challenges: string[]; solutions: string[] }
> = {
  fintech: {
    challenges: [
      'Regulatory compliance and audit readiness',
      'Secure transactions and data privacy',
      'Fraud prevention at scale',
      'Scalable architecture for spikes in usage',
    ],
    solutions: [
      'Compliance-first workflows with secure data pipelines',
      'Risk scoring models and real-time anomaly detection',
      'Tokenized payments and multi-factor security layers',
      'Cloud-native scaling with high availability',
    ],
  },
  'healthcare-healthtech': {
    challenges: [
      'HIPAA-grade security and privacy',
      'Interoperability with legacy systems',
      'Reliable patient data access',
      'Operational efficiency for care teams',
    ],
    solutions: [
      'Encrypted data stores and access controls',
      'FHIR-based integration layers',
      'Unified patient dashboards',
      'Workflow automation for clinical ops',
    ],
  },
  'e-commerce-retail': {
    challenges: [
      'Personalized experiences at scale',
      'Inventory and fulfillment visibility',
      'Checkout conversion optimization',
      'Omnichannel data consistency',
    ],
    solutions: [
      'AI-driven recommendations',
      'Real-time inventory sync',
      'Frictionless checkout flows',
      'Unified data pipelines',
    ],
  },
}

const timelineSteps = [
  { title: 'Discover', detail: 'Research, insights, strategy' },
  { title: 'Design', detail: 'UX, UI, prototyping' },
  { title: 'Develop', detail: 'Engineering, QA, security' },
  { title: 'Deploy', detail: 'Launch, monitoring' },
  { title: 'Scale', detail: 'Optimization, growth' },
]

const getIndustryPositioning = (industry: Industry, fallback: string) =>
  industry?.shortDescription?.trim() || fallback

const getIndustryIcon = (slug: string) => {
  switch (slug) {
    case 'fintech':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
          <path d="M12 8v8" />
          <path d="M9.5 10.5h5" />
        </svg>
      )
    case 'healthcare-healthtech':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      )
    case 'e-commerce-retail':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 7h12l-1.2 11H7.2L6 7z" />
          <path d="M9 7a3 3 0 0 1 6 0" />
        </svg>
      )
    case 'education-edtech':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h7a3 3 0 0 1 3 3v9H7a3 3 0 0 0-3 3z" />
          <path d="M20 6h-7a3 3 0 0 0-3 3v9h7a3 3 0 0 1 3 3z" />
        </svg>
      )
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 21V8l8-5 8 5v13" />
          <path d="M9 21v-6h6v6" />
        </svg>
      )
  }
}

const caseStudyStats = [
  { value: '1M+', label: 'Users Onboarded' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '45%', label: 'Faster Transactions' },
]

const trustBadges = [
  {
    label: 'ISO 27001 Ready',
    icon: 'shield',
  },
  {
    label: 'GDPR Compliant',
    icon: 'lock',
  },
  {
    label: 'SOC 2 Practices',
    icon: 'shield',
  },
  {
    label: 'PCI DSS Alignment',
    icon: 'lock',
  },
]

const techStack = ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Kubernetes']
const clientLogos = ['FintechOne', 'MediNova', 'RetailHive', 'EduCore']

export const IndustriesLanding = ({
  industries,
  hierarchy,
}: {
  industries: Industry[]
  hierarchy?: PageHierarchy | null
}) => {
  const heroIcons = industries.slice(0, 6)
  const primaryIndustry =
    industries.find((item) => item.slug === 'fintech') || industries[0]
  const industryKey = primaryIndustry?.slug || 'fintech'
  const challengeSet = challengeMap[industryKey] || challengeMap.fintech
  const parent = hierarchy?.parent
  const children = Array.isArray(hierarchy?.children)
    ? hierarchy?.children.filter((child) => child?.title || child?.slug)
    : []

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1224] via-[#0f172a] to-[#0b1b38]" />
        <div className="absolute inset-0 opacity-40">
          <Waves
            lineColor="rgba(255, 255, 255, 0.18)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={30}
            waveAmpY={16}
            friction={0.9}
            tension={0.01}
            maxCursorMove={90}
            xGap={14}
            yGap={40}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-28 text-center text-white">
          <p className="uppercase tracking-[0.35em] text-xs text-blue-200">
            Industries We Serve
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-tight">
            Industries We Transform with Technology
          </h1>
          <p className="mt-4 text-lg text-blue-100/90 max-w-[700px] mx-auto">
            Tailored digital solutions built for your industry’s unique challenges.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/case-studies"
              className="rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              View Case Studies
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Talk to Expert
            </Link>
          </div>

          <div className="mt-10 text-sm text-blue-100/80">
            Trusted by startups & enterprises across fintech, healthcare, and retail.
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {['FintechOne', 'MediNova', 'RetailHive'].map((logo) => (
              <span
                key={logo}
                className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/70"
              >
                {logo}
              </span>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {heroIcons.map((item, index) => {
              const iconUrl = resolveMediaUrl(item.icon)
              const label = getIndustryLabel(item, `Industry ${index + 1}`)
              return (
                <motion.div
                  key={item.id || item.slug || index}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90"
                >
                  {iconUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={iconUrl} alt={label} className="h-6 w-6 object-contain" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-blue-300" />
                  )}
                  <span>{label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center">
            <p className="uppercase tracking-[0.3em] text-xs text-slate-500">
              Industries Overview
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,3.6vw,2.5rem)] font-semibold text-slate-900">
              Industries We Serve
            </h2>
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto text-sm md:text-base">
              Clean, compliance-ready solutions built for scale, stability, and measurable
              outcomes.
            </p>
          </div>

          {parent && children.length > 0 && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-[0_12px_30px_-24px_rgba(15,23,42,0.25)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Browse
                  </p>
                  <Link
                    href={resolvePageHref(null, parent.slug)}
                    className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 hover:text-blue-600"
                  >
                    {parent.title || 'Industries'}
                    <span className="text-slate-400">→</span>
                  </Link>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {children.length} Categories
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {children.map((child, index) => {
                  const key = child.id || child.slug || child.title || index
                  const label = child.title || child.slug || 'Untitled'
                  const href = resolvePageHref(parent.slug, child.slug)
                  return (
                    <Link
                      key={key}
                      href={href}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    >
                      <span>{label}</span>
                      <span className="text-slate-400 transition group-hover:text-slate-600">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex h-full min-h-[190px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_-18px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-20px_rgba(15,23,42,0.22)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-slate-700">
                    {getIndustryIcon(industry.slug ?? '')}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900">{industry.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {industry.shortDescription}
                </p>
                <div className="mt-auto pt-4 text-sm font-medium text-slate-700 flex items-center gap-2">
                  Explore
                  <span className="text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="h-px w-20 bg-gradient-to-r from-blue-500 to-transparent mb-6" />
            <p className="uppercase tracking-[0.3em] text-xs text-blue-500">Industry Challenges</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              Industry Challenges We Solve
            </h2>
            <p className="mt-4 text-slate-600">
              Focused on {getIndustryLabel(primaryIndustry, 'your industry')}.
            </p>
            <ul className="mt-6 space-y-4 text-slate-700">
              {challengeSet.challenges.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            <p className="uppercase tracking-[0.3em] text-xs text-blue-500">Our Solutions</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">
              Outcomes that move the needle
            </h3>
            <ul className="mt-6 space-y-4 text-slate-700">
              {challengeSet.solutions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl bg-[#0f172a] text-white p-10 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.7)]">
            <p className="uppercase tracking-[0.3em] text-xs text-blue-300">Case Study</p>
            <h3 className="mt-4 text-2xl font-semibold">
              How We Helped a Fintech Startup Scale to 1M Users
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudyStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/5 p-4 text-center">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-1 text-xs text-blue-200/80">{stat.label}</div>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-blue-100">
              <li>45% faster transactions</li>
              <li>99.99% uptime</li>
              <li>PCI DSS compliant infrastructure</li>
            </ul>
            <Link
              href="/case-studies"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
            >
              Read Full Case Study →
            </Link>
          </div>
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-blue-500">Industry Impact</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              The results speak for themselves
            </h2>
            <p className="mt-4 text-slate-600">
              Our cross-functional team aligns product strategy, engineering, and analytics to
              deliver measurable outcomes for high-growth teams.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center">
            <p className="uppercase tracking-[0.3em] text-xs text-blue-500">Our Approach</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              Discover to Scale Timeline
            </h2>
          </div>
          <div className="relative mt-12">
            <div className="hidden md:block absolute top-12 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8fafc] text-slate-900">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="uppercase tracking-[0.3em] text-xs text-slate-500">Trust Signals</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900">
              Security & Reliability You Can Trust
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Enterprise-grade security standards powering scalable digital systems.
            </p>
          </motion.div>

          <div className="mt-8 h-px w-24 bg-slate-200 mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="mt-8"
          >
            <div className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">
              Certifications
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_24px_-18px_rgba(15,23,42,0.2)]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    {badge.icon === 'shield' ? (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M17 11V8a5 5 0 0 0-10 0v3" />
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                      </svg>
                    )}
                  </span>
                  {badge.label}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 h-px w-24 bg-slate-200 mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
            className="mt-8"
          >
            <div className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">
              Technologies
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 h-px w-24 bg-slate-200 mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="mt-8"
          >
            <div className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">
              Client Partnerships
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {clientLogos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700"
                >
                  {logo}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
