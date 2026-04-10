import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const normalizeOrigin = (value?: string | null) => {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  return trimmed.replace(/\/$/, '')
}

const toAbsoluteUrl = (url: string, baseUrl: string) => {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  if (!baseUrl) return url
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

const toHtmlTable = (rows: { label: string; valueHtml: string }[]) => {
  const html = rows
    .map(({ label, valueHtml }) => {
      const safeLabel = escapeHtml(label)
      return `<tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>${safeLabel}</strong></td><td style="padding:6px 10px;border:1px solid #e5e7eb;">${valueHtml}</td></tr>`
    })
    .join('')

  return `<table style="border-collapse:collapse;width:100%;font-family:Arial, sans-serif;font-size:14px;">${html}</table>`
}

const getTemplateString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

type EmailTemplatesGlobal = {
  brandName?: string
  adminEmail?: string
  adminRecipients?: { email?: string }[]
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const formData = await req.formData()

    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const comment = String(formData.get('comment') ?? '').trim()
    const resumeFile = formData.get('resume')

    if (!name || !email || !(resumeFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and resume are required.' },
        { status: 400 },
      )
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx']
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const fileName = resumeFile.name || 'resume'
    const lowerFileName = fileName.toLowerCase()
    const hasValidExtension = allowedExtensions.some((ext) =>
      lowerFileName.endsWith(ext),
    )
    const hasValidType =
      resumeFile.type && allowedMimeTypes.includes(resumeFile.type)

    if (!hasValidExtension && !hasValidType) {
      return NextResponse.json(
        { success: false, message: 'Resume must be a PDF or Word document.' },
        { status: 400 },
      )
    }

    const maxFileSize = 5 * 1024 * 1024
    if (resumeFile.size > maxFileSize) {
      return NextResponse.json(
        { success: false, message: 'Resume must be under 5MB.' },
        { status: 400 },
      )
    }

    const arrayBuffer = await resumeFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: `${name} Resume` },
      file: {
        data: buffer,
        name: fileName,
        mimetype: resumeFile.type || 'application/octet-stream',
        size: resumeFile.size,
      },
    })

    const baseUrl =
      normalizeOrigin(process.env.NEXT_PUBLIC_WEB_URI) ||
      normalizeOrigin(process.env.NEXT_PUBLIC_PAYLOAD_URL) ||
      normalizeOrigin(req.headers.get('origin'))
    const resumeUrl =
      typeof mediaDoc?.url === 'string' ? mediaDoc.url.trim() : ''
    const resumeLink = toAbsoluteUrl(resumeUrl, baseUrl)
    const resumeHtml = resumeLink
      ? `<a href="${escapeHtml(resumeLink)}" style="color:#111827;text-decoration:none;">Download Resume</a>`
      : escapeHtml(fileName)

    const tableHtml = toHtmlTable([
      { label: 'Name', valueHtml: escapeHtml(name) },
      { label: 'Email', valueHtml: escapeHtml(email) },
      { label: 'Comment', valueHtml: escapeHtml(comment || '—') },
      { label: 'Resume', valueHtml: resumeHtml },
    ])

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

    const fallbackAdminEmail =
      process.env.ADMIN_EMAIL ||
      process.env.FORM_DEFAULT_TO_EMAIL ||
      process.env.SMTP_FROM

    const recipients = Array.from(
      new Set([...adminEmails, adminEmail, fallbackAdminEmail].filter(Boolean)),
    )

    if (!recipients.length) {
      return NextResponse.json(
        { success: false, message: 'Admin email not configured.' },
        { status: 500 },
      )
    }

    const brandName =
      getTemplateString(templates?.brandName) || 'Codified Web Solutions'

    await payload.sendEmail({
      to: recipients,
      subject: `New Career Application - ${name}`,
      html: `
        <div style="font-family:Arial, sans-serif; color:#111827; line-height:1.6;">
          <h3 style="margin:0 0 12px;">${escapeHtml(brandName)} - Career Application</h3>
          ${tableHtml}
        </div>
      `,
      replyTo: email || undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 },
    )
  }
}
