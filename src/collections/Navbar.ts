import { CollectionConfig } from 'payload'

export const Navbar: CollectionConfig = {
  slug: 'Menu',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'Items',
      type: 'array',
      label: 'Menu Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Menu Label',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link (if no dropdown)',
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Has Dropdown?',
        },

        // 🔥 NEW FIELD (MOST IMPORTANT)
        {
          name: 'sourceCollection',
          type: 'select',
          label: 'Auto Load From Collection',
          options: [
            { label: 'None (Manual)', value: 'none' },
            { label: 'Company', value: 'company' },
            { label: 'Services', value: 'services' },
            { label: 'Industries', value: 'industries' },
          ],
          defaultValue: 'none',
        },

        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Categories (Manual)',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.sourceCollection === 'none',
          },
          fields: [
            {
              name: 'categoryTitle',
              type: 'text',
              label: 'Category Title',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
            },
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'link',
              type: 'text',
            },
            {
              name: 'subServices',
              type: 'array',
              label: 'Sub Services',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
                {
                  name: 'slug',
                  type: 'text',
                },
              ],
            },
            {
              name: 'logoorimage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
}
