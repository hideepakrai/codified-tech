import { Block } from 'payload'

export const Singlecolumnsection: Block = {
  slug: 'Single-Column-Section',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'blobcard',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    {
      name: 'Cards',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'button',
          type: 'array',
          fields: [
            {
              name: 'Button Text',
              type: 'text',
            },
            {
              name: 'Button Link',
              type: 'text',
            },
          ],
        },
        {
          name: 'tech-data',
          type: 'relationship',
          relationTo: 'technologies',
          hasMany: true,
        },
      ],
    },
    {
      name: 'Button',
      type: 'array',
      fields: [
        {
          name: 'Button Text',
          type: 'text',
        },
        {
          name: 'Button Link',
          type: 'text',
        },
      ],
    },
  ],
}
