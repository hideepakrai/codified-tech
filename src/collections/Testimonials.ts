import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
  name: 'heading',
  type: 'text',
   },
  {
      name: 'testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'testimonialname', 
      type: 'text',
    },
    {
      name: 'testimonialposition',
      type: 'text',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
