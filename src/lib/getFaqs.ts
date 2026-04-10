// src/lib/getFaqs.ts
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { normalizeFaqs } from "@/lib/normalizeFaqs"
import type { Faq } from "@/payload-types"
import type { FaqDoc } from "@/lib/normalizeFaqs"

type RawFaqItem = {
  question?: unknown
  answer?: unknown
  tags?: unknown[] | null
  isActive?: boolean | null
  order?: number | null
}

type RawFaqDoc = Faq & {
  faqs?: RawFaqItem[] | null
  items?: RawFaqItem[] | null
}

const toFaqDoc = (doc: Faq): FaqDoc => {
  const raw = doc as RawFaqDoc
  return {
    id: doc?.id != null ? String(doc.id) : undefined,

    faqs: Array.isArray(raw.faqs)
      ? raw.faqs
        .filter(Boolean)
        .map((f) => ({
          question: typeof f?.question === "string" ? f.question : undefined,
          answer: f?.answer,
          tags: Array.isArray(f?.tags) ? f.tags : undefined,
          isActive: typeof f?.isActive === "boolean" ? f.isActive : undefined,
          order: typeof f?.order === "number" ? f.order : undefined,
        }))
      : undefined,

    items: Array.isArray(raw.items)
      ? raw.items
        .filter(Boolean)
        .map((it) => ({
          question: typeof it?.question === "string" ? it.question : undefined,
          answer: it?.answer,
          tags: Array.isArray(it?.tags) ? it.tags : undefined,
          isActive: typeof it?.isActive === "boolean" ? it.isActive : undefined,
          order: typeof it?.order === "number" ? it.order : undefined,
        }))
      : undefined,

    question:
      typeof raw?.question === "string" ? raw.question : undefined,
    answer: raw?.answer,
    tags: Array.isArray(raw?.tags) ? raw.tags : undefined,
    isActive:
      typeof raw?.isActive === "boolean" ? raw.isActive : undefined,
    order: typeof raw?.order === "number" ? raw.order : undefined,
  }
}

type GetFaqsOptions = {
  tagIds?: string[]
  faqIds?: string[]
  strict?: boolean
}

export async function getFaqs(
  _pageType?: string,
  _pageSlug?: string,
  options: GetFaqsOptions = {}
) {
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: "faqs",
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: "order",
    depth: 1,
    limit: 200,
  })

  // Convert Payload docs (Faq[]) -> your normalizeFaqs input (FaqDoc[])
  const mappedDocs: FaqDoc[] = (result.docs as Faq[]).map(toFaqDoc)

  const explicitTags =
    Array.isArray(options.tagIds) && options.tagIds.length > 0
      ? options.tagIds.map(String)
      : []

  const derivedTags =
    _pageSlug
        ? [String(_pageSlug)]
        : _pageType
          ? [String(_pageType)]
          : []

  const explicitFaqIds =
    Array.isArray(options.faqIds) && options.faqIds.length > 0
      ? options.faqIds.map(String)
      : []

  const filteredDocs: FaqDoc[] =
    explicitFaqIds.length > 0
      ? explicitFaqIds
        .map((id) =>
          mappedDocs.find((doc) => String(doc.id ?? "") === id)
        )
        .filter((doc): doc is FaqDoc => Boolean(doc))
      : mappedDocs

  const tagFilter =
    explicitFaqIds.length > 0
      ? []
      : explicitTags.length > 0
        ? explicitTags
        : derivedTags.length > 0
          ? derivedTags
          : []

  if (
    options.strict &&
    explicitFaqIds.length === 0 &&
    tagFilter.length === 0
  ) {
    return []
  }

  return normalizeFaqs(filteredDocs, {
    tagIds: tagFilter.length > 0 ? tagFilter : undefined,
  })
}
