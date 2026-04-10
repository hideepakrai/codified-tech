import Script from 'next/script'

type SeoSchemaProps = {
  schema?: unknown
}

const getSchemaValue = (value: unknown): string | null => {
  if (typeof value === 'string') return value.trim() || null
  if (value && typeof value === 'object') {
    try {
      const json = JSON.stringify(value)
      return json.trim() || null
    } catch {
      return null
    }
  }
  return null
}

const hashSchema = (value: string) => {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash.toString(16)
}

export const SeoSchema = ({ schema }: SeoSchemaProps) => {
  const raw = getSchemaValue(schema)
  if (!raw) return null

  return (
    <Script
      id={`schema-${hashSchema(raw)}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: raw }}
    />
  )
}
