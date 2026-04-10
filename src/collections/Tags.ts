import { CollectionConfig, type Where } from 'payload'
import slugify from 'slugify'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'slug',
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, originalDoc, req }) => {
        if (!data) return data

        const title =
          typeof data.title === 'string' ? data.title.trim() : ''
        const incomingSlug =
          typeof data.slug === 'string' ? data.slug.trim() : ''

        let baseSlug = incomingSlug
        if (!baseSlug && title) {
          baseSlug = slugify(title, { lower: true, strict: true, trim: true })
        }

        if (!baseSlug) return data

        const normalizedBase = slugify(baseSlug, {
          lower: true,
          strict: true,
          trim: true,
        })

        if (
          operation === 'update' &&
          originalDoc &&
          typeof originalDoc.slug === 'string' &&
          originalDoc.slug === normalizedBase
        ) {
          data.slug = originalDoc.slug
          return data
        }

        const payload = req?.payload
        if (!payload) {
          data.slug = normalizedBase
          return data
        }

        const isUnique = async (slug: string) => {
          const where: Where = {
            slug: { equals: slug },
            ...(originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
          }

          const result = await payload.find({
            collection: 'tags',
            where,
            limit: 1,
          })

          return result.totalDocs === 0
        }

        let uniqueSlug = normalizedBase
        let suffix = 1
        while (!(await isUnique(uniqueSlug))) {
          suffix += 1
          uniqueSlug = `${normalizedBase}-${suffix}`
        }

        data.slug = uniqueSlug
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
