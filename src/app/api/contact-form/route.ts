import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const normalizeLabel = (value: string) =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const toHtmlTable = (rows: { field: string; value: string }[]) => {
  const html = rows
    .map(({ field, value }) => {
      const safeField = escapeHtml(normalizeLabel(field))
      const safeValue = escapeHtml(value)
      return `<tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>${safeField}</strong></td><td style="padding:6px 10px;border:1px solid #e5e7eb;">${safeValue}</td></tr>`
    })
    .join('')

  return `<table style="border-collapse:collapse;width:100%;font-family:Arial, sans-serif;font-size:14px;">${html}</table>`
}

const getTemplateString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

const toEmailList = (value: unknown) =>
  typeof value === 'string'
    ? value
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean)
    : []

type EmailTemplatesGlobal = {
  brandName?: string
  supportEmail?: string
  websiteUrl?: string
  adminEmail?: string
  adminRecipients?: { email?: string }[]
}

type FormDoc = {
  id?: string
  title?: string
  receiverEmail?: string
  emails?: { emailTo?: string | null }[]
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await req.json()

    type SubmissionEntry = { field?: unknown; value?: unknown }
    const submissionData = Array.isArray(body?.submissionData)
      ? (body.submissionData as SubmissionEntry[])
          .map((entry) => ({
            field:
              typeof entry?.field === 'string' ? entry.field.trim() : 'Field',
            value:
              typeof entry?.value === 'string'
                ? entry.value
                : String(entry?.value ?? ''),
          }))
          .filter((entry) => entry.field)
      : []

    let formId = typeof body?.form === 'string' ? body.form : ''
    let resolvedTitle =
      typeof body?.formTitle === 'string' ? body.formTitle.trim() : ''
    let formDoc: FormDoc | null = null

    if (!formId) {
      const fallback = await payload.find({
        collection: 'forms',
        where: { title: { equals: 'Contactus' } },
        limit: 1,
        overrideAccess: true,
      })
      formDoc = (fallback?.docs?.[0] as FormDoc | undefined) ?? null
      formId = formDoc?.id || ''
      if (!resolvedTitle) {
        resolvedTitle = formDoc?.title || ''
      }
    }

    if (!formId) {
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: 400 },
      )
    }

    if (!formDoc) {
      formDoc = (await payload
        .findByID({
          collection: 'forms',
          id: formId,
          overrideAccess: true,
          depth: 0,
        })
        .catch(() => null)) as FormDoc | null
      if (!resolvedTitle && formDoc?.title) {
        resolvedTitle = formDoc.title
      }
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData,
      },
    })

    type GlobalSlug = Parameters<typeof payload.findGlobal>[0]['slug']
    const templates = (await payload
      .findGlobal({
        slug: 'email-templates' as GlobalSlug,
        overrideAccess: true,
      })
      .catch(() => null)) as EmailTemplatesGlobal | null

    const adminRecipients = Array.isArray(templates?.adminRecipients)
      ? templates?.adminRecipients ?? []
      : []
    const adminEmails = adminRecipients
      .map((entry) =>
        typeof entry?.email === 'string' ? entry.email.trim() : '',
      )
      .filter(Boolean)
    const adminEmail = getTemplateString(templates?.adminEmail)

    const formReceiverEmail = getTemplateString(formDoc?.receiverEmail)
    const formEmails = Array.isArray(formDoc?.emails)
      ? formDoc.emails.flatMap((entry) => toEmailList(entry?.emailTo))
      : []
    const formRecipients = [...formEmails, formReceiverEmail].filter(Boolean)

    const fallbackAdminEmail =
      process.env.ADMIN_EMAIL ||
      process.env.FORM_DEFAULT_TO_EMAIL ||
      process.env.SMTP_FROM

    const templateRecipients = [...adminEmails, adminEmail].filter(Boolean)
    const mergedRecipients = formRecipients.length
      ? formRecipients
      : templateRecipients
    const recipients = mergedRecipients.length
      ? Array.from(new Set(mergedRecipients))
      : [fallbackAdminEmail].filter(Boolean)

    if (!recipients.length) {
      return NextResponse.json(
        { success: false, message: 'Admin email not configured' },
        { status: 500 },
      )
    }

    const brandName =
      getTemplateString(templates?.brandName) || 'Codified Web Solutions'
    const formTitle = resolvedTitle || 'Contact Form'
    const tableHtml = toHtmlTable(submissionData)

    await payload.sendEmail({
      to: recipients,
      subject: `New ${formTitle} Submission`,
      html: `
        <div style="font-family:Arial, sans-serif; color:#111827; line-height:1.6;">
          <h3 style="margin:0 0 12px;">${escapeHtml(
            brandName,
          )} - ${escapeHtml(formTitle)}</h3>
          ${tableHtml}
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 },
    )
  }
}
