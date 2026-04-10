import { Block } from 'payload'

export const ImageandText: Block = {
  slug: 'imageAndText',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    { name: 'description', type: 'richText' },
  ],
}
