import { CollectionConfig } from 'payload'

const Company: CollectionConfig = {
  slug: 'company',
  admin: {
    useAsTitle: 'title',
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
        description: 'URL slug (e.g. about-us, core-team)',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Menu order',
      },
    },
    {
      name: 'showInMenu',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Company
