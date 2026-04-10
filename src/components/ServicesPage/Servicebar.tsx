'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type SectionItem =
  | string
  | {
      id: string
      label: string
    }

const normalizeId = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const Servicebar = ({ sections }: { sections: SectionItem[] }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const normalizedSections = useMemo(
    () =>
      (sections || [])
        .map((section) => {
          if (typeof section === 'string') {
            const label = section.trim()
            const id = normalizeId(label) || label
            return { id, label }
          }
          const label = section.label?.trim() || section.id
          const id = normalizeId(section.id || label)
          return { id, label }
        })
        .filter((section) => Boolean(section.id)),
    [sections],
  )

  useEffect(() => {
    if (!normalizedSections.length) return

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5, 0.6, 0.7], // multiple thresholds for better detection
    }

    const sectionVisibility: Record<string, number> = {}

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        sectionVisibility[id] = entry.intersectionRatio
      })

      const visibleSections = Object.entries(sectionVisibility)
        .filter(([_, ratio]) => ratio > 0.5) // consider only sections visible more than 50%
        .sort((a, b) => b[1] - a[1]) // sort by most visible

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0][0]) // most visible section
      } else {
        setActiveSection(null) // none are sufficiently visible
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    normalizedSections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => {
      normalizedSections.forEach((section) => {
        const el = document.getElementById(section.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [normalizedSections])

  if (!normalizedSections.length) return null

  return (
    <ul className="hidden m-auto lg:flex flex-row gap-4 border border-[#222222] items-center justify-between bg-white px-7 py-3 z-40 rounded-2xl lg:sticky top-0">
      {normalizedSections.map((section) => {
        const isActive = activeSection === section.id

        return (
          <Link scroll={true} href={`#${section.id}`} key={section.id}>
            <li
              className={`cursor-pointer text-sm px-4 py-2 rounded-lg transition-colors duration-300 ${
                isActive
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-black font-semibold hover:text-yellow-400'
              }`}
            >
              {section.label}
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
