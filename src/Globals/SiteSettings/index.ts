import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'faviconUrl',
      label: 'Favicon URL',
      type: 'text',
      admin: {
        description: 'Use this if you want to paste a direct image URL instead of uploading.',
      },
    },
    {
      name: 'headerLogo',
      label: 'Header Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'footerLogo',
      label: 'Footer Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      label: 'Contact Details',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Office Address',
        },
        {
          name: 'locationLink',
          type: 'text',
          label: 'Google Map Location Link',
        },
        {
          name: 'locationText',
          type: 'text',
          label: 'Location Button Text',
          defaultValue: 'View Location',
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'textarea',
      defaultValue:
        'Full stack mobile (iOS, Android) and web app design and development agency.',
    },
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
      defaultValue: 'Copyright 2025-2026 Codified Web Solutions',
    },
  ],
}
