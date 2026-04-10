import { Block } from 'payload'

export const Sidebyside: Block = {
  slug: 'Side-by-Side-Section',
  fields: [
    {
      name: 'Side-1',
      type: 'group',
      fields: [
        {
          name: 'Left Heading',
          type: 'text',
        },
        {
          name: 'Description',
          type: 'richText',
        },
        {
          name: 'Image',
          type: 'upload',
          relationTo: 'media',
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
    },
    {
      name: 'Side-2',
      type: 'group',
      fields: [
        {
          name: 'Right Heading',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'Description',
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
    },
  ],
}
