// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig, type Field } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Page'
import { Authors } from './collections/Authors'
import { Posts } from './collections/Posts'
import { Tags } from './collections/Tags'
import { Categories } from './collections/Categories'
import { Navbar } from './collections/Navbar'
import { Technologies } from './collections/Technologies'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'
import Company from './collections/Company'
import Services from './collections/Services'
import Industries from './collections/Industries'
import FreeConsultations from './collections/FreeConsultations'
import { ConsultationPage } from './collections/ConsultationPage'
import { Faqs } from './collections/FAQs'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { EmailTemplates } from './globals/EmailTemplates'
import { Footer } from './globals/Footer'
import { GlobalSchema } from './globals/GlobalSchema'
import { SiteSettings } from './globals/SiteSettings'








const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
console.log("BLOB TOKEN:", process.env.BLOB_READ_WRITE_TOKEN)
console.log("hasBlobToken:", hasBlobToken)

const hasSMTP = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS,
)

const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpSecure =
  typeof process.env.SMTP_SECURE === 'string'
    ? process.env.SMTP_SECURE === 'true'
    : smtpPort === 465

const normalizeOrigin = (value?: string | null) => {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  const normalized = trimmed.replace(/\/$/, '')
  if (normalized.includes('your-payload-domain.com')) return ''
  return normalized
}

const isMetaSeoField = (
  field: Field,
): field is Extract<Field, { type: 'text' | 'textarea'; name: string }> => {
  if (!('name' in field)) return false
  if (field.type !== 'text' && field.type !== 'textarea') return false
  return field.name === 'title' || field.name === 'description'
}

type SeoMetaField = Extract<
  Field,
  {
    type: 'text' | 'textarea'
    name: string
  }
>

type SeoTextField = Extract<SeoMetaField, { type: 'text' }>
type SeoTextareaField = Extract<SeoMetaField, { type: 'textarea' }>

const stripSeoLengthUiFromMetaField = <T extends SeoMetaField>(field: T): T => {
  const cleaned = {
    ...field,
  } as T & { minLength?: number; maxLength?: number }

  delete cleaned.minLength
  delete cleaned.maxLength

  const admin = cleaned.admin
  if (!admin?.components?.Field) return cleaned

  const { Field: _Field, ...restComponents } = admin.components
  const nextAdmin =
    Object.keys(restComponents).length > 0
      ? { ...admin, components: restComponents }
      : (() => {
        const { components: _components, ...adminRest } = admin
        return adminRest
      })()

  return { ...cleaned, admin: nextAdmin } as T
}

const stripSeoLengthUi = (field: Field): Field => {
  if (!isMetaSeoField(field)) return field

  if (field.type === 'text') {
    return stripSeoLengthUiFromMetaField(field as SeoTextField)
  }

  return stripSeoLengthUiFromMetaField(field as SeoTextareaField)
}



const webOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_WEB_URI)
const payloadOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_PAYLOAD_URL)
const isDev = process.env.NODE_ENV !== 'production'
const devOrigin = 'http://localhost:3000'
const isLocalOrigin = (value?: string) =>
  Boolean(value && /localhost|127\.0\.0\.1/i.test(value))

const serverURL = isDev
  ? isLocalOrigin(payloadOrigin)
    ? payloadOrigin
    : devOrigin
  : payloadOrigin || webOrigin

const allowedOrigins = Array.from(
  new Set([webOrigin, payloadOrigin, isDev ? devOrigin : ''].filter(Boolean)),
)

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data }: { data: { slug?: string } }) => {
        const slug = data?.slug
        return slug && slug !== 'home'
          ? `http://localhost:3000/${slug}`
          : 'http://localhost:3000'
      },
      collections: ['pages'],
    },
  },

  cors: allowedOrigins.length > 0 ? allowedOrigins : undefined,
  csrf: allowedOrigins.length > 0 ? allowedOrigins : undefined,

  collections: [
    Users,
    Media,
    Pages,
    Authors,
    Posts,
    Tags,
    Categories,
    Navbar,
    Technologies,
    Projects,
    Testimonials,
    Company,
    Services,
    Industries,
    FreeConsultations,
    ConsultationPage,
    Faqs,
  ],

  globals: [EmailTemplates, Footer, GlobalSchema, SiteSettings],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'dev-secret',

  email: hasSMTP
    ? nodemailerAdapter({
      defaultFromAddress:
        process.env.SMTP_FROM || 'no-reply@codifiedtech.com',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Codified Tech',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
    : nodemailerAdapter(),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'services', 'industries'],
      fields: ({ defaultFields }) => [
        ...defaultFields.map(stripSeoLengthUi),
        {
          name: 'ogTitle',
          label: 'OG Title',
          type: 'text',
        },
        {
          name: 'ogDescription',
          label: 'OG Description',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          label: 'OG Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'schema',
          label: 'Schema Markup (JSON-LD)',
          type: 'code',
          admin: {
            language: 'json',
            description: 'Paste JSON-LD structured data here.',
          },
        },
      ],
      uploadsCollection: 'media',
    }),
    payloadCloudPlugin(),
    formBuilderPlugin({
      defaultToEmail: process.env.FORM_DEFAULT_TO_EMAIL,
      formOverrides: {
        fields: ({ defaultFields }: { defaultFields: Field[] }) => {
          const buildDescriptionField = (): Field => ({
            name: 'description',
            label: 'Form Description',
            type: 'text',
            localized: true,
          })
          const buildReceiverEmailField = (): Field => ({
            name: 'receiverEmail',
            label: 'Receiver Email',
            type: 'text',
            admin: {
              description: 'Primary recipient for submissions from this form.',
            },
          })

          const fields: Field[] = [...defaultFields]
          const titleIndex = fields.findIndex(
            (field) => 'name' in field && field.name === 'title',
          )

          if (titleIndex >= 0) {
            fields.splice(titleIndex + 1, 0, buildDescriptionField())
          } else {
            fields.unshift(buildDescriptionField())
          }

          const emailsIndex = fields.findIndex(
            (field) => 'name' in field && field.name === 'emails',
          )
          if (emailsIndex >= 0) {
            fields.splice(emailsIndex, 0, buildReceiverEmailField())
          } else {
            fields.push(buildReceiverEmailField())
          }

          return fields
        },
      },
    }),
    vercelBlobStorage({
      enabled: hasBlobToken,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
})

