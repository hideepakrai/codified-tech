import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type PageParams = {
  slug?: string[] | string
}

type PageProps = {
  params: Promise<PageParams>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug = [] } = await params
  const slugArray = Array.isArray(slug) ? slug : [slug].filter(Boolean)
  const fullSlug = slugArray.join('/')

  const payload = await getPayload({ config })

  const pageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: fullSlug,
      },
    },
    limit: 1,
  })

  if (!pageData.docs.length) return notFound()

  const page = pageData.docs[0]

  return (
    <main className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      {/* Render content here */}
    </main>
  )
}
