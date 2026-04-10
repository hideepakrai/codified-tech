'use client'

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLinkedinIn, FaFacebookF, FaArrowUp, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'
import { IoMail, IoCall } from 'react-icons/io5' // Naye icons import kiye
import type { IconType } from 'react-icons'
import { usePathname } from 'next/navigation'
import {
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormRegister,
} from 'react-hook-form'
import { FooterFaq } from './FooterFaq'
import { RiTwitterXFill } from 'react-icons/ri'
import Link from 'next/link'

type FieldType = {
  label: string
  name: string
  blockType?: string
  options?: { label: string; value: string }[]
}

type ContactFormValues = Record<string, unknown>

type FooterSectionLink = {
  label: string
  url: string
}

type FooterSection = {
  sectionKey?: 'about' | 'services' | 'technologies' | 'industries' | 'custom' | null
  title: string
  links?: FooterSectionLink[] | null
}

type FooterSocial = {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter'
  url: string
}

type FooterContact = {
  email?: string | null
  phone?: string | null
  address?: string | null
  locationLink?: string | null
  locationText?: string | null
}

type FooterLogo = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

type FooterData = {
  useDefaultContent?: boolean | null
  sections?: FooterSection[] | null
}

type SiteSettingsData = {
  headerLogo?: string | FooterLogo | null
  footerLogo?: string | FooterLogo | null
  contact?: FooterContact | null
  socialLinks?: FooterSocial[] | null
  tagline?: string | null
  copyright?: string | null
}

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    sectionKey: 'about',
    title: 'About',
    links: [
      { label: 'Our company', url: '/company' },
      { label: 'Core Team', url: '/team' },
      { label: 'Career', url: '/careers' },
      { label: 'CSR', url: '/csr' },
      { label: 'How We Work', url: '/how-we-work' },
    ],
  },

  {
    sectionKey: 'services',
    title: 'Services',
    links: [
      { label: 'iOS App Development', url: '/services/ios-app-development' },
      { label: 'Android App Development', url: '/services/android-app-development' },
      { label: 'Software Development', url: '/services/software-development' },
      { label: 'Ideation & Design', url: '/services/ui-ux-design' },
      { label: 'Mobile App Dev', url: '/services/mobile-app-development' },
      { label: 'Research & Innovation', url: '/services/research-innovation' },
      { label: 'Digital Transformation', url: '/services/digital-transformation' },
    ],
  },
  {
    sectionKey: 'technologies',
    title: 'Technologies',
    links: [
      { label: 'Blockchain', url: '/technologies/blockchain' },
      { label: 'Artificial Intelligence', url: '/technologies/artificial-intelligence' },
      { label: 'Cloud Computing', url: '/technologies/cloud-computing' },
      { label: 'Internet of Things', url: '/technologies/iot' },
      { label: 'Metaverse Development', url: '/technologies/metaverse' },

    ],
  },
  {
    sectionKey: 'industries',
    title: 'Industries',
    links: [
      { label: 'Healthcare', url: '/industries/healthcare-healthtech' },
      { label: 'Education', url: '/industries/education-edtech' },
      { label: 'Finance', url: '/industries/fintech' },
      { label: 'On-Demand', url: '/industries/real-estate-proptech' },
      { label: 'eCommerce', url: '/industries/e-commerce-retail' },
      { label: 'Logistics', url: '/industries/real-estate-proptech' },
    ],
  },
]

const DEFAULT_CONTACT: FooterContact = {
  email: 'hello@codifiedtech.com',
  phone: '(+91) 99820 00105',
  address: '#105, Mohan Nagar, Ramnagariya, Jagatpura, Jaipur. Near SKIT College.',
  locationText: 'View Location',
}

const DEFAULT_SOCIALS: FooterSocial[] = [
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/codified-web-solutions' },
  { platform: 'facebook', url: 'https://www.facebook.com/codifiedweb/' },
  { platform: 'instagram', url: 'https://www.instagram.com/codifiedtech/' },
  { platform: 'twitter', url: 'https://x.com/CodifiedWeb' },
]

const DEFAULT_BOTTOM_TEXT = 'Copyright 2025-2026 Codified Web Solutions'
const DEFAULT_TAGLINE =
  'Full stack mobile (iOS, Android) and web app design and development agency.'

