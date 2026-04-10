import FaqSection from '@/components/FaqSection'
import { getFaqs } from '@/lib/getFaqs'
import type { Page } from '@/payload-types'

type PageBlock = NonNullable<Page['blocks']>[number]
type FaqsBlock = Extract<PageBlock, { blockType: 'faqs' }>

const getTagId = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }
  if (typeof value === 'object') {
    const raw = value as {
      value?: unknown
      id?: unknown
      slug?: unknown
      title?: unknown
      label?: unknown
    }
    const maybeValue = raw.value
    const maybeId = raw.id
    if (typeof maybeValue === 'string' || typeof maybeValue === 'number') {
      return String(maybeValue)
    }
    if (typeof maybeId === 'string' || typeof maybeId === 'number') {
      return String(maybeId)
    }
    if (typeof raw.slug === 'string' && raw.slug.trim()) return raw.slug.trim()
    if (typeof raw.title === 'string' && raw.title.trim()) return raw.title.trim()
    if (typeof raw.label === 'string' && raw.label.trim()) return raw.label.trim()
  }
  return null
}

const getTagIds = (value: unknown): string[] => {
  const ids = new Set<string>()
  if (Array.isArray(value)) {
    value.forEach((item) => {
      const id = getTagId(item)
      if (id) ids.add(id)
    })
  } else {
    const id = getTagId(value)
    if (id) ids.add(id)
  }
  return Array.from(ids)
}

const getFaqId = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }
  if (typeof value === 'object') {
    const raw = value as { id?: unknown; value?: unknown }
    const maybeId = raw.id
    const maybeValue = raw.value
    if (typeof maybeId === 'string' || typeof maybeId === 'number') {
      return String(maybeId)
    }
    if (typeof maybeValue === 'string' || typeof maybeValue === 'number') {
      return String(maybeValue)
    }
  }
  return null
}

const getFaqIds = (value: unknown): string[] => {
  const ids = new Set<string>()
  if (Array.isArray(value)) {
    value.forEach((item) => {
      const id = getFaqId(item)
      if (id) ids.add(id)
    })
  } else {
    const id = getFaqId(value)
    if (id) ids.add(id)
  }
  return Array.from(ids)
}

const isFaqsBlock = (block?: PageBlock | null): block is FaqsBlock =>
  block?.blockType === 'faqs'

export const getFaqBlockKey = (
  block?: PageBlock | null,
  fallbackTag?: string | null,
): string | null => {
  if (block && !isFaqsBlock(block)) return null
  const faqIds = block ? getFaqIds(block.faqs).sort() : []
  if (faqIds.length > 0) return `faqs:${faqIds.join(',')}`
  const tagIds = block ? getTagIds(block.tags).sort() : []
  if (tagIds.length > 0) return `tags:${tagIds.join(',')}`
  const fallbackSlug = typeof fallbackTag === 'string' ? fallbackTag.trim() : ''
  return fallbackSlug ? `fallback:${fallbackSlug}` : null
}

export const dedupeFaqBlocks = (
  blocks: PageBlock[],
  fallbackTag?: string | null,
) => {
  const seen = new Set<string>()
  return blocks.filter((block) => {
    const key = getFaqBlockKey(block, fallbackTag)
    if (!key) return false
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function FaqsByTagBlock({
  block,
  fallbackTag,
}: {
  block?: PageBlock | null
  fallbackTag?: string | null
}) {
  if (block && !isFaqsBlock(block)) return null

  const faqIds = block ? getFaqIds(block.faqs) : []
  const tagIds = block ? getTagIds(block.tags) : []
  const fallbackSlug = typeof fallbackTag === 'string' ? fallbackTag.trim() : ''

  if (faqIds.length === 0 && tagIds.length === 0 && !fallbackSlug) {
    return null
  }

  const faqs = await getFaqs(undefined, fallbackSlug || undefined, {
    faqIds: faqIds.length > 0 ? faqIds : undefined,
    tagIds: faqIds.length > 0 ? undefined : tagIds.length > 0 ? tagIds : undefined,
    strict: true,
  })

  if (!faqs || faqs.length === 0) return null

  return <FaqSection faqs={faqs} />
}
