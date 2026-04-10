import type { Media } from '@/payload-types'

type SeoImage = (string | null) | Media | { url?: string } | null

export type SeoMeta = {
  title?: string | null
  description?: string | null
  image?: SeoImage
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: SeoImage
}

type SeoSource = {
  meta?: (SeoMeta & { metaTitle?: string | null; metaDescription?: string | null }) | null
  metaTitle?: string | null
  metaDescription?: string | null
  openGraph?:
    | {
        ogTitle?: string | null
        ogDescription?: string | null
        ogImage?: SeoImage
      }
    | null
}

const getMediaUrl = (media?: SeoImage) => {
  if (!media) return null
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    const maybeUrl = (media as { url?: unknown })?.url
    return typeof maybeUrl === 'string' ? maybeUrl : null
  }
  return null
}

const hasValue = (value: unknown) =>
  typeof value === 'string' ? value.trim().length > 0 : Boolean(value)

const formatUrl = (value?: string | null) => {
  if (!value) return ''
  return value.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

export const normalizeSeoMeta = (input?: SeoSource | null): SeoMeta | null => {
  if (!input) return null

  const meta = input.meta ?? {}
  const og = input.openGraph ?? {}

  const title =
    meta.title ?? meta.metaTitle ?? input.metaTitle ?? null
  const description =
    meta.description ?? meta.metaDescription ?? input.metaDescription ?? null
  const image = meta.image ?? null

  const ogTitle = meta.ogTitle ?? og?.ogTitle ?? null
  const ogDescription = meta.ogDescription ?? og?.ogDescription ?? null
  const ogImage = meta.ogImage ?? og?.ogImage ?? image ?? null

  return {
    title,
    description,
    image,
    ogTitle,
    ogDescription,
    ogImage,
  }
}

export const SeoSection = ({ meta }: { meta?: SeoMeta | null }) => {
  if (!meta) return null

  const imageUrl = getMediaUrl(meta.image)
  const ogImageUrl = getMediaUrl(meta.ogImage)
  const showSearch = hasValue(meta.title) || hasValue(meta.description)
  const showSocial =
    hasValue(meta.ogTitle) || hasValue(meta.ogDescription) || hasValue(ogImageUrl)

  if (!showSearch && !showSocial) return null

  const siteUrl = formatUrl(process.env.NEXT_PUBLIC_WEB_URI)

  return (
    <section className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Visibility
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Search & Social Preview
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {showSearch && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Search Result
              </div>
              {siteUrl && (
                <div className="mt-2 text-xs text-slate-500">{siteUrl}</div>
              )}
              <div className="mt-3 text-lg font-semibold text-slate-900">
                {meta.title}
              </div>
              {meta.description && (
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {meta.description}
                </p>
              )}
            </div>
          )}

          {showSocial && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Social Share
              </div>
              {ogImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ogImageUrl}
                  alt="Social preview"
                  className="mt-3 w-full rounded-xl border border-slate-200 object-cover"
                  loading="lazy"
                />
              )}
              <div className="mt-4 text-base font-semibold text-slate-900">
                {meta.ogTitle || meta.title}
              </div>
              {(meta.ogDescription || meta.description) && (
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {meta.ogDescription || meta.description}
                </p>
              )}
              {siteUrl && (
                <div className="mt-3 text-xs text-slate-500">{siteUrl}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
