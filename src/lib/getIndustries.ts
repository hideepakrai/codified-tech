import { getPayload } from 'payload'
import config from '@payload-config'

export const getIndustries = async () => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'industries',
    sort: 'order',
  })

  return data.docs
}
