type RecordValue = Record<string, unknown>

const isRecord = (value: unknown): value is RecordValue =>
  typeof value === 'object' && value !== null

const hasOwn = (value: object, key: string) =>
  Object.prototype.hasOwnProperty.call(value, key)

const getString = (value: unknown) =>
  typeof value === 'string' ? value : undefined

const getMaybe = (value: unknown) =>
  value === null || value === undefined ? undefined : value

export const syncMetaFromLegacy = (doc: unknown) => {
  if (!isRecord(doc)) return doc

  const meta = isRecord(doc.meta) ? { ...doc.meta } : {}
  const legacyMetaTitle = getString(meta.metaTitle)
  const legacyMetaDescription = getString(meta.metaDescription)
  const currentTitle = getString(meta.title)
  const currentDescription = getString(meta.description)

  const docMetaTitle = getString(doc.metaTitle)
  const docMetaDescription = getString(doc.metaDescription)

  if (!currentTitle && (docMetaTitle || legacyMetaTitle)) {
    meta.title = docMetaTitle ?? legacyMetaTitle
  }
  if (!currentDescription && (docMetaDescription || legacyMetaDescription)) {
    meta.description = docMetaDescription ?? legacyMetaDescription
  }

  const og = isRecord(doc.openGraph) ? doc.openGraph : {}
  const metaOgTitle = getString(meta.ogTitle)
  const metaOgDescription = getString(meta.ogDescription)
  const legacyOgTitle = getString(og.ogTitle)
  const legacyOgDescription = getString(og.ogDescription)

  if (!metaOgTitle && legacyOgTitle) meta.ogTitle = legacyOgTitle
  if (!metaOgDescription && legacyOgDescription)
    meta.ogDescription = legacyOgDescription

  const legacyOgImage = hasOwn(og, 'ogImage') ? getMaybe(og.ogImage) : undefined
  if (!hasOwn(meta, 'ogImage') && legacyOgImage !== undefined) {
    meta.ogImage = legacyOgImage
  }

  if (!hasOwn(meta, 'image')) {
    const fallbackImage = hasOwn(meta, 'ogImage')
      ? getMaybe(meta.ogImage)
      : legacyOgImage
    if (fallbackImage !== undefined) meta.image = fallbackImage
  }

  doc.meta = meta
  return doc
}

export const syncLegacyFromMeta = (data: unknown) => {
  if (!isRecord(data) || !isRecord(data.meta)) return data

  const meta = data.meta

  if (hasOwn(meta, 'title')) data.metaTitle = meta.title ?? null
  if (hasOwn(meta, 'description'))
    data.metaDescription = meta.description ?? null

  if (
    hasOwn(meta, 'ogTitle') ||
    hasOwn(meta, 'ogDescription') ||
    hasOwn(meta, 'ogImage') ||
    hasOwn(meta, 'image')
  ) {
    const openGraph = isRecord(data.openGraph) ? { ...data.openGraph } : {}
    if (hasOwn(meta, 'ogTitle')) openGraph.ogTitle = meta.ogTitle ?? null
    if (hasOwn(meta, 'ogDescription'))
      openGraph.ogDescription = meta.ogDescription ?? null

    if (hasOwn(meta, 'ogImage')) {
      openGraph.ogImage = meta.ogImage ?? null
    } else if (hasOwn(meta, 'image')) {
      openGraph.ogImage = meta.image ?? null
    }

    data.openGraph = openGraph
  }

  return data
}
