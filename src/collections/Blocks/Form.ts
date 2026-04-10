import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'Forms',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    { name: 'description', type: 'richText' },
    {
      name: 'form fields',
      type: 'relationship',
      relationTo: 'forms',
      hasMany: false,
    },
  ],
}
