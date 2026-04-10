import { GlobalConfig } from 'payload'

export const EmailTemplates: GlobalConfig = {
  slug: 'email-templates',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Codified Web Solutions',
    },
    {
      name: 'supportEmail',
      type: 'text',
      defaultValue: 'support@codifiedtech.com',
    },
    {
      name: 'websiteUrl',
      type: 'text',
      defaultValue: 'https://www.codifiedtech.com',
    },
    {
      name: 'adminEmail',
      label: 'Receiver Email',
      type: 'text',
      admin: {
        description:
          'Primary recipient for contact and consultation submissions.',
      },
    },
    {
      name: 'adminRecipients',
      label: 'Receiver Emails (List)',
      type: 'array',
      admin: {
        description:
          'Optional list to send to multiple recipients. Used in addition to the primary receiver email.',
      },
      fields: [
        {
          name: 'email',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'adminSubject',
      type: 'text',
      defaultValue: 'New Free Consultation Request',
    },
    {
      name: 'adminBody',
      type: 'textarea',
      admin: {
        description:
          'HTML allowed. Use placeholders like {{fullName}}, {{email}}, {{phone}}, {{idea}}, {{slot}}, {{preferredDate}}, {{table}}.',
      },
    },
    {
      name: 'userSubject',
      type: 'text',
      defaultValue: 'We received your free consultation request',
    },
    {
      name: 'userBody',
      type: 'textarea',
      admin: {
        description:
          'HTML allowed. Use placeholders like {{fullName}}, {{brandName}}, {{supportEmail}}, {{websiteUrl}}.',
      },
    },
  ],
}
