import { Block } from 'payload'

export const Projects: Block = {
  slug: 'Projects',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    { name: 'description', type: 'richText' },
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
      name: 'projects data',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
  ],
}
