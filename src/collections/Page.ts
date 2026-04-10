// import { CollectionConfig } from 'payload'
// import { Hero } from './Blocks/Hero'
// import { Sidebyside } from './Blocks/Sidebyside'
// import { Singlecolumnsection } from './Blocks/Singlecolumn'
// import { Testimonials } from './Blocks/Testimonials'
// import { Projects } from './Blocks/Projects'
// import { FormBlock } from './Blocks/Form'
// import { ImageandText } from './Blocks/ImageandText'
// import { Technologies } from './Blocks/Technology'

// export const Pages: CollectionConfig = {
//   slug: 'pages',
//   admin: {
//     useAsTitle: 'title',
//   },

//   fields: [
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//     },
//     {
//       name: 'blocks',
//       type: 'blocks',
//       blocks: [
//         Hero,
//         Sidebyside,
//         Singlecolumnsection,
//         Testimonials,
//         Projects,
//         FormBlock,
//         ImageandText,
//         Technologies,
//       ],
//     },
//   ],
// }

import { CollectionConfig } from 'payload'
import { Hero } from './Blocks/Hero'
import { Sidebyside } from './Blocks/Sidebyside'
import { Singlecolumnsection } from './Blocks/Singlecolumn'
import { Testimonials } from './Blocks/Testimonials'
import { Projects } from './Blocks/Projects'
import { FormBlock } from './Blocks/Form'
import { ImageandText } from './Blocks/ImageandText'
import { Technologies } from './Blocks/Technology'
import { FaqsBlock } from './Blocks/FaqsBlock'
import { WhyUsBlock } from './Blocks/WhyUs'
import { syncLegacyFromMeta, syncMetaFromLegacy } from '../lib/seoSync'

