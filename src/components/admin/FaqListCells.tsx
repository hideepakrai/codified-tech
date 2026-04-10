'use client'

import { useEffect, useMemo, useState } from 'react'

const getPlainTextFromLexical = (value: unknown): string => {
  if (!value) return ''
  if (typeof value === 'string') return value

  
  const texts: string[] = []
  const walk = (node: any) => {
    if (!node) return
    if (typeof node.text === 'string') texts.push(node.text)
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }

  walk((value as any)?.root)
  return texts.join(' ').replace(/\s+/g, ' ').trim()
}

const getFaqLike = (rowData: any) => {
  const faqs = Array.isArray(rowData?.faqs) ? rowData.faqs : []
  if (faqs.length > 0) return faqs[0]
  const items = Array.isArray(rowData?.items) ? rowData.items : []
  if (items.length > 0) return items[0]
  return rowData || {}
}

const truncate = (value: string, max = 80) => {
  if (!value) return ''
  if (value.length <= max) return value
  return `${value.slice(0, Math.max(0, max - 3))}...`
}

const getIdFromValue = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'object') {
    const maybeValue = (value as { value?: unknown; id?: unknown }).value
    const maybeId = (value as { value?: unknown; id?: unknown }).id
    if (typeof maybeValue === 'string' || typeof maybeValue === 'number') {
      return String(maybeValue)
    }
    if (typeof maybeId === 'string' || typeof maybeId === 'number') {
      return String(maybeId)
    }
  }

  return null
}

const getTitleFromValue = (value: unknown): string | null => {
  if (!value || typeof value !== 'object') return null
  const raw = value as {
    title?: unknown
    label?: unknown
    slug?: unknown
    value?: unknown
  }

  if (typeof raw.slug === 'string' && raw.slug.trim()) return raw.slug.trim()
  if (typeof raw.title === 'string' && raw.title.trim()) return raw.title.trim()
  if (typeof raw.label === 'string' && raw.label.trim()) return raw.label.trim()

  if (raw.value && typeof raw.value === 'object') {
    const nested = raw.value as {
      title?: unknown
      label?: unknown
      slug?: unknown
    }
    if (typeof nested.slug === 'string' && nested.slug.trim()) {
      return nested.slug.trim()
    }
    if (typeof nested.title === 'string' && nested.title.trim()) {
      return nested.title.trim()
    }
    if (typeof nested.label === 'string' && nested.label.trim()) {
      return nested.label.trim()
    }
  }

  return null
}

const getIds = (value: unknown): string[] => {
  const ids = new Set<string>()

  if (Array.isArray(value)) {
    value.forEach((item) => {
      const id = getIdFromValue(item)
      if (id) ids.add(id)
    })
    return Array.from(ids)
  }

  const singleId = getIdFromValue(value)
  if (singleId) ids.add(singleId)

  return Array.from(ids)
}

const getLocalTitles = (value: unknown) => {
  const entries: { id: string; title: string }[] = []

  if (Array.isArray(value)) {
    value.forEach((item) => {
      const id = getIdFromValue(item)
      const title = getTitleFromValue(item)
      if (id && title) entries.push({ id, title })
    })
  } else {
    const id = getIdFromValue(value)
    const title = getTitleFromValue(value)
    if (id && title) entries.push({ id, title })
  }

  return entries
}

const chunk = (items: string[], size: number) => {
  const chunks: string[][] = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

export function FaqQuestionCell({ rowData }: { rowData?: any }) {
  const first = getFaqLike(rowData)
  const question =
    typeof first?.question === 'string' ? first.question.trim() : ''

  return <span>{question || '-'}</span>
}

export function FaqAnswerCell({ rowData }: { rowData?: any }) {
  const first = getFaqLike(rowData)
  const answer = getPlainTextFromLexical(first?.answer)
  const display = truncate(answer, 100)

  return <span title={answer || ''}>{display || '-'}</span>
}

export function FaqTagsCell({ rowData }: { rowData?: any }) {
  const first = getFaqLike(rowData)
  const tags = Array.isArray(first?.tags) ? first.tags : []
  const ids = useMemo(() => getIds(tags), [tags])
  const localTitles = useMemo(() => getLocalTitles(tags), [tags])
  const idsKey = useMemo(() => ids.join('|'), [ids])
  const localTitlesKey = useMemo(
    () => localTitles.map(({ id, title }) => `${id}:${title}`).join('|'),
    [localTitles]
  )
  const [titleMap, setTitleMap] = useState<Record<string, string>>({})

  useEffect(() => {
    const initialMap: Record<string, string> = {}
    localTitles.forEach(({ id, title }) => {
      initialMap[id] = title
    })
    setTitleMap((prev) => {
      const prevKeys = Object.keys(prev)
      const nextKeys = Object.keys(initialMap)
      if (prevKeys.length !== nextKeys.length) return initialMap
      for (const key of nextKeys) {
        if (prev[key] !== initialMap[key]) return initialMap
      }
      return prev
    })

    const missingIds = ids.filter((id) => !initialMap[id])
    if (missingIds.length === 0) return

    let cancelled = false

    const load = async () => {
      const newMap: Record<string, string> = { ...initialMap }
      const batches = chunk(missingIds, 50)

      for (const batch of batches) {
        const params = new URLSearchParams()
        params.set('limit', String(batch.length))
        params.set('where[id][in]', batch.join(','))

        const res = await fetch(`/api/tags?${params.toString()}`)
        if (!res.ok) continue
        const data = await res.json()
        const docs = Array.isArray(data?.docs) ? data.docs : []
        docs.forEach((doc: { id?: string; title?: string; slug?: string }) => {
          if (!doc?.id) return
          newMap[doc.id] = doc.slug || doc.title || doc.id
        })
      }

      if (!cancelled) setTitleMap(newMap)
    }

    load()

    return () => {
      cancelled = true
    }
  }, [idsKey, localTitlesKey])

  const labels = ids.map((id) => titleMap[id] || id).filter(Boolean)
  const value = labels.join(', ')
  const display = truncate(value, 80)

  return <span title={value || ''}>{display || '-'}</span>
}

export function FaqIsActiveCell({ rowData }: { rowData?: any }) {
  const first = getFaqLike(rowData)
  const value = first?.isActive
  const label = value === true ? 'Yes' : value === false ? 'No' : '-'

  return <span>{label}</span>
}

export function EmptyField() {
  return null
}
