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

const pickFirst = (data: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = data[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }
  return ''
}

const findEmail = (data: Record<string, unknown>) => {
  const direct = pickFirst(data, ['email', 'emailId', 'emailID', 'email_id'])
  if (direct) return direct
  for (const value of Object.values(data)) {
    if (typeof value === 'string' && value.includes('@')) return value.trim()
  }
  return ''
}

const normalizeKeyLabel = (key: string) => {
  const cleaned = key.trim()
  const directMap: Record<string, string> = {
    fullname: 'Name',
    'full name': 'Name',
    full_name: 'Name',
    fullname_: 'Name',
    name: 'Name',
    email: 'Email',
    emailid: 'Email',
    email_id: 'Email',
    emailid_: 'Email',
    phone: 'Contact No',
    contact: 'Contact No',
    contactnumber: 'Contact No',
    'contact no': 'Contact No',
    contactno: 'Contact No',
    message: 'Describe',
    description: 'Describe',
    idea: 'Describe',
    describe: 'Describe',
    slot: 'Time Slot',
    timeslot: 'Time Slot',
    'time slot': 'Time Slot',
    preferreddate: 'Preferred Date',
    date: 'Preferred Date',
  }

  const normalized = cleaned.toLowerCase().replace(/[\s_-]+/g, '')
  const direct = directMap[normalized]
  if (direct) return direct

  const withSpaces = cleaned.replace(/[_-]+/g, ' ').trim()
  if (!withSpaces) return cleaned
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase()
}

const toHtmlTable = (data: Record<string, unknown>) => {
  const rows = Object.entries(data)
    .map(([key, value]) => {
      const safeKey = escapeHtml(normalizeKeyLabel(String(key)))
      const safeValue =
        value == null
          ? ''
          : typeof value === 'string'
            ? escapeHtml(value)
            : escapeHtml(JSON.stringify(value) ?? '')
      return `<tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>${safeKey}</strong></td><td style="padding:6px 10px;border:1px solid #e5e7eb;">${safeValue}</td></tr>`
    })
    .join('')

  return `<table style="border-collapse:collapse;width:100%;font-family:Arial, sans-serif;font-size:14px;">${rows}</table>`
}

const renderTemplate = (
  template: string,
  vars: Record<string, string>,
  htmlVars: Record<string, string> = {},
) => {
  if (!template) return ''
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => {
    if (htmlVars[key]) return htmlVars[key]
    return vars[key] ?? ''
  })
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
  adminSubject?: string
  adminBody?: string
  userSubject?: string
  userBody?: string
}

type FormDoc = {
  id?: string
  title?: string
  receiverEmail?: string
  emails?: { emailTo?: string | null }[]
}

