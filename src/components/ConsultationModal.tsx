'use client'

import { useModal } from '@/context/ModalContext'
import { Check, Lock, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { InputField } from './Homepage/Footer'
import { useForm, type FieldErrors } from 'react-hook-form'

type FormFieldOption = {
  label: string
  value: string
}

type FormField = {
  label?: string
  name?: string
  blockType?: string
  options?: FormFieldOption[]
  required?: boolean
  placeholder?: string
}

type FormDoc = {
  id?: string
  title?: unknown
  description?: unknown
  submitButtonLabel?: unknown
  fields?: FormField[]
}

type FormResponse = {
  docs?: FormDoc[]
}

type ConsultationModalCopy = {
  modalEyebrow?: string
  modalHeading?: string
  modalDescription?: string
  modalBenefits?: { text?: string }[]
  modalTrustLine?: string
  formEyebrow?: string
  formHeading?: string
  formDescription?: string
  ctaLabel?: string
  securityLine?: string
}

type ConsultationPageDoc = {
  consultationModal?: ConsultationModalCopy
}

type ConsultationPageResponse = {
  docs?: ConsultationPageDoc[]
}

type FormValues = Record<string, string | number | boolean | null | undefined>

const timeSlotOptions: FormFieldOption[] = [
  { label: '1:00 PM - 2:00 PM', value: '1-2' },
  { label: '2:00 PM - 3:00 PM', value: '2-3' },
  { label: '3:00 PM - 4:00 PM', value: '3-4' },
  { label: '4:00 PM - 5:00 PM', value: '4-5' },
]

export const ConsultationModal = () => {
  const { isOpen, closeModal } = useModal()
  const [form, setForm] = useState<FormField[] | null>(null)
  const [pageCopy, setPageCopy] = useState<ConsultationPageDoc | null>(null)
  const [formMeta, setFormMeta] = useState<{
    id?: string
    title?: unknown
    description?: unknown
    submitLabel?: unknown
  }>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const today = new Date().toISOString().split('T')[0]

  const resolveText = (value: unknown, fallback = '') => {
    if (typeof value === 'string') return value
    if (value && typeof value === 'object') {
      const firstText = Object.values(value).find(
        (entry) => typeof entry === 'string',
      )
      if (typeof firstText === 'string') return firstText
    }
    return fallback
  }

  const normalizeFieldLabel = (value?: string, name?: string) => {
    const base = value?.trim() || name?.trim() || ''
    const lower = base.toLowerCase()
    if (lower.includes('describe your idea')) {
      return 'Tell us about your project goals'
    }
    if (lower.includes('select slot') || lower.includes('select time')) {
      return 'Preferred Time Slot'
    }
    return base
  }

  const normalizeFieldPlaceholder = (value?: string, label?: string) => {
    const base = value?.trim()
    if (!base) return label
    const lower = base.toLowerCase()
    if (lower.includes('describe your idea')) {
      return 'Tell us about your project goals'
    }
    if (lower.includes('select slot') || lower.includes('select time')) {
      return 'Preferred Time Slot'
    }
    return base
  }

  const normalizeSubmitLabel = (value: string) => {
    if (!value) return 'Schedule My Free Strategy Call →'
    if (/consult\s*us/i.test(value)) return 'Schedule My Free Strategy Call →'
    return value
  }

  const swapEmailAndContactFields = (fields: FormField[]) => {
    if (fields.length < 2) return fields
    const next = [...fields]
    const findIndex = (matcher: RegExp) =>
      next.findIndex((field) => {
        const haystack = `${field.label ?? ''} ${field.name ?? ''}`.toLowerCase()
        return matcher.test(haystack)
      })
    const emailIndex = findIndex(/\b(e-?mail|email|mail)\b/)
    const contactIndex = findIndex(/\b(contact|phone|mobile|number)\b/)
    if (emailIndex === -1 || contactIndex === -1) return fields
    ;[next[emailIndex], next[contactIndex]] = [next[contactIndex], next[emailIndex]]
    return next
  }

  const stripDuration = (value: string) =>
    value.replace(/\s*\(.*?mins?\)/i, '').replace(/\s{2,}/g, ' ').trim()

  useEffect(() => {
    const getData = async () => {
      try {
        const [formResult, pageResult] = await Promise.allSettled([
          fetch(`/api/forms?where[title][equals]=Free Consultation`),
          fetch(`/api/consultation-page?limit=1`),
        ])

        if (formResult.status === 'fulfilled') {
          const data = (await formResult.value.json()) as FormResponse
          const form = data?.docs?.[0]
          const fields = Array.isArray(form?.fields) ? form.fields : []
          const hasPreferredDate = fields.some(
            (field) =>
              typeof field?.name === 'string' &&
              field.name.toLowerCase() === 'preferreddate',
          )
          const normalizedFields = hasPreferredDate
            ? fields
            : [
              ...fields,
              {
                label: 'Preferred Date',
                name: 'preferredDate',
                blockType: 'date',
                required: false,
              },
            ]
          setForm(normalizedFields)
          setFormMeta({
            id: typeof form?.id === 'string' ? form.id : undefined,
            title: form?.title,
            description: form?.description,
            submitLabel: form?.submitButtonLabel,
          })
        } else {
          setForm([])
        }

        if (pageResult.status === 'fulfilled') {
          const pageData = (await pageResult.value
            .json()
            .catch(() => null)) as ConsultationPageResponse | null
          const doc = pageData?.docs?.[0]
          setPageCopy(doc ?? null)
        } else {
          setPageCopy(null)
        }
      } catch (error) {
        console.error('Failed to fetch form data:', error)
        setForm([])
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      reset()
      setSubmitError(null)
      setSubmitSuccess(false)
      setSubmitting(false)
      return
    }

    setSubmitError(null)
    setSubmitSuccess(false)
  }, [isOpen, reset])

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true)
      setSubmitError(null)
      setSubmitSuccess(false)
      const formTitle = resolveText(formMeta.title, 'Free Consultation')
      const res = await fetch('/api/free-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: formMeta.id,
          formTitle,
          data,
        }),
      })

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null)
        throw new Error(errorBody?.message || 'Form submission failed')
      }
      setSubmitSuccess(true)
      console.log('✅ Submitted successfully')
      reset()
    } catch (err) {
      console.error('❌ Error submitting form:', err)
      setSubmitError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null
  if (!form) return <h1>Loading...</h1>

  const heading = resolveText(formMeta.title, 'Free Consultation')
  const description = resolveText(
    formMeta.description,
    'Get expert advice tailored to your needs.',
  )
  const modalCopy = pageCopy?.consultationModal
  const submitLabel = normalizeSubmitLabel(
    resolveText(
      modalCopy?.ctaLabel ||
        resolveText(formMeta.submitLabel, 'Schedule My Free Strategy Call →'),
      'Schedule My Free Strategy Call →',
    ),
  )
  const valueHeading = /free consultation/i.test(heading)
    ? 'Why Book a Free Consultation?'
    : heading
  const leftEyebrow = resolveText(modalCopy?.modalEyebrow, 'Free Consultation')
  const leftHeading = resolveText(modalCopy?.modalHeading, valueHeading)
  const leftDescription = resolveText(modalCopy?.modalDescription, description)
  const leftBenefits = Array.isArray(modalCopy?.modalBenefits)
    ? modalCopy?.modalBenefits
        .map((benefit) => benefit?.text?.trim())
        .filter((benefit): benefit is string => Boolean(benefit))
    : []
  const benefits =
    leftBenefits.length > 0
      ? leftBenefits.map((benefit) => stripDuration(benefit))
      : [
        'Expert strategy session',
        'Industry-specific roadmap',
        'No obligation, 100% free',
      ]
  const trustLine = resolveText(
    modalCopy?.modalTrustLine,
    'Trusted by founders & teams across fintech, healthcare, and retail.',
  )
  const formEyebrow = resolveText(modalCopy?.formEyebrow, 'Schedule Your Call')
  const formHeading = resolveText(
    modalCopy?.formHeading,
    'Start your free strategy session',
  )
  const formDescription = resolveText(
    modalCopy?.formDescription,
    "Share a few details and we'll respond within 24 hours.",
  )
  const securityLine = resolveText(
    modalCopy?.securityLine,
    'Your information is secure. We never share your data.',
  )
  const orderedForm = form ? swapEmailAndContactFields(form) : form

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#0b1224] to-[#1e293b] text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(650px_circle_at_20%_15%,rgba(59,130,246,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_85%_30%,rgba(168,85,247,0.18),transparent_65%)]" />

          {/* Close Button */}
          <motion.button
            type="button"
            whileHover={{ rotate: 90, scale: 1.2 }}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              closeModal()
            }}
            aria-label="Close consultation modal"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition hover:bg-white/15 hover:text-white pointer-events-auto"
          >
            <X size={24} />
          </motion.button>

          <div className="relative grid grid-cols-1 gap-10 px-8 py-10 md:px-12 md:py-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center">
              <motion.p
                className="text-xs uppercase tracking-[0.35em] text-blue-200/80"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                {leftEyebrow}
              </motion.p>
              <motion.h2
                className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {leftHeading}
              </motion.h2>
              <motion.p
                className="mt-3 text-sm text-blue-100/80 md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {leftDescription}
              </motion.p>

              <div className="mt-6 space-y-3 text-sm text-blue-100">
                {benefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-200">
                      <Check size={14} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-blue-100/80">
                {trustLine}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl md:p-8">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-200/80">
                  {formEyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {formHeading}
                </h3>
                <p className="mt-2 text-sm text-blue-100/70">
                  {formDescription}
                </p>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {/* CMS dynamic fields */}
                {orderedForm.length > 0 ? (
                  orderedForm.map((field, index) => {
                    const fieldName =
                      typeof field.name === 'string' && field.name.trim()
                        ? field.name
                        : `field_${index + 1}`
                    const fieldType = field.blockType || 'text'
                    const fieldLabel = normalizeFieldLabel(
                      field.label,
                      field.name || `Field ${index + 1}`,
                    )
                    const lowerFieldName = fieldName.toLowerCase()
                    const lowerFieldLabel = fieldLabel.toLowerCase()
                    const isEmailField =
                      lowerFieldName.includes('email') || lowerFieldLabel.includes('email')
                    const shouldSpan =
                      fieldType === 'textarea' ||
                      lowerFieldName.includes('message') ||
                      lowerFieldName.includes('idea') ||
                      isEmailField
                    const placeholder = normalizeFieldPlaceholder(
                      field.placeholder,
                      fieldLabel,
                    )
                    const isTimeSlotField =
                      fieldType === 'select' &&
                      (fieldName.toLowerCase().includes('slot') ||
                        fieldName.toLowerCase().includes('time'))
                    const fieldOptions = isTimeSlotField
                      ? timeSlotOptions
                      : field.options || []
                    const hideFloatingLabel =
                      !['select', 'date'].includes(fieldType) &&
                      !fieldName.toLowerCase().includes('slot')
                    const fieldLabelClassName = hideFloatingLabel
                      ? 'text-blue-100/70 peer-placeholder-shown:text-blue-100/70 peer-focus:text-blue-200 peer-[:not(:placeholder-shown)]:opacity-0'
                      : 'text-blue-100/70 peer-placeholder-shown:text-blue-100/70 peer-focus:text-blue-200'
                    return (
                      <motion.div
                        key={fieldName}
                        className={shouldSpan ? 'sm:col-span-2' : 'sm:col-span-1'}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <InputField
                          label={fieldLabel || `Field ${index + 1}`}
                          name={fieldName}
                          type={fieldType}
                          options={fieldOptions}
                          required={Boolean(field.required)}
                          placeholder={placeholder}
                          min={fieldType === 'date' ? today : undefined}
                          register={register}
                          error={
                            typeof (errors as FieldErrors<FormValues>)[fieldName]
                              ?.message === 'string'
                              ? (errors as FieldErrors<FormValues>)[fieldName]
                                ?.message
                              : undefined
                          }
                          floatingLabel
                          className="border border-white/20 bg-white/5 px-4 py-4 text-white focus-within:border-blue-300/60 focus-within:ring-2 focus-within:ring-blue-400/40"
                          inputClassName="w-full bg-transparent text-white placeholder:text-transparent focus:outline-none"
                          selectClassName="w-full bg-transparent text-white focus:outline-none"
                          textareaClassName="w-full bg-transparent text-white placeholder:text-transparent focus:outline-none"
                          labelClassName={fieldLabelClassName}
                        />
                      </motion.div>
                    )
                  })
                ) : (
                  <p className="col-span-2 text-sm text-blue-100/70 italic">
                    No form fields configured.
                  </p>
                )}

                {/* Submit Button */}
                <motion.div
                  className="col-span-1 sm:col-span-2 flex flex-col items-center"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <motion.button
                    whileHover={{ y: -3 }}
                    type="submit"
                    disabled={submitting}
                    className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? 'Submitting...' : submitLabel}
                  </motion.button>
                  <div className="mt-3 flex items-center gap-2 text-xs text-blue-100/80">
                    <Lock size={14} />
                    <span>{securityLine}</span>
                  </div>
                </motion.div>

                {submitError && (
                  <p className="col-span-1 sm:col-span-2 text-sm text-red-400 mt-2">
                    {submitError}
                  </p>
                )}
                {submitSuccess && (
                  <div className="col-span-1 sm:col-span-2 mt-2 space-y-1 text-sm text-green-400">
                    <p>Thank you for your interest.</p>
                    <p>Our team will contact you soon.</p>
                  </div>
                )}
              </motion.form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
