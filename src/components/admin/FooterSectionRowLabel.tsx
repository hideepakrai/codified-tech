'use client'

const LABELS_BY_KEY: Record<string, string> = {
  about: 'About',
  services: 'Services',
  technologies: 'Technologies',
  industries: 'Industries',
  custom: 'Custom',
}

type RowLabelProps = {
  data?: {
    title?: unknown
    sectionKey?: unknown
  }
  index?: number
}

const getLabel = (data?: RowLabelProps['data']) => {
  const title =
    typeof data?.title === 'string' ? data.title.trim() : ''
  if (title) return title

  const key = typeof data?.sectionKey === 'string' ? data.sectionKey : ''
  const keyLabel = key ? LABELS_BY_KEY[key] : ''
  return keyLabel || ''
}

const getFallback = (index?: number) => {
  if (typeof index !== 'number') return 'Section'
  const number = String(index + 1).padStart(2, '0')
  return `Section ${number}`
}

export function FooterSectionRowLabel({ data, index }: RowLabelProps) {
  const label = getLabel(data)
  return <span>{label || getFallback(index)}</span>
}
