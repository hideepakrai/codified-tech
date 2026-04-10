'use client'

import { useState, type FormEvent } from 'react'

type ContactFormProps = {
  formId?: string | null
  formTitle?: string | null
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export const ContactForm = ({ formId, formTitle }: ContactFormProps) => {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const submissionData = Array.from(formData.entries()).map(([field, value]) => ({
      field,
      value: String(value ?? ''),
    }))

    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          formTitle: formTitle || 'Contact Form',
          submissionData,
        }),
      })

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null)
        throw new Error(errorBody?.message || 'Form submission failed')
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Submission failed')
    }
  }

  return (
    <div className="bg-[#11162A] p-8 rounded-2xl border border-white/10 shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded-lg bg-[#0B0F1A] border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded-lg bg-[#0B0F1A] border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 rounded-lg bg-[#0B0F1A] border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="message"
          placeholder="Tell us about your project..."
          required
          rows={5}
          className="w-full p-3 rounded-lg bg-[#0B0F1A] border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' ? (
          <p className="text-green-400 text-sm text-center">
            Thank you! We will contact you soon.
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="text-red-400 text-sm text-center">
            {errorMessage || 'Submission failed'}
          </p>
        ) : null}
      </form>
    </div>
  )
}
