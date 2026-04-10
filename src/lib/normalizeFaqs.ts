export type FaqDoc = {
  id?: string | number | null
  faqs?:
    | {
        question?: string | null
        answer?: unknown
        tags?: unknown[] | null
        isActive?: boolean | null
        order?: number | null
      }[]
    | null
  items?:
    | {
        question?: string | null
        answer?: unknown
        isActive?: boolean | null
        order?: number | null
      }[]
    | null
  question?: string | null
  answer?: unknown
  tags?: unknown[] | null
  isActive?: boolean | null
  order?: number | null
}

export type NormalizedFaq = {
  id: string
  question: string
  answer: unknown
  tags?: string[]
  order?: number
}

type NormalizeOptions = {
  tagIds?: string[]
}

const byOrderThenIndex = (
  a: { order?: number | null },
  b: { order?: number | null }
) => {
  const orderA = Number.isFinite(a.order) ? (a.order as number) : 999999
  const orderB = Number.isFinite(b.order) ? (b.order as number) : 999999
  if (orderA !== orderB) return orderA - orderB
  return 0
}

const getTagLabel = (tag: unknown): string => {
  if (!tag) return ''
  if (typeof tag === 'string' || typeof tag === 'number') return String(tag)
  if (typeof tag === 'object') {
    const raw = tag as {
      slug?: unknown
      title?: unknown
      label?: unknown
      value?: unknown
      id?: unknown
    }

    if (typeof raw.slug === 'string' && raw.slug.trim()) return raw.slug.trim()
    if (typeof raw.title === 'string' && raw.title.trim())
      return raw.title.trim()
    if (typeof raw.label === 'string' && raw.label.trim())
      return raw.label.trim()
    if (typeof raw.value === 'string' || typeof raw.value === 'number') {
      return String(raw.value)
    }
    if (typeof raw.id === 'string' || typeof raw.id === 'number') {
      return String(raw.id)
    }
  }
  return ''
}

const normalizeTags = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return []
  return tags.map(getTagLabel).filter((label) => label.length > 0)
}

const getTagCandidates = (tag: unknown): string[] => {
  if (!tag) return []
  if (typeof tag === 'string' || typeof tag === 'number') {
    return [String(tag)]
  }
  if (typeof tag === 'object') {
    const raw = tag as {
      id?: unknown
      value?: unknown
      slug?: unknown
      title?: unknown
      label?: unknown
    }
    const candidates: string[] = []
    if (typeof raw.id === 'string' || typeof raw.id === 'number') {
      candidates.push(String(raw.id))
    }
    if (typeof raw.value === 'string' || typeof raw.value === 'number') {
      candidates.push(String(raw.value))
    }
    if (typeof raw.slug === 'string' && raw.slug.trim()) {
      candidates.push(raw.slug.trim())
    }
    if (typeof raw.title === 'string' && raw.title.trim()) {
      candidates.push(raw.title.trim())
    }
    if (typeof raw.label === 'string' && raw.label.trim()) {
      candidates.push(raw.label.trim())
    }
    return candidates
  }
  return []
}

const hasTagMatch = (tags: unknown, filterSet: Set<string>) => {
  if (filterSet.size === 0) return true
  if (!Array.isArray(tags)) return false
  return tags.some((tag) =>
    getTagCandidates(tag).some((candidate) => filterSet.has(candidate))
  )
}

export const normalizeFaqs = (
  docs: FaqDoc[],
  options: NormalizeOptions = {}
): NormalizedFaq[] => {
  const tagFilterSet = new Set(
    (options.tagIds || []).map((id) => String(id)).filter(Boolean)
  )
  const normalized: NormalizedFaq[] = []

  docs.forEach((doc, docIndex) => {
    const faqs = Array.isArray(doc.faqs) ? doc.faqs : []
    if (faqs.length > 0) {
      const sorted = [...faqs]
        .filter((item) => item?.isActive !== false)
        .sort(byOrderThenIndex)

      sorted.forEach((item, itemIndex) => {
        if (!item) return
        if (!hasTagMatch(item.tags, tagFilterSet)) return

        const question =
          typeof item.question === "string" ? item.question.trim() : ""

        const answer = item.answer
        const order = Number.isFinite(item.order)
          ? (item.order as number)
          : undefined

        if (!question && !answer) return

        normalized.push({
          id: `${doc.id ?? `faq-${docIndex}`}-item-${itemIndex}`,
          question,
          answer,
          tags: normalizeTags(item.tags),
          order,
        })
      })
      return
    }

    const items = Array.isArray(doc.items) ? doc.items : []
    if (items.length > 0) {
      const sorted = [...items]
        .filter((item) => item?.isActive !== false)
        .sort(byOrderThenIndex)

      sorted.forEach((item, itemIndex) => {
        if (!item) return
        if (!hasTagMatch((item as any).tags, tagFilterSet)) return

        const question =
          typeof item.question === "string" ? item.question.trim() : ""

        const answer = item.answer ?? null
        const order = Number.isFinite(item.order)
          ? (item.order as number)
          : undefined

        if (!question && !answer) return

        normalized.push({
          id: `${doc.id ?? `faq-${docIndex}`}-item-${itemIndex}`,
          question,
          answer,
          order,
        })
      })
      return
    }

    const question =
      typeof doc.question === "string" ? doc.question.trim() : ""

    const answer = doc.answer ?? null
    const order = Number.isFinite(doc.order) ? (doc.order as number) : undefined

    if (!hasTagMatch(doc.tags, tagFilterSet)) return

    if (!question && !answer) return

    normalized.push({
      id: String(doc.id ?? `faq-${docIndex}`),
      question,
      answer,
      tags: normalizeTags(doc.tags),
      order,
    })
  })

  return normalized
}