const SOCIAL_ICON_MAP: Record<FooterSocial['platform'], IconType> = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: RiTwitterXFill,
}

const resolveLogo = (logo?: string | FooterLogo | null) => {
  if (logo && typeof logo !== 'string') {
    return {
      url: logo.url || '/codified-logo.png',
      alt: logo.alt || 'Codified Logo',
      width: logo.width || 160,
      height: logo.height || 80,
    }
  }

  return {
    url: '/codified-logo.png',
    alt: 'Codified Logo',
    width: 160,
    height: 80,
  }
}

const CORE_SECTION_KEYS = ['about', 'services', 'technologies', 'industries'] as const
type CoreSectionKey = (typeof CORE_SECTION_KEYS)[number]

const isCoreKey = (value?: string | null): value is CoreSectionKey => {
  return CORE_SECTION_KEYS.includes(value as CoreSectionKey)
}

const titleToKey = (title?: string | null) => {
  const normalized = title?.trim().toLowerCase()
  if (!normalized) return null
  if (normalized === 'about') return 'about'
  if (normalized === 'services') return 'services'
  if (normalized === 'technologies') return 'technologies'
  if (normalized === 'industries') return 'industries'
  return null
}

const normalizeSections = (sections?: FooterSection[] | null) => {
  if (!sections || sections.length === 0) {
    return DEFAULT_SECTIONS
  }

  const coreByKey = new Map<string, FooterSection>()

  for (const section of sections) {
    const key = section.sectionKey
    if (isCoreKey(key)) {
      if (!coreByKey.has(key)) {
        coreByKey.set(key, section)
      }
      continue
    }

    const inferredKey = titleToKey(section.title)
    if (inferredKey && !coreByKey.has(inferredKey)) {
      coreByKey.set(inferredKey, { ...section, sectionKey: inferredKey })
    }
  }

  const coreSections = DEFAULT_SECTIONS.map((section) => {
    const key = section.sectionKey || titleToKey(section.title)
    return (key && coreByKey.get(key)) ?? section
  })

  const extraSections = sections.filter((section) => {
    const key = section.sectionKey
    if (isCoreKey(key)) {
      return false
    }

    const inferredKey = titleToKey(section.title)
    return !inferredKey
  })

  return [...coreSections, ...extraSections]
}

