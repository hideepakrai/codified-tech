import { Block } from 'payload'

export const Technologies: Block = {
  slug: 'Technologies',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'subheading', type: 'text' },
    {
      name: 'Tech Type',
      type: 'select',
      options: [
        { label: 'Slider', value: 'slider' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'techdata data',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
    },
  ],
}
