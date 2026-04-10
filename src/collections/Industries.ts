import { CollectionConfig } from 'payload'
import { syncMetaFromLegacy } from '../lib/seoSync'

export const Industries: CollectionConfig = {
  slug: 'industries',

  hooks: {
    afterRead: [({ doc }) => syncMetaFromLegacy(doc)],
    beforeChange: [
      ({ data, originalDoc }) => {
        if (!data || typeof data !== 'object') return data

        const title =
          typeof data.title === 'string' ? data.title.trim() : data.title
        const nextHeroTitle =
          typeof (data as { heroTitle?: unknown }).heroTitle === 'string'
            ? (data as { heroTitle?: string }).heroTitle?.trim()
            : ''
        const originalTitle =
          typeof originalDoc?.title === 'string' ? originalDoc.title.trim() : ''
        const originalHeroTitle =
          typeof originalDoc?.heroTitle === 'string'
            ? originalDoc.heroTitle.trim()
            : ''

        const titleChanged = Boolean(title) && title !== originalTitle
        const heroTitleMissing = !nextHeroTitle
        const heroTitleWasAuto = Boolean(originalHeroTitle) && originalHeroTitle === originalTitle

        if (title && (heroTitleMissing || (titleChanged && heroTitleWasAuto))) {
          return { ...data, heroTitle: title }
        }

        return data
      },
    ],
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'showInMenu', 'order'],
  },

  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true
  },

  fields: [
    // Industry title
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    // Slug
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },

    // Short description (listing page)
    {
      name: 'shortDescription',
      type: 'textarea',
    },

    // Hero content (single industry page)
    {
      name: 'heroTitle',
      type: 'text',
      admin: {
        description: 'Overrides the main hero heading for this industry page.',
      },
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      admin: {
        description: 'Hero subheading/summary shown under the main title.',
      },
    },
    {
      name: 'heroCtaText',
      type: 'text',
      admin: {
        description: 'Hero CTA button text.',
      },
    },
    {
      name: 'heroCtaLink',
      type: 'text',
      admin: {
        description: 'Hero CTA button link (e.g. /contact-us).',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero image shown on the right side of the industry hero.',
      },
    },

    // Icon
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },

    // Full content
    {
      name: 'content',
      type: 'richText',
    },

    // Framework section for single industry page
    {
      name: 'frameworkSection',
      type: 'group',
      admin: {
        description: 'Framework section for single industry page',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'robot',
              options: [
                { label: 'Robot', value: 'robot' },
                { label: 'Shield', value: 'shield' },
                { label: 'Sync', value: 'sync' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },

    // Strategy section for single industry page
    {
      name: 'strategySection',
      type: 'group',
      admin: {
        description: 'Strategy section for single industry page',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'services',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },

    // Achievement section for single industry page
    {
      name: 'achievementSection',
      type: 'group',
      admin: {
        description: 'Achievement section for single industry page',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'cards',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'light',
              type: 'checkbox',
              defaultValue: false,
              
            },
          ],
        },
      ],
    },

    // Why Us section for single industry page
    {
      name: 'whyUsSection',
      type: 'group',
      admin: {
        description: 'Why Us section for single industry page',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'cards',
          type: 'array',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // Trusted By section for single industry page
    {
      name: 'trustedBySection',
      type: 'group',
      admin: {
        description: 'Trusted By section for single industry page',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'logos',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'logoUrl',
              type: 'text',
              admin: {
                description: 'Optional external logo URL if no media upload is provided.',
              },
            },
          ],
        },
        {
          name: 'blobcard',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // Show / Hide
    {
      name: 'showInMenu',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },

    // Menu order
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Industries