const buildTableData = (
  dataObj: Record<string, unknown>,
  core: Record<string, unknown>,
) => {
  const result: Record<string, unknown> = { ...core }
  const coreLabels = new Set(
    Object.keys(core).map((key) => normalizeKeyLabel(key).toLowerCase()),
  )

  Object.entries(dataObj).forEach(([key, value]) => {
    const normalized = normalizeKeyLabel(String(key)).toLowerCase()
    if (!coreLabels.has(normalized)) {
      result[key] = value
    }
  })

  return result
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    const payloadBody = await req.json()

    if (!payloadBody || typeof payloadBody !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid payload' },
        { status: 400 },
      )
    }

    const payloadObj = payloadBody as Record<string, unknown>
    const formId = typeof payloadObj.formId === 'string' ? payloadObj.formId : ''
    const formTitle =
      typeof payloadObj.formTitle === 'string' ? payloadObj.formTitle.trim() : ''

    const nestedData =
      payloadObj.data &&
      typeof payloadObj.data === 'object' &&
      !Array.isArray(payloadObj.data)
        ? (payloadObj.data as Record<string, unknown>)
        : null

    const dataObj =
      nestedData ??
      Object.fromEntries(
        Object.entries(payloadObj).filter(
          ([key]) => key !== 'formId' && key !== 'formTitle' && key !== 'data',
        ),
      )

    const fullName = pickFirst(dataObj, [
      'fullName',
      'fullname',
      'full name',
      'name',
      'full_name',
    ])
    const email = findEmail(dataObj)
    const phone = pickFirst(dataObj, [
      'phone',
      'contact',
      'contactNumber',
      'contact number',
      'contact_no',
      'contact no',
      'contactNo',
      'contactnumber',
    ])
    const idea = pickFirst(dataObj, [
      'idea',
      'message',
      'description',
      'describe',
      'describe your idea',
    ])
    const slot = pickFirst(dataObj, [
      'slot',
      'timeSlot',
      'time slot',
      'time_slot',
      'timeslot',
    ])
    const preferredDate = pickFirst(dataObj, [
      'preferredDate',
      'preferred date',
      'preferred_date',
      'date',
    ])

    // Save in Payload
    await payload.create({
      collection: 'free-consultations',
      data: {
        fullName,
        email,
        phone,
        idea,
        slot,
        preferredDate,
        rawData: dataObj,
      },
    })

    const emailPayload = {
      dataObj,
      formId,
      formTitle,
      fullName,
      email,
      phone,
      idea,
      slot,
      preferredDate,
    }

    void (async () => {
      const emailErrors: string[] = []

      type GlobalSlug = Parameters<typeof payload.findGlobal>[0]['slug']
      const emailTemplatesSlug = 'email-templates' as GlobalSlug

      const templates = (await payload
        .findGlobal({
          slug: emailTemplatesSlug,
          overrideAccess: true,
        })
        .catch(() => null)) as EmailTemplatesGlobal | null

      let formDoc: FormDoc | null = null
      if (emailPayload.formId) {
        formDoc = (await payload
          .findByID({
            collection: 'forms',
            id: emailPayload.formId,
            overrideAccess: true,
            depth: 0,
          })
          .catch(() => null)) as FormDoc | null
      } else {
        const titleToFind = emailPayload.formTitle || 'Free Consultation'
        const fallbackForm = await payload
          .find({
            collection: 'forms',
            where: { title: { equals: titleToFind } },
            limit: 1,
            overrideAccess: true,
          })
          .catch(() => null)
        formDoc = (fallbackForm?.docs?.[0] as FormDoc | undefined) ?? null
      }

      const templateAdminRecipients = Array.isArray(templates?.adminRecipients)
        ? templates?.adminRecipients ?? []
        : []
      const adminRecipients = templateAdminRecipients
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

      const templateRecipients = [...adminRecipients, adminEmail].filter(Boolean)
      const mergedRecipients = formRecipients.length
        ? formRecipients
        : templateRecipients
      const adminEmails = mergedRecipients.length
        ? Array.from(new Set(mergedRecipients))
        : [fallbackAdminEmail].filter(Boolean)

      const tableData = buildTableData(emailPayload.dataObj, {
        fullname: emailPayload.fullName,
        email: emailPayload.email,
        'contact no': emailPayload.phone,
        describe: emailPayload.idea,
        'time slot': emailPayload.slot,
        'preferred date': emailPayload.preferredDate,
      })
      const tableHtml = toHtmlTable(tableData)

      const brandName =
        getTemplateString(templates?.brandName) || 'Codified Web Solutions'
      const supportEmail =
        getTemplateString(templates?.supportEmail) || 'support@codifiedtech.com'
      const websiteUrl =
        getTemplateString(templates?.websiteUrl) || 'https://www.codifiedtech.com'

      const safeVars: Record<string, string> = {
        fullName: escapeHtml(emailPayload.fullName || 'there'),
        email: escapeHtml(emailPayload.email),
        phone: escapeHtml(emailPayload.phone),
        idea: escapeHtml(emailPayload.idea),
        slot: escapeHtml(emailPayload.slot),
        preferredDate: escapeHtml(emailPayload.preferredDate),
        brandName: escapeHtml(brandName),
        supportEmail: escapeHtml(supportEmail),
        websiteUrl: escapeHtml(websiteUrl),
      }

      if (adminEmails.length) {
        try {
          const adminSubject =
            getTemplateString(templates?.adminSubject) ||
            'New Free Consultation Request'

          const adminBodyTemplate = getTemplateString(templates?.adminBody)
          const adminBodyBase = adminBodyTemplate
            ? renderTemplate(adminBodyTemplate, safeVars, { table: tableHtml })
            : `
            <h3 style="font-family:Arial, sans-serif;">New Free Consultation Lead</h3>
            ${tableHtml}
          `

          const adminBody =
            adminBodyTemplate && !adminBodyTemplate.includes('{{table}}')
              ? `${adminBodyBase}<div style="margin-top:12px;">${tableHtml}</div>`
              : adminBodyBase

          await payload.sendEmail({
            to: adminEmails,
            subject: adminSubject,
            html: adminBody,
            replyTo: emailPayload.email || undefined,
          })
        } catch (error) {
          console.error('Admin email failed:', error)
          emailErrors.push('admin_email_failed')
        }
      } else {
        emailErrors.push('admin_email_missing')
      }

      if (emailPayload.email) {
        const displayName = emailPayload.fullName || 'there'
        const userSubject =
          getTemplateString(templates?.userSubject) ||
          'We received your free consultation request'

        const userBodyTemplate = getTemplateString(templates?.userBody)

        try {
          const userBody = userBodyTemplate
            ? renderTemplate(userBodyTemplate, safeVars)
            : `
            <div style="font-family:Arial, sans-serif; color:#111827; line-height:1.7;">
              <p style="margin:0 0 14px;">Hi ${escapeHtml(displayName)},</p>
              <p style="margin:0 0 12px;">Thank you for reaching out to ${escapeHtml(
                brandName,
              )}.</p>
              <p style="margin:0 0 12px;">
                We have successfully received your request for a free consultation. Our team is currently reviewing the
                details you shared, and one of our experts will get in touch with you shortly to discuss your requirements.
              </p>
              <p style="margin:0 0 12px;">
                If you have any additional information to share in the meantime, feel free to reply to this email.
              </p>
              <p style="margin:0 0 12px;">
                We appreciate your interest in ${escapeHtml(
                  brandName,
                )} and look forward to connecting with you.
              </p>
              <p style="margin:0 0 12px;">
                Warm regards,<br />
                <strong>Team ${escapeHtml(brandName)}</strong>
              </p>
              <p style="margin:0;">
                Email: <a href="mailto:${escapeHtml(
                  supportEmail,
                )}" style="color:#111827; text-decoration:none;">${escapeHtml(
                  supportEmail,
                )}</a><br />
                Website: <a href="${escapeHtml(
                  websiteUrl,
                )}" style="color:#111827; text-decoration:none;">${escapeHtml(
                  websiteUrl,
                )}</a>
              </p>
            </div>
          `

          await payload.sendEmail({
            to: emailPayload.email,
            subject: userSubject,
            html: userBody,
          })
        } catch (error) {
          console.error('User email failed:', error)
          emailErrors.push('user_email_failed')
        }
      } else {
        emailErrors.push('user_email_missing')
      }

      if (emailErrors.length) {
        console.warn('Email errors:', emailErrors)
      }
    })().catch((error) => {
      console.error('Email task failed:', error)
    })

    return NextResponse.json({ success: true, emailQueued: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}



