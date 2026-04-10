import { CollectionConfig } from 'payload'

export const ConsultationPage: CollectionConfig = {
  slug: 'consultation-page',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'heading',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Tech Experts are Change Catalysts',
    },
    {
      name: 'subheading',
      type: 'text',
      required: true,
      defaultValue: 'Book a Free Consultation Call with Our Experts Today',
    },
    {
      name: 'consultationModal',
      label: 'Consultation Modal',
      type: 'group',
      fields: [
        {
          name: 'modalEyebrow',
          type: 'text',
          defaultValue: 'Free Consultation',
        },
        {
          name: 'modalHeading',
          type: 'text',
          defaultValue: 'Why Book a Free Consultation?',
        },
        {
          name: 'modalDescription',
          type: 'text',
          defaultValue: 'Get expert advice tailored to your needs.',
        },
        {
          name: 'modalBenefits',
          label: 'Benefits',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },

        {
          name: 'modalTrustLine',
          type: 'text',
          defaultValue:
            'Trusted by founders & teams across fintech, healthcare, and retail.',
        },
        {
          name: 'formEyebrow',
          type: 'text',
          defaultValue: 'Schedule Your Call',
        },
        {
          name: 'formHeading',
          type: 'text',
          defaultValue: 'Start your free strategy session',
        },
        {
          name: 'formDescription',
          type: 'text',
          defaultValue: "Share a few details and we'll respond within 24 hours.",
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Schedule My Free Strategy Call →',
        },
        {
          name: 'securityLine',
          type: 'text',
          defaultValue: 'Your information is secure. We never share your data.',
        },
      ],
    },
    {
      name: 'evaluationOptions',
      label: 'Evaluation Dropdown Options',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'serviceOptions',
      label: 'Service Dropdown Options',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
