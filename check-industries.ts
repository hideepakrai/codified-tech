
import { getPayload } from 'payload'
import config from '@payload-config'

const checkIndustries = async () => {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'industries',
    })
    
    console.log('Found industries:', docs.length)
    docs.forEach((doc) => {
      console.log(`- Title: ${doc.title}, Slug: ${doc.slug}`)
    })
  } catch (error) {
    console.error('Error finding industries:', error)
  }
}

checkIndustries()
