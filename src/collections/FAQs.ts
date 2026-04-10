// import { CollectionConfig } from 'payload'

// const hiddenAdmin = { hidden: true }

// const getTagId = (value: unknown): string | null => {
//   if (!value) return null
//   if (typeof value === 'string' || typeof value === 'number') {
//     return String(value)
//   }
//   if (typeof value === 'object') {
//     const maybeValue = (value as { value?: unknown; id?: unknown }).value
//     const maybeId = (value as { value?: unknown; id?: unknown }).id
//     if (typeof maybeValue === 'string' || typeof maybeValue === 'number') {
//       return String(maybeValue)
//     }
//     if (typeof maybeId === 'string' || typeof maybeId === 'number') {
//       return String(maybeId)
//     }
//   }
//   return null
// }

// const getTagLabel = (value: unknown): string | null => {
//   if (!value || typeof value !== 'object') return null
//   const raw = value as {
//     slug?: unknown
//     title?: unknown
//     label?: unknown
//   }

//   if (typeof raw.slug === 'string' && raw.slug.trim()) return raw.slug.trim()
//   if (typeof raw.title === 'string' && raw.title.trim()) return raw.title.trim()
//   if (typeof raw.label === 'string' && raw.label.trim()) return raw.label.trim()

//   return null
// }

// export const Faqs: CollectionConfig = {
//   slug: 'faqs',
//   access: {
//     read: () => true,
//     create: ({ req }) => Boolean(req.user),
//     update: ({ req }) => Boolean(req.user),
//     delete: ({ req }) => Boolean(req.user),
//   },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (!data) return data

//         if (Array.isArray(data.faqs)) {
//           data.faqs = data.faqs.map((faq: any) => {
//             const { id, _id, tags, ...rest } = faq || {}
//             return {
//               ...rest,
//               tags: Array.isArray(tags) ? tags : [],
//             }
//           })
//         }

//         if (typeof data.title === 'string') {
//           data.title = data.title.trim()
//         }

//         if (!data.title) {
//           const firstQuestion = Array.isArray(data.faqs)
//             ? data.faqs.find(
//                 (faq: any) =>
//                   typeof faq?.question === 'string' && faq.question.trim(),
//               )
//             : null
//           if (firstQuestion?.question) {
//             data.title = String(firstQuestion.question).trim()
//           }
//         }

//         return data
//       },
//     ],
//     afterRead: [
//       async ({ doc, req }) => {
//         if (!doc) return doc

//         const faqs = Array.isArray(doc.faqs) ? doc.faqs : []
//         if (faqs.length === 0) return doc

//         const labelsByIndex: string[][] = faqs.map(() => [])
//         const idsByIndex: string[][] = faqs.map(() => [])
//         const ids = new Set<string>()

//         faqs.forEach((item: any, index: number) => {
//           const tags = Array.isArray(item?.tags) ? item.tags : []
//           tags.forEach((tag: unknown) => {
//             const label = getTagLabel(tag)
//             if (label) {
//               labelsByIndex[index].push(label)
//               return
//             }

//             const id = getTagId(tag)
//             if (id) {
//               idsByIndex[index].push(id)
//               ids.add(id)
//             }
//           })
//         })

//         const idList = Array.from(ids)
//         const idToLabel: Record<string, string> = {}

//         if (idList.length > 0 && req?.payload) {
//           const result = await req.payload.find({
//             collection: 'tags',
//             where: {
//               id: {
//                 in: idList,
//               },
//             },
//             limit: idList.length,
//           })

//           const docs = Array.isArray(result?.docs) ? result.docs : []
//           docs.forEach((tag: any) => {
//             if (!tag?.id) return
//             const label =
//               (typeof tag.slug === 'string' && tag.slug.trim()) ||
//               (typeof tag.title === 'string' && tag.title.trim()) ||
//               String(tag.id)
//             idToLabel[String(tag.id)] = label
//           })
//         }

//         const normalizedFaqs = faqs.map((item: any, index: number) => {
//           const labels = [...labelsByIndex[index]]
//           idsByIndex[index].forEach((id) => {
//             labels.push(idToLabel[id] || id)
//           })
//           return {
//             ...item,
//             tags: labels,
//           }
//         })

//         return {
//           ...doc,
//           faqs: normalizedFaqs,
//         }
//       },
//     ],
//   },

//   admin: {
//     useAsTitle: 'title',
//     defaultColumns: [
//       'title',
//       'answerPreview',
//       'tagsPreview',
//       'itemIsActive',
//     ],
//   },

//   fields: [
//     {
//       name: 'title',
//       label: 'Question',
//       type: 'text',
//       admin: {
//         readOnly: true,
//       },
//     },
//     {
//       name: 'questionPreview',
//       label: 'Question',
//       type: 'ui',
//       admin: {
//         disableListColumn: false,
//         components: {
//           Cell: '@/components/admin/FaqListCells#FaqQuestionCell',
//           Field: '@/components/admin/FaqListCells#EmptyField',
//         },
//       },
//     },
//     {
//       name: 'answerPreview',
//       label: 'Answer',
//       type: 'ui',
//       admin: {
//         disableListColumn: false,
//         components: {
//           Cell: '@/components/admin/FaqListCells#FaqAnswerCell',
//           Field: '@/components/admin/FaqListCells#EmptyField',
//         },
//       },
//     },
//     {
//       name: 'tagsPreview',
//       label: 'Tags',
//       type: 'ui',
//       admin: {
//         disableListColumn: false,
//         components: {
//           Cell: '@/components/admin/FaqListCells#FaqTagsCell',
//           Field: '@/components/admin/FaqListCells#EmptyField',
//         },
//       },
//     },
//     {
//       name: 'itemIsActive',
//       label: 'Is Active',
//       type: 'ui',
//       admin: {
//         disableListColumn: false,
//         components: {
//           Cell: '@/components/admin/FaqListCells#FaqIsActiveCell',
//           Field: '@/components/admin/FaqListCells#EmptyField',
//         },
//       },
//     },
//     {
//       name: 'faqs',
//       label: 'FAQs',
//       type: 'array',
//       fields: [
//         {
//           name: 'question',
//           type: 'text',
//           required: true,
//         },
//         {
//           name: 'answer',
//           type: 'textarea',
//           required: true,
//         },
//         {
//           name: 'tags',
//           type: 'relationship',
//           relationTo: 'tags',
//           hasMany: true,
//           admin: {
//             allowCreate: true,
//             allowEdit: true,
//             appearance: 'select',
//             components: {
//               afterInput: ['@/components/admin/ViewTagsLink#default'],
//             },
//           },
//         },
//         {
//           name: 'isActive',
//           type: 'checkbox',
//           defaultValue: true,
//         },
//         {
//           name: 'order',
//           type: 'number',
//           defaultValue: 0,
//         },
//       ],
//     },
//     {
//       name: 'isActive',
//       type: 'checkbox',
//       defaultValue: true,
//       admin: {
//         ...hiddenAdmin,
//         disableListColumn: true,
//       },
//     },
//     {
//       name: 'order',
//       type: 'number',
//       defaultValue: 0,
//       admin: hiddenAdmin,
//     },
//   ],
// }


import { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'answer', 'tags', 'isActive', 'order'],
  },

  fields: [
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'textarea',
      required: true,
    },
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
        components: {
          afterInput: ['@/components/admin/ViewTagsLink#default'],
        },
      },

    },
    {
      name: 'isActive',
      label: 'Is Active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
