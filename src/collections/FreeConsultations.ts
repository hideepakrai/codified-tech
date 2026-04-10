import type { CollectionConfig } from 'payload'

export const FreeConsultations: CollectionConfig = {
  slug: 'free-consultations',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'preferredDate', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'idea',
      type: 'textarea',
    },
    {
      name: 'slot',
      type: 'text',
    },
    {
      name: 'preferredDate',
      type: 'date',
    },
    {
      name: 'rawData',
      type: 'json',
      required: true,
    },
  ],
}

export default FreeConsultations
