import Link from 'next/link'

type ServiceItem = {
  id?: string
  title: string
  description?: string | null
  href: string
  icon?: unknown
}

type ServiceIcon = 'ai' | 'web' | 'cloud' | 'marketing'

type ServiceSection = {
  id: string
  label?: string
  heading: string
  subheading?: string | null
  description?: string | null
  bullets?: string[]
  services: ServiceItem[]
  reverse?: boolean
  icon?: ServiceIcon
  exploreHref?: string
  exploreLabel?: string
  cardNote?: string
  categoryImage?: unknown
}

type MediaLike = {
  url?: string | null
  filename?: string | null
  alt?: string | null
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

const resolveMediaAlt = (value: unknown, fallback: string) => {
  if (!value || typeof value === 'string') return fallback
  const media = value as MediaLike
  return typeof media?.alt === 'string' && media.alt.trim() ? media.alt : fallback
}

const iconStyles: Record<ServiceIcon, { gradient: string; ring: string }> = {
  ai: { gradient: 'from-blue-500 to-indigo-500', ring: 'ring-blue-100' },
  web: { gradient: 'from-emerald-500 to-teal-500', ring: 'ring-emerald-100' },
  cloud: { gradient: 'from-sky-500 to-cyan-500', ring: 'ring-sky-100' },
  marketing: { gradient: 'from-amber-500 to-orange-500', ring: 'ring-amber-100' },
}

const ServiceIcon = ({ name }: { name: ServiceIcon }) => {
  const style = iconStyles[name]
  return (
    <div
      className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${style.gradient} text-white shadow-lg ring-8 ${style.ring}`}
    >
      {name === 'ai' && (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor">
          <path
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v4m0 10v4m-7-7h4m10 0h4M7.5 7.5l2.8 2.8m3.4 3.4 2.8 2.8M16.5 7.5l-2.8 2.8m-3.4 3.4-2.8 2.8"
          />
          <circle cx="12" cy="12" r="3.5" strokeWidth="1.6" />
        </svg>
      )}
      {name === 'web' && (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor">
          <path
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M5 10h14v8H5zM8 13l-2 2 2 2M16 13l2 2-2 2"
          />
        </svg>
      )}
      {name === 'cloud' && (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor">
          <path
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 18h9a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.5 2A3.5 3.5 0 0 0 7 18z"
          />
        </svg>
      )}
      {name === 'marketing' && (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor">
          <path
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 14l6-6 4 4 6-6M4 20h16"
          />
        </svg>
      )}
    </div>
  )
}

export const ServiceList = ({ section }: { section: ServiceSection }) => {
  const accent = section.icon ? iconStyles[section.icon] : iconStyles.ai
  const dynamicServices = section.services.slice(0, 4)
  const listItems = dynamicServices.length > 0
    ? dynamicServices.map((service) => ({
        label: service.title,
        icon: resolveMediaUrl(service.icon),
      }))
    : (section.bullets || []).map((label) => ({ label, icon: '' }))
  const displayedServices = listItems
  const exploreHref =
    section.exploreHref || section.services[0]?.href || '#'
  const exploreLabel =
    section.exploreLabel || `Explore ${section.heading} ->`
  const cardNote =
    section.cardNote || 'Trusted delivery that blends strategy, design, and engineering.'
  const categoryImageSrc = resolveMediaUrl(section.categoryImage)
  const categoryImageAlt = resolveMediaAlt(section.categoryImage, section.heading)
  const hasListIcons = displayedServices.some((item) => Boolean(item.icon))

  return (
    <section id={section.id} className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 lg:p-12 shadow-[0_18px_45px_-40px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-40px_rgba(15,23,42,0.4)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-10 lg:gap-16">
            <div className={section.reverse ? 'lg:order-2' : ''}>
              <div className="rounded-3xl border border-slate-100 bg-white shadow-lg overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100">
                  {categoryImageSrc ? (
                    <img
                      src={categoryImageSrc}
                      alt={categoryImageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <ServiceIcon name={section.icon || 'ai'} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {section.label}
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    {cardNote}
                  </p>
                </div>
              </div>
            </div>

            <div className={section.reverse ? 'lg:order-1' : ''}>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  {section.label}
                </p>
                <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] font-semibold text-slate-900">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="text-lg font-medium text-slate-700">
                    {section.subheading}
                  </p>
                )}
                {section.description && (
                  <p className="text-slate-600 leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>

              {displayedServices.length > 0 && (
                <ul
                  className={`mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 ${
                    hasListIcons ? 'list-none pl-0' : 'list-disc pl-5'
                  }`}
                >
                  {displayedServices.map((service) => (
                    <li
                      key={service.label}
                      className={hasListIcons ? 'flex items-center gap-3' : 'pl-1'}
                    >
                      {hasListIcons && (
                        service.icon ? (
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                            <img
                              src={service.icon}
                              alt={service.label}
                              className="h-4 w-4 object-contain"
                              loading="lazy"
                            />
                          </span>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-slate-300" />
                        )
                      )}
                      <span>{service.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6">
                <Link
                  href={exploreHref}
                  className={`inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800`}
                >
                  {exploreLabel}
                </Link>
              </div>
              <div className={`mt-6 h-1 w-24 rounded-full bg-gradient-to-r ${accent.gradient}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
