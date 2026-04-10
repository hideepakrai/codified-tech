import { CollectionConfig } from 'payload'
import { syncMetaFromLegacy } from '../lib/seoSync'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterRead: [({ doc }) => syncMetaFromLegacy(doc)],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug (e.g. ai-consulting, web-development)',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'AI Services', value: 'ai' },
        { label: 'Web Development', value: 'web' },
        { label: 'Cloud & Hosting', value: 'cloud' },
        { label: 'Digital Marketing', value: 'marketing' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'showInMenu',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}

export default Services