export const Footer = () => {
  const pathname = usePathname()
  const hideContactForm = pathname === '/contact-us' || pathname?.startsWith('/contact-us/')
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null)
  const [industryLinks, setIndustryLinks] = useState<FooterSectionLink[] | null>(null)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const res = await fetch('/api/globals/footer?depth=2')
        const data = await res.json().catch(() => null)
        setFooterData(data)
      } catch (error) {
        console.error('Failed to fetch footer data:', error)
      }
    }
    loadFooter()
  }, [])

  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const res = await fetch('/api/globals/site-settings?depth=1')
        const data = await res.json().catch(() => null)
        setSiteSettings(data)
      } catch (error) {
        console.error('Failed to fetch site settings:', error)
      }
    }
    loadSiteSettings()
  }, [])

  useEffect(() => {
    const loadIndustries = async () => {
      try {
        const res = await fetch(
          '/api/industries?limit=200&where[showInMenu][equals]=true&sort=order',
        )
        const data = await res.json().catch(() => null)
        const docs = Array.isArray(data?.docs) ? data.docs : []
        const links = docs
          .map((industry: any) => {
            const label =
              typeof industry?.title === 'string' ? industry.title.trim() : ''
            const slug =
              typeof industry?.slug === 'string' ? industry.slug.trim() : ''
            if (!label) return null
            return {
              label,
              url: slug ? `/industries/${slug}` : '/industries',
            }
          })
          .filter(Boolean) as FooterSectionLink[]

        setIndustryLinks(links.length > 0 ? links : null)
      } catch (error) {
        console.error('Failed to fetch industries:', error)
      }
    }
    loadIndustries()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const useDefaultContent = footerData?.useDefaultContent !== false
  const sections = useDefaultContent
    ? DEFAULT_SECTIONS
    : normalizeSections(footerData?.sections)
  const resolvedSections = sections.map((section) => {
    const key = section.sectionKey || titleToKey(section.title)
    if (key === 'industries' && industryLinks && industryLinks.length > 0) {
      return { ...section, links: industryLinks }
    }
    return section
  })

  const contact = siteSettings?.contact ?? DEFAULT_CONTACT
  const emailValue = contact?.email?.trim() || ''
  const phoneValue = contact?.phone?.trim() || ''
  const addressValue = contact?.address?.trim() || ''
  const phoneHref = phoneValue ? phoneValue.replace(/[^+\d]/g, '') : ''
  const locationLink = contact?.locationLink?.trim() || ''
  const locationText = contact?.locationText?.trim() || 'View Location'

  const socials =
    siteSettings?.socialLinks && siteSettings.socialLinks.length > 0
      ? siteSettings.socialLinks
      : DEFAULT_SOCIALS

  const bottomText = siteSettings?.copyright || DEFAULT_BOTTOM_TEXT
  const tagline = siteSettings?.tagline || DEFAULT_TAGLINE
  const logoSource = siteSettings?.footerLogo || siteSettings?.headerLogo || null
  const logo = resolveLogo(logoSource)

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] opacity-30 z-[-1]" />

      {/* Scroll to top */}
      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-105 hover:bg-blue-700 transition-transform backdrop-blur-lg border border-white/20 z-50"
        >
          <FaArrowUp />
        </motion.button>
      )}

      {!hideContactForm && <FooterFaq />}
      {!hideContactForm && <Contactform variant="home" />}

      {/* ================= FOOTER LINKS ================= */}
      <div className="pt-12 px-6 md:px-16 text-gray-300 mt-10 sm:mt-0 bg-white">
        <motion.div
          initial={{ opacity: 1, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md rounded-2xl p-8 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {resolvedSections.map((section, index) => {
              const links = (section.links || []).filter(
                (item) => item?.label && item?.url,
              )
              return (
                <div key={`${section.sectionKey || section.title || 'section'}-${index}`}>
                  <h3 className="text-black text-lg font-semibold mb-4">
                    {section.title}
                  </h3>

                  <ul className="space-y-2 text-gray-400">
                    {links.map((item, i) => (
                      <li key={`${item.label}-${i}`}>
                        <a
                          href={item.url}
                          className="hover:text-blue-500 text-gray-700 text-sm hover:underline"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <div>
              <h3 className="text-black text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-blue-500 text-gray-700 text-sm hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-blue-500 text-gray-700 text-sm hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/standards-of-service"
                    className="hover:text-blue-500 text-gray-700 text-sm hover:underline"
                  >
                    Standards of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deposits-and-payments"
                    className="hover:text-blue-500 text-gray-700 text-sm hover:underline"
                  >
                    Deposits & Payments
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Us - Full width under columns */}
          <div className="mt-10 pt-8 border-t border-gray-300">
            <h3 className="text-black text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-sm">
              {emailValue && (
                <div className="flex items-center gap-3 group cursor-pointer">
                  <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <IoMail className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <a
                    href={`mailto:${emailValue}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors leading-relaxed"
                  >
                    {emailValue}
                  </a>
                </div>
              )}
              {emailValue && phoneValue && (
                <div className="hidden md:block h-6 w-px bg-gray-300" />
              )}
              {phoneValue && (
                <div className="flex items-center gap-3 group cursor-pointer">
                  <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <IoCall className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <a
                    href={phoneHref ? `tel:${phoneHref}` : '#'}
                    className="text-gray-700 hover:text-blue-600 transition-colors leading-relaxed"
                  >
                    {phoneValue}
                  </a>
                </div>
              )}
              {phoneValue && addressValue && (
                <div className="hidden md:block h-6 w-px bg-gray-300" />
              )}
              {addressValue && (
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <span className="leading-relaxed text-gray-700">
                    {addressValue}
                  </span>
                  {locationLink && (
                    <a
                      href={locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {locationText}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ================= LOGO + SOCIAL ================= */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-t border-gray/10">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Image
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-20 w-auto"
              priority={false}
            />
            <p className="text-gray-700 text-sm leading-relaxed max-w-sm">
              {tagline}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social, index) => {
              const Icon = SOCIAL_ICON_MAP[social.platform]
              return (
                <a
                  key={`${social.platform}-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4994cc] text-2xl hover:scale-110 transition-transform"
                >
                  <Icon />
                </a>
              )
            })}
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 py-4 border-t border-white/10">
          <p>{bottomText}</p>
          <p>
            <span className="hover:text-blue-500 cursor-pointer">
              SiteMap
            </span>{' '}
            |{' '}
            <span className="hover:text-blue-500 cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ================= CONTACT FORM ================= */

const Contactform = ({ variant = 'default' }: { variant?: 'default' | 'home' }) => {
  const [payloadform, setPayloadform] = useState<FieldType[]>([])
  const [formID, setFormID] = useState<string | null>(null)
  const [formMeta, setFormMeta] = useState<{
    title?: unknown
    description?: unknown
    submitLabel?: unknown
    confirmationMessage?: unknown
    errorMessage?: unknown
  }>({})
  const [showForm, setShowForm] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>()

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      setSubmitting(true)
      setSubmitError(null)
      setSubmitSuccess(false)

      const normalizeValue = (value: unknown) => {
        if (Array.isArray(value)) return value.join(', ')
        if (value === null || value === undefined) return ''
        return String(value)
      }

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value: normalizeValue(value),
      }))

      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formID,
          submissionData: dataToSend,
          formTitle: resolveText(formMeta.title, 'Contact Form'),
        }),
      })

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null)
        throw new Error(errorBody?.message || 'Form submission failed')
      }

      setSubmitSuccess(true)
      reset()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const footerRes = await fetch('/api/globals/footer?depth=1')
        const footerData = await footerRes.json().catch(() => null)
        const footerForm =
          typeof footerData?.contactForm === 'string'
            ? footerData.contactForm
            : footerData?.contactForm?.id
        const show = footerData?.showContactForm !== false
        setShowForm(show)

        const formResponse = footerForm
          ? await fetch(`/api/forms/${footerForm}`)
          : await fetch(`/api/forms?where[title][equals]=Contactus`)
        const formData = await formResponse.json()
        const form = footerForm ? formData : formData?.docs?.[0]

        if (form) {
          setPayloadform(form.fields || [])
          setFormID(form.id)
          setFormMeta({
            title: form?.title,
            description: form?.description,
            submitLabel: form?.submitButtonLabel,
            confirmationMessage: form?.confirmationMessage,
            errorMessage: form?.errorMessage,
          })
        }
      } catch (error) {
        console.error('Failed to fetch form data:', error)
      }
    }
    getData()
  }, [])

  const resolveText = (value: unknown, fallback = '') => {
    if (typeof value === 'string') return value
    if (value && typeof value === 'object') {
      const firstText = Object.values(value).find(
        (entry) => typeof entry === 'string',
      )
      if (typeof firstText === 'string') return firstText
    }
    return fallback
  }

  const description = resolveText(
    formMeta.description,
    'Book a strategy call to accelerate your growth.',
  )
  const submitLabel = resolveText(formMeta.submitLabel, 'Get Proposal')
  const successMessage = resolveText(
    formMeta.confirmationMessage,
    'Submitted successfully.',
  )
  const errorMessage = resolveText(
    formMeta.errorMessage,
    'Submission failed. Please try again.',
  )
  const isHome = variant === 'home'
  const defaultHeading = isHome
    ? 'Talk to Our Experts'
    : 'Our Tech Experts are Change Catalysts'
  const rawHeading = resolveText(formMeta.title, defaultHeading)
  const heading = isHome
    ? rawHeading.replace(/contact\s*us/i, 'Talk to Our Experts')
    : rawHeading.replace(/contact\s*us/i, 'Contact Us')

  if (!showForm) return null

  const shouldHideField = (field: FieldType) =>
    field.options?.some(
      (option) =>
        option.label?.toLowerCase() === 'still evaluating' ||
        option.value?.toLowerCase() === 'still evaluating',
    )

  const inputWrapperClass = isHome
    ? 'border border-slate-200/80 w-full px-3 py-3 rounded-xl bg-white/95 shadow-sm focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/20 transition'
    : 'border border-[#222] w-full px-3 py-4 rounded-lg bg-white'
  const inputClassName = isHome
    ? 'w-full text-slate-800 placeholder:text-slate-400 bg-transparent outline-none'
    : 'w-full text-gray-700'
  const selectClassName = isHome
    ? 'w-full text-slate-800 bg-transparent outline-none'
    : 'w-full text-gray-700'
  const textareaClassName = inputClassName

  if (isHome) {
    return (
      <section className="relative overflow-hidden bg-[#0b1020] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_10%_20%,rgba(34,211,238,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_90%_10%,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#0f172a] to-[#0b1020] opacity-80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16 py-16 grid gap-10 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.85fr_1.15fr] home-contact">
          <div className="flex flex-col gap-4 justify-center max-w-lg">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Free Consultation
            </span>
            <h2 className="home-contact__title text-3xl md:text-4xl font-semibold text-white">
              {heading}
            </h2>
            <p className="text-base md:text-lg text-slate-300">
              {description}
            </p>

            <div className="grid gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Clear roadmap
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Expert consultation
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Flexible engagement
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 text-xs text-cyan-100">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                Discovery Call
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                Product Strategy
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                UX + Engineering
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 rounded-2xl bg-white/95 p-6 text-slate-900 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)] border border-white/70"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Project Brief
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Share a few details and we&apos;ll follow up with a clear plan.
              </p>
            </div>

            {payloadform.map((field, index) => {
              if (shouldHideField(field)) return null
              const options = field.options?.filter(
                (option) =>
                  option.label?.toLowerCase() !== 'still evaluating' &&
                  option.value?.toLowerCase() !== 'still evaluating',
              )
              const fieldType = field.blockType === 'select' ? 'select-multi' : field.blockType

              return (
                <InputField
                  key={index}
                  label={field.label}
                  name={field.name}
                  type={fieldType}
                  options={options}
                  required={Boolean((field as { required?: boolean })?.required)}
                  placeholder={(field as { placeholder?: string })?.placeholder}
                  register={register}
                  error={(errors[field.name]?.message as string | undefined) ?? undefined}
                  className={inputWrapperClass}
                  inputClassName={inputClassName}
                  selectClassName={selectClassName}
                  textareaClassName={textareaClassName}
                />
              )
            })}

            <button
              type="submit"
              className="mt-6 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : submitLabel}
            </button>
            {submitError && (
              <p className="text-sm text-red-500">
                {submitError || errorMessage}
              </p>
            )}
            {submitSuccess && (
              <p className="text-sm text-emerald-600">{successMessage}</p>
            )}
          </form>
        </div>
      </section>
    )
  }

  return (
    <div className="bg-[#171624] text-white flex flex-col md:flex-row gap-6 p-8 border border-white/10 shadow-inner">
      <div className="md:w-1/2 flex flex-col gap-4 justify-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
          Free Consultation
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          {heading}
        </h2>
        <p className="text-base text-slate-300">{description}</p>
        <div className="grid gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Clear roadmap
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Expert consultation
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Flexible engagement
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-6 border border-[#333] bg-gray-800 rounded-xl w-full md:max-w-xl shadow-lg"
      >
        {payloadform.map((field, index) => {
          if (shouldHideField(field)) return null
          const options = field.options?.filter(
            (option) =>
              option.label?.toLowerCase() !== 'still evaluating' &&
              option.value?.toLowerCase() !== 'still evaluating',
          )
          const fieldType = field.blockType === 'select' ? 'select-multi' : field.blockType

          return (
            <InputField
              key={index}
              label={field.label}
              name={field.name}
              type={fieldType}
              options={options}
              required={Boolean((field as { required?: boolean })?.required)}
              placeholder={(field as { placeholder?: string })?.placeholder}
              register={register}
              error={(errors[field.name]?.message as string | undefined) ?? undefined}
            />
          )
        })}

        <button
          type="submit"
          className="mt-6 p-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 font-bold"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : submitLabel}
        </button>
        {submitError && (
          <p className="text-sm text-red-400 mt-1">
            {submitError || errorMessage}
          </p>
        )}
        {submitSuccess && (
          <p className="text-sm text-green-400 mt-1">{successMessage}</p>
        )}
      </form>
    </div>
  )
}

