// export async function generateMetadata() {
//   const payloadInstance = await getPayload({ config })
//   const data = await payloadInstance.find({
//     collection: 'pages',
//     where: { slug: { equals: 'services' } },
//   })

import { IndustriesLanding } from '@/components/industries/IndustriesLanding'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '@/payload-types'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'

export async function generateMetadata() {
  const payloadInstance = await getPayload({ config })
  const pagedata = await payloadInstance.find({
    collection: 'pages',
    where: { slug: { equals: 'industries' } },
    limit: 1,
  })

  const page = pagedata.docs?.[0] as Page | undefined

  return {
    title:
      page?.meta?.title ??
      page?.metaTitle ??
      page?.title ??
      'Codified Solutions',
    description:
      page?.meta?.description ??
      page?.metaDescription ??
      DEFAULT_META_DESCRIPTION,
  }
}

//   const servicepage = data.docs[0]
//   return {
//     title: servicepage?.metaTitle || 'Codified Solutions',
//     description:
//       servicepage?.metaDescription ||
//       'Codified Solutions is a global software development company.',
//   }
// }

export const revalidate = 0
const IndustryPage = async () => {
  const payload = await getPayload({ config })

  // ðŸ”¹ Fetch industries from CMS
  const { docs: industries } = await payload.find({
    collection: 'industries',
    where: {
      showInMenu: { equals: true },
    },
    sort: 'order',
  })

  // ðŸ”¹ Fetch industries page hierarchy (parent + children)
  const parentResult = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'industries' },
    },
    limit: 1,
    overrideAccess: true,
  })
  const parentPage = parentResult.docs?.[0] as
    | { id?: string | number; title?: string | null; slug?: string | null }
    | undefined
  const parentId = parentPage?.id

  const childResult = parentId
    ? await payload.find({
        collection: 'pages',
        where: {
          parent: { equals: parentId },
        },
        sort: 'order',
        limit: 5,
        overrideAccess: true,
      })
    : { docs: [] as Array<{ id?: string | number; title?: string | null; slug?: string | null }> }

  const hierarchy =
    parentPage && childResult.docs.length > 0
      ? {
          parent: parentPage,
          children: childResult.docs,
        }
      : null

  return (
    <section className="overflow-hidden">
      <IndustriesLanding industries={industries} hierarchy={hierarchy} />
    </section>
  )
}

export default IndustryPage
