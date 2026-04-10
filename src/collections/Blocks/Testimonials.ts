import { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'Testimonials',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'subheading', type: 'text' },
    { name: 'ratingLabel', type: 'text' },
    { name: 'ratingValue', type: 'text' },
    { name: 'ratingStars', type: 'number', min: 0, max: 5 },
    {
      name: 'testimonialtype',
      type: 'select',
      options: [
        { label: 'Slider', value: 'slider' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'testimonial data',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ],
}
