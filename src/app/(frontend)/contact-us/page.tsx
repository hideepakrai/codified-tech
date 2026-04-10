import { getPayload } from 'payload'
import config from '@payload-config'
import { ContactForm } from '@/components/Contact/ContactForm'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'
export const dynamic = 'force-dynamic'

const DEFAULT_EMAIL = 'hello@codifiedweb.com'
const DEFAULT_PHONE = '+91 99820 00105'
const DEFAULT_ADDRESS_LINES = [
  '#105, Mohan Nagar',
  'Near SKIT College, Ramnagariya, Jagatpura',
  'Jaipur, Rajasthan, India',
]
const DEFAULT_LOCATION_LINK =
  'https://www.google.com/maps/search/?api=1&query=105+Mohan+Nagar+Jagatpura+Jaipur+Rajasthan'

const splitAddressLines = (address?: string | null) => {
  if (!address) return []
  const lines = address
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  return lines.length ? lines : []
}

export async function generateMetadata() {
  const payloadInstance = await getPayload({ config })
  const data = await payloadInstance.find({
    collection: 'pages',
    where: { slug: { equals: 'contact-us' } },
    limit: 1,
  })

  const page = data.docs?.[0] as
    | { meta?: { title?: string; description?: string }; metaTitle?: string; metaDescription?: string }
    | undefined

  return {
    title: page?.meta?.title ?? page?.metaTitle ?? 'Codified Solutions',
    description:
      page?.meta?.description ?? page?.metaDescription ?? DEFAULT_META_DESCRIPTION,
  }
}

const ContactPage = async () => {
  const payload = await getPayload({ config })

  const [pageResponse, siteSettings] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'contact-us' } },
      limit: 1,
      depth: 1,
    }),
    payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    }),
  ])

  const page = pageResponse?.docs?.[0] as
    | {
        contactPageContent?: {
          heroTitle?: string
          heroHighlight?: string
          heroSubtitle?: string
          contactHeading?: string
          contactDescription?: string
          ctaTitle?: string
          ctaDescription?: string
          ctaButtonLabel?: string
          ctaButtonLink?: string
        }
      }
    | undefined

  const content = page?.contactPageContent
  const contact = (siteSettings as { contact?: Record<string, unknown> } | null)
    ?.contact as {
    email?: string | null
    phone?: string | null
    address?: string | null
    locationLink?: string | null
    locationText?: string | null
  } | null

  const email = contact?.email?.trim() || DEFAULT_EMAIL
  const phone = contact?.phone?.trim() || DEFAULT_PHONE
  const addressLinesRaw = splitAddressLines(contact?.address)
  const addressLines = addressLinesRaw.length
    ? addressLinesRaw
    : DEFAULT_ADDRESS_LINES
  const locationLink =
    contact?.locationLink?.trim() || DEFAULT_LOCATION_LINK
  const locationText = contact?.locationText?.trim() || 'View Location'

  const heroTitle = content?.heroTitle || "Let's Build Something"
  const heroHighlight = content?.heroHighlight || 'Great Together'
  const heroSubtitle =
    content?.heroSubtitle ||
    'Have a project in mind or need expert support? Our team at Codified Tech is ready to help you grow.'
  const contactHeading = content?.contactHeading || 'Contact Information'
  const contactDescription =
    content?.contactDescription ||
    'Reach out to us anytime - we usually respond within 24 hours.'
  const ctaTitle = content?.ctaTitle || 'Ready to Start Your Project?'
  const ctaDescription =
    content?.ctaDescription ||
    "Let's turn your ideas into reality. Connect with our team today and get a free consultation."
  const ctaButtonLabel = content?.ctaButtonLabel || 'Start Your Project'
  const ctaButtonLink = content?.ctaButtonLink || `mailto:${email}`

  return (
    <div className="bg-[#0B0F1A] text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-24 py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {heroTitle}{' '}
            <span className="text-blue-500">{heroHighlight}</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-24 px-6 md:px-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-6xl mx-auto">
          {/* FORM CARD */}
          <ContactForm />

          {/* INFO CARD */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3">{contactHeading}</h3>
              <p className="text-gray-400">{contactDescription}</p>
            </div>

            <div className="space-y-6">
              {/* EMAIL */}
              <p className="text-gray-400">
                <span className="block text-sm uppercase tracking-wide">Email</span>
                <a
                  href={`mailto:${email}`}
                  className="text-lg text-white hover:text-blue-400 transition"
                >
                  {email}
                </a>
              </p>

              {/* PHONE */}
              <p className="text-gray-400">
                <span className="block text-sm uppercase tracking-wide">Phone</span>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="text-lg text-white hover:text-blue-400 transition"
                >
                  {phone}
                </a>
              </p>

              {/* ADDRESS */}
              <p className="text-gray-400">
                <span className="block text-sm uppercase tracking-wide">Address</span>
                <a
                  href={locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition leading-relaxed"
                >
                  {addressLines.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </p>
            </div>

            {locationLink ? (
              <a
                href={locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm"
              >
                {locationText}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-20 px-6 md:px-24 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaTitle}</h2>

          <p className="text-gray-300 mb-8 text-lg">{ctaDescription}</p>

          <a
            href={ctaButtonLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            {ctaButtonLabel}
          </a>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
