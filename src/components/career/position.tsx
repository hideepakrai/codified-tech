'use client'

import { useState, type FormEvent } from 'react'
import { useAnimate, motion } from 'motion/react'
import { FaChevronRight } from 'react-icons/fa'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export const Position = () => {
  const positions = [
    { title: 'Frontend Developer', experience: '2-4 years' },
    { title: 'Backend Developer', experience: '3-5 years' },
    { title: 'UI/UX Designer', experience: '2-3 years' },
    { title: 'QA Engineer', experience: '1-3 years' },
  ]

  return (
    <section className="py-24 px-6 md:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Open Positions</h3>
            <h2 className="text-4xl font-extrabold">Find The Career You Deserve</h2>
            <p className="max-w-3xl text-base text-white/80">
              We are always looking for curious, driven people to join our team. Browse the
              openings below and share your details to apply directly.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {positions.map((position) => {
              return (
                <PositionCard
                  key={position.title}
                  title={position.title}
                  experience={position.experience}
                />
              )
            })}
          </div>
        </div>
        <div className="lg:sticky lg:top-24">
          <CareerApplicationForm />
        </div>
      </div>
    </section>
  )
}

type PositionCardProps = {
  title: string
  experience: string
}

const PositionCard = ({ title, experience }: PositionCardProps) => {
  const [scope, animate] = useAnimate()

  const handleHover = () => {
    animate(
      '#tohover',
      { backgroundColor: '#845ec2', x: 120 },
      {
        duration: 0.3,
        ease: 'easeInOut',
      },
    )
  }

  const handleLeaverHover = () => {
    animate(
      '#tohover',
      { backgroundColor: '#c197ff', x: 0 },
      {
        duration: 0.3,
        ease: 'easeInOut',
      },
    )
  }

  return (
    <div className="w-full rounded-2xl bg-white p-4 text-black shadow-2xl">
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2">
          {title.charAt(0)}
        </span>
        <h3 className="flex-1 text-lg font-extrabold lg:px-4">{title}</h3>
        <span className="rounded-3xl bg-black px-6 py-2 text-center text-sm text-white lg:text-left">
          {experience}
        </span>
        <button
          ref={scope}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeaverHover}
          className="relative flex items-center justify-end gap-2"
        >
          <div className="relative z-20 flex flex-row items-center gap-4 px-5 py-2 text-[16px]">
            <span>Apply Now</span>
            <FaChevronRight size={18} />
          </div>
          <motion.div
            id="tohover"
            className="absolute left-1 z-10 h-9 w-9 rounded-full bg-[#c197ff]"
          ></motion.div>
        </button>
      </div>
    </div>
  )
}

const CareerApplicationForm = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/career-application', {
        method: 'POST',
        body: formData,
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
      <h3 className="text-2xl font-semibold">Apply Now</h3>
      <p className="mt-2 text-sm text-white/70">
        Share your details and resume. Our team will review your application and reach out.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-white/80" htmlFor="career-name">
            Full Name
          </label>
          <input
            id="career-name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-white/80" htmlFor="career-email">
            Email Address
          </label>
          <input
            id="career-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-white/80" htmlFor="career-resume">
            Resume Upload
          </label>
          <input
            id="career-resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-white/20"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-white/80" htmlFor="career-comment">
            Cover Letter
          </label>
          <textarea
            id="career-comment"
            name="comment"
            rows={4}
            placeholder="Write a brief cover letter explaining your experience and interest in this role."
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-lg bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="block py-3 font-semibold">
            {status === 'sending' ? 'Submitting...' : 'Submit Application'}
          </span>
        </button>

        {status === 'success' ? (
          <p className="text-center text-sm text-green-300">
            Thank you! Your application has been sent.
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="text-center text-sm text-red-300">
            {errorMessage || 'Submission failed'}
          </p>
        ) : null}
      </form>
    </div>
  )
}
