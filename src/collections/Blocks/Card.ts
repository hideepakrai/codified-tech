import { Block } from 'payload'

export const Card: Block = {
  slug: 'Card',
  fields: [
    {
      name: 'Data',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
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
      ],
    },
  ],
}
