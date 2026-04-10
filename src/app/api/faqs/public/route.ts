import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type FaqItem = {
  question?: string | null
  answer?: unknown
  tags?: unknown[] | null
  isActive?: boolean | null
  order?: number | null
  id?: unknown
}

type FaqDoc = {
  id: string
  faqs?: FaqItem[] | null
  isActive?: boolean | null
  order?: number | null
  createdAt?: string
  updatedAt?: string
}

const stripItemId = (item: FaqItem) => {
  const { id: _id, ...rest } = item
  return rest
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const limit = Number(url.searchParams.get('limit') || 50)
  const page = Number(url.searchParams.get('page') || 1)

  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'faqs',
    limit: Number.isFinite(limit) ? limit : 50,
    page: Number.isFinite(page) ? page : 1,
    sort: 'order',
  })

  const docs = Array.isArray(result.docs) ? (result.docs as FaqDoc[]) : []

  const cleaned = docs.map((doc) => ({
    ...doc,
    faqs: Array.isArray(doc.faqs) ? doc.faqs.map(stripItemId) : [],
  }))

  return NextResponse.json({
    ...result,
    docs: cleaned,
  })
}