export const Pages: CollectionConfig = {
  slug: 'pages',
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterRead: [({ doc }) => syncMetaFromLegacy(doc)],
    beforeChange: [({ data }) => syncLegacyFromMeta(data)],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'servicesPageContent',
      label: 'Services Page Content',
      type: 'group',
      admin: {
        condition: (data) => data?.slug === 'services',
      },
      fields: [
        {
          name: 'heroTitle',
          label: 'Hero Title',
          type: 'text',
          defaultValue: 'Elevate Your Digital Presence',
        },
        {
          name: 'heroSubtitle',
          label: 'Hero Subtitle',
          type: 'textarea',
          defaultValue:
            'Build modern, scalable, and visually stunning applications with our expert team.',
        },
        {
          name: 'heroButtons',
          label: 'Hero Buttons',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Button Text',
              type: 'text',
            },
            {
              name: 'link',
              label: 'Button Link',
              type: 'text',
            },
          ],
        },
        {
          name: 'sections',
          label: 'Service Sections',
          type: 'array',
          fields: [
            {
              name: 'category',
              label: 'Category',
              type: 'select',
              options: [
                { label: 'AI Services', value: 'ai' },
                { label: 'Web Development', value: 'web' },
                { label: 'Cloud & Hosting', value: 'cloud' },
                { label: 'Digital Marketing', value: 'marketing' },
              ],
              required: true,
            },
            {
              name: 'label',
              label: 'Small Label',
              type: 'text',
            },
            {
              name: 'heading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'subheading',
              label: 'Subheading',
              type: 'text',
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'cardNote',
              label: 'Side Card Note',
              type: 'textarea',
            },
            {
              name: 'exploreLabel',
              label: 'Explore Button Label',
              type: 'text',
            },
            {
              name: 'exploreLink',
              label: 'Explore Button Link',
              type: 'text',
            },
            {
              name: 'bullets',
              label: 'Bullet Items',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  label: 'Item',
                  type: 'text',
                },
              ],
            },
            {
              name: 'image',
              label: 'Section Image (Overrides Global Image)',
              type: 'upload',
              relationTo: 'media',
            },
          ],
          defaultValue: [
            {
              category: 'ai',
              label: 'AI Services',
              heading: 'AI Services',
              subheading: 'Intelligent Systems for Modern Businesses',
              description:
                'We build AI-powered solutions that enhance efficiency, automate workflows, and enable data-driven decisions at scale.',
              cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
              exploreLabel: 'Explore AI Services ->',
              bullets: [
                { text: 'AI Consulting' },
                { text: 'AI Chatbots' },
                { text: 'AI Agents' },
                { text: 'Generative AI' },
              ],
            },
            {
              category: 'web',
              label: 'Web Development',
              heading: 'Web Development',
              subheading: 'High-Performance Digital Platforms',
              description:
                'Custom-built, scalable, and SEO-friendly web solutions designed to deliver seamless user experiences and measurable business results.',
              cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
              exploreLabel: 'Explore Web Development ->',
              bullets: [
                { text: 'Frontend Development' },
                { text: 'Backend Systems' },
                { text: 'UI/UX Design' },
                { text: 'CMS Development' },
              ],
            },
            {
              category: 'cloud',
              label: 'Cloud and Hosting',
              heading: 'Cloud and Hosting',
              subheading: 'Secure and Scalable Infrastructure',
              description:
                'From cloud migration to managed hosting, we ensure reliable performance, enhanced security, and operational efficiency.',
              cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
              exploreLabel: 'Explore Cloud and Hosting ->',
              bullets: [
                { text: 'Cloud Migration' },
                { text: 'Managed Hosting' },
                { text: 'DevOps Automation' },
                { text: 'Security & Monitoring' },
              ],
            },
            {
              category: 'marketing',
              label: 'Digital Marketing',
              heading: 'Digital Marketing',
              subheading: 'Growth Strategies Backed by Data',
              description:
                'We combine SEO, paid campaigns, and performance analytics to increase visibility, drive traffic, and maximize ROI.',
              cardNote: 'Trusted delivery that blends strategy, design, and engineering.',
              exploreLabel: 'Explore Digital Marketing ->',
              bullets: [
                { text: 'SEO Optimization' },
                { text: 'Paid Campaigns' },
                { text: 'Content Strategy' },
                { text: 'Performance Analytics' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contactPageContent',
      label: 'Contact Page Content',
      type: 'group',
      admin: {
        condition: (data) => data?.slug === 'contact-us',
      },
      fields: [
        {
          name: 'heroTitle',
          label: 'Hero Title',
          type: 'text',
          defaultValue: "Let's Build Something",
        },
        {
          name: 'heroHighlight',
          label: 'Hero Highlight Text',
          type: 'text',
          defaultValue: 'Great Together',
        },
        {
          name: 'heroSubtitle',
          label: 'Hero Subtitle',
          type: 'textarea',
          defaultValue:
            'Have a project in mind or need expert support? Our team at Codified Tech is ready to help you grow.',
        },
        {
          name: 'contactHeading',
          label: 'Contact Info Heading',
          type: 'text',
          defaultValue: 'Contact Information',
        },
        {
          name: 'contactDescription',
          label: 'Contact Info Description',
          type: 'textarea',
          defaultValue: 'Reach out to us anytime - we usually respond within 24 hours.',
        },
        {
          name: 'ctaTitle',
          label: 'CTA Title',
          type: 'text',
          defaultValue: 'Ready to Start Your Project?',
        },
        {
          name: 'ctaDescription',
          label: 'CTA Description',
          type: 'textarea',
          defaultValue:
            "Let's turn your ideas into reality. Connect with our team today and get a free consultation.",
        },
        {
          name: 'ctaButtonLabel',
          label: 'CTA Button Label',
          type: 'text',
          defaultValue: 'Start Your Project',
        },
        {
          name: 'ctaButtonLink',
          label: 'CTA Button Link',
          type: 'text',
          defaultValue: 'mailto:hello@codifiedweb.com',
        },
      ],
    },
    {
      name: 'hireDevelopersPageContent',
      label: 'Hire Developers Page Content',
      type: 'group',
      admin: {
        condition: (data) => data?.slug === 'hire-developers',
      },
      fields: [
        {
          name: 'heroTitleLine1',
          label: 'Hero Title Line 1',
          type: 'text',
          defaultValue: 'Hire Dedicated Developers',
        },
        {
          name: 'heroTitleLine2',
          label: 'Hero Title Line 2',
          type: 'text',
          defaultValue: 'That Build with Impact',
        },
        {
          name: 'heroSubtitle',
          label: 'Hero Subtitle',
          type: 'textarea',
          defaultValue:
            'Scale your team with vetted developers experienced in building modern, scalable, and reliable web, mobile, and enterprise solutions.',
        },
        {
          name: 'heroCtaLabel',
          label: 'Hero Button Label',
          type: 'text',
          defaultValue: 'Get a Free Quote',
        },
        {
          name: 'heroCtaLink',
          label: 'Hero Button Link',
          type: 'text',
          defaultValue: '/contact-us',
        },
        {
          name: 'heroImage',
          label: 'Hero Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroImageAlt',
          label: 'Hero Image Alt Text',
          type: 'text',
          defaultValue: 'Hire Developers Illustration',
        },
        {
          name: 'skillsEyebrow',
          label: 'Skills Section Eyebrow',
          type: 'text',
          defaultValue: 'Hire TechAhead Developers',
        },
        {
          name: 'skillsHeading',
          label: 'Skills Section Heading',
          type: 'text',
          defaultValue: 'Empower your projects with expert developers',
        },
        {
          name: 'skills',
          label: 'Skills List',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Skill Label',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              label: 'Skill Icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      label: 'Meta Title',
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'Used for SEO purposes. Appears in the <title> tag.',
        hidden: true,
      },
    },
    {
      label: 'Meta Description',
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'Used for SEO purposes. Appears in the <meta name="description" /> tag.',
        hidden: true,
      },
    },
    {
      label: 'Open Graph',
      name: 'openGraph',
      type: 'group',
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: 'ogTitle',
          type: 'text',
        },
        {
          name: 'ogDescription',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        Hero,
        Sidebyside,
        Singlecolumnsection,
        Testimonials,
        Projects,
        FormBlock,
        ImageandText,
        Technologies,
        FaqsBlock,
        WhyUsBlock,
      ],
    },
  ],
}