/* ================= INPUT FIELD ================= */

export const InputField = ({
  label,
  name,
  type = 'text',
  options,
  register,
  error,
  required,
  min,
  placeholder,
  className,
  inputClassName,
  selectClassName,
  textareaClassName,
  floatingLabel,
  labelClassName,
}: {
  label: string
  name: string
  type?: string
  options?: { label: string; value: string }[]
  register: UseFormRegister<FieldValues>
  error?: string
  required?: boolean
  min?: string
  placeholder?: string
  className?: string
  inputClassName?: string
  selectClassName?: string
  textareaClassName?: string
  floatingLabel?: boolean
  labelClassName?: string
}) => {
  const requiredMessage = `${label || 'This field'} is required`
  const registerOptions = required
    ? {
      validate: (value: unknown) => {
        if (Array.isArray(value)) {
          return value.length > 0 || requiredMessage
        }
        return Boolean(value) || requiredMessage
      },
    }
    : undefined
  const floatingEnabled =
    Boolean(floatingLabel) &&
    !['radio', 'checkbox', 'select-multi', 'message'].includes(type)
  const floatingStatic = floatingEnabled && (type === 'select' || type === 'date')
  const safeName = name.replace(/\s+/g, '-').toLowerCase()
  const fieldId = `field-${safeName}`
  const wrapperClassName = cx(
    'border border-[#222] w-full px-3 py-4 rounded-lg bg-white',
    className,
    floatingEnabled && 'relative pt-6',
  )
  const textInputClassName = cx(
    'w-full text-gray-700',
    floatingEnabled && 'peer bg-transparent outline-none',
    inputClassName,
  )
  const selectInputClassName = cx(
    'w-full text-gray-700',
    floatingEnabled && 'peer bg-transparent outline-none',
    selectClassName || inputClassName,
  )
  const textAreaClassName = cx(
    'w-full text-gray-700',
    floatingEnabled && 'peer bg-transparent outline-none',
    textareaClassName || inputClassName,
  )

  if (type === 'message') {
    return null
  }

  if (type === 'radio') {
    return (
      <div className={wrapperClassName}>
        <p className="mb-2 text-gray-700">{label}</p>
        <div className="flex flex-col gap-2 text-gray-700">
          {options?.map((option, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="radio"
                value={option.value}
                {...register(name, registerOptions)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    )
  }

  if (type === 'checkbox') {
    return (
      <div className={wrapperClassName}>
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" {...register(name, registerOptions)} />
          <span>{label}</span>
        </label>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    )
  }

  if (type === 'select-multi') {
    const helperText = placeholder || label
    return (
      <div className={wrapperClassName}>
        <p className="mb-2 text-gray-700">{helperText}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
          {options?.map((option, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option.value}
                {...register(name, registerOptions)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    )
  }

  const floatingLabelText = label || placeholder
  const floatingLabelClassName = floatingEnabled
    ? cx(
      'pointer-events-none absolute left-4 text-xs text-gray-500 transition-all',
      floatingStatic
        ? 'top-2'
        : 'top-1/2 -translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-blue-500',
      labelClassName,
    )
    : 'hidden'

  return (
    <div className={wrapperClassName}>
      {type === 'select' ? (
        <select
          {...register(name, registerOptions)}
          id={fieldId}
          className={selectInputClassName}
        >
          {placeholder && (
            <option value="" disabled className="text-slate-500">
              {placeholder}
            </option>
          )}
          {options?.map((option, i) => (
            <option key={i} value={option.value} className="text-slate-900">
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          {...register(name, registerOptions)}
          id={fieldId}
          placeholder={floatingEnabled ? ' ' : placeholder || label}
          className={textAreaClassName}
          rows={3}
        />
      ) : type === 'date' ? (
        <input
          {...register(name, registerOptions)}
          id={fieldId}
          type="date"
          min={min}
          className={textInputClassName}
        />
      ) : (
        <input
          {...register(name, registerOptions)}
          id={fieldId}
          type={type}
          placeholder={floatingEnabled ? ' ' : placeholder || label}
          className={textInputClassName}
        />
      )}
      {floatingEnabled && (
        <label htmlFor={fieldId} className={floatingLabelClassName}>
          {floatingLabelText}
        </label>
      )}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const cx = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(' ')
