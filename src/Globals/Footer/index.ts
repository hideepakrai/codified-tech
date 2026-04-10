import { type FieldHook, GlobalConfig } from 'payload'

const buildPageHref = (slug?: string | null) => {
  if (!slug) return ''
  const trimmed = slug.trim()
  if (!trimmed) return ''
  const normalized = trimmed.replace(/^\/+/, '')
  if (normalized === 'home' || normalized === 'index') return '/'
  return `/${normalized}`
}

const getRelationId = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'object') {
    const maybeId = (value as { id?: unknown }).id
    if (typeof maybeId === 'string') return maybeId.trim()
  }
  return null
}

const syncFooterLinks: FieldHook = async ({ value, req }) => {
  if (!Array.isArray(value) || !req?.payload) return value

  const pageCache = new Map<string, { title?: string; slug?: string } | null>()

  const getPage = async (id: string) => {
    if (pageCache.has(id)) return pageCache.get(id) || null
    try {
      const page = await req.payload.findByID({
        collection: 'pages',
        id,
      })
      const cleaned = page
        ? {
            title: typeof page?.title === 'string' ? page.title.trim() : undefined,
            slug: typeof page?.slug === 'string' ? page.slug.trim() : undefined,
          }
        : null
      pageCache.set(id, cleaned)
      return cleaned
    } catch {
      pageCache.set(id, null)
      return null
    }
  }

  const updated = await Promise.all(
    value.map(async (item) => {
      if (!item || typeof item !== 'object') return item
      const link = { ...(item as Record<string, unknown>) }

      const inferredType =
        typeof link.linkType === 'string'
          ? link.linkType
          : getRelationId(link.page)
            ? 'page'
            : 'custom'

      if (!link.linkType) {
        link.linkType = inferredType
      }

      if (inferredType !== 'page') return link

      const pageId = getRelationId(link.page)
      if (!pageId) return link

      const page = await getPage(pageId)
      if (!page) return link

      const currentLabel = typeof link.label === 'string' ? link.label.trim() : ''
      const currentUrl = typeof link.url === 'string' ? link.url.trim() : ''
      const nextLabel = currentLabel || page.title || ''
      const nextUrl = currentUrl || buildPageHref(page.slug)

      if (!currentLabel && nextLabel) link.label = nextLabel
      if (!currentUrl && nextUrl) link.url = nextUrl

      return link
    }),
  )

  return updated
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'useDefaultContent',
      label: 'Use Default Footer Content',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Applies to footer sections only.',
      },
    },
    {
      name: 'sections',
      label: 'Footer Sections (About, Services, Technologies, Industries)',
      type: 'array',
      minRows: 4,
      admin: {
        components: {
          RowLabel: '@/components/admin/FooterSectionRowLabel#FooterSectionRowLabel',
        },
      },
      defaultValue: [
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
            { label: 'more...', url: '/services' },
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
            { label: 'more...', url: '/technologies' },
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
            { label: 'more...', url: '/industries' },
          ],
        },
      ],
      fields: [
        {
          name: 'sectionKey',
          label: 'Section Key',
          type: 'select',
          required: true,
          defaultValue: 'custom',
          options: [
            { label: 'About', value: 'about' },
            { label: 'Services', value: 'services' },
            { label: 'Technologies', value: 'technologies' },
            { label: 'Industries', value: 'industries' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          hooks: {
            beforeValidate: [syncFooterLinks],
          },
          fields: [
            {
              name: 'linkType',
              label: 'Link Source',
              type: 'radio',
              defaultValue: 'page',
              options: [
                { label: 'Page (Dropdown)', value: 'page' },
                { label: 'Custom URL', value: 'custom' },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'page',
              label: 'Page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'page',
                description:
                  'Select a page to auto-fill Link Text and Link URL.',
              },
            },
            {
              name: 'label',
              label: 'Link Text',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Optional override. Leave empty to use the page title.',
              },
            },
            {
              name: 'url',
              label: 'Link URL',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Optional override. Auto-filled from the selected page slug.',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'showContactForm',
      label: 'Show Contact Form',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'contactForm',
      label: 'Contact Form',
      type: 'relationship',
      relationTo: 'forms',
      hasMany: false,
    },
  ],
}
