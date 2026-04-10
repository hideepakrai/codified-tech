import { Block } from 'payload'

export const FaqsBlock: Block = {
  slug: 'faqs',
  fields: [
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        allowCreate: true,
        allowEdit: true,
        appearance: 'select',
      },
    },
    {
      name: 'faqs',
      label: 'FAQs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      filterOptions: ({ siblingData }) => {
        const tagsValue = (siblingData as { tags?: unknown } | undefined)?.tags
        const tags = Array.isArray(tagsValue)
          ? tagsValue
          : tagsValue != null
            ? [tagsValue]
            : []

        if (tags.length === 0) {
          return true
        }

        return {
          tags: {
            in: tags,
          },
        }
        // const payload = req.payload
        // const faqs = await payload.find({
        //   collection: 'faqs',
        //   pagination: false,
        //   where: {
        //     tags: {
        //       in: siblingData.tags,
        //     },
        //   },
        // })

        // return faqs?.docs.length > 0 ? faqs.docs.map((faq) => faq.id) : []
      },
    },
  ],
}
