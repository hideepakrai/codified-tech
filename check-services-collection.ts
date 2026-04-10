
import { getPayload } from 'payload'
import config from './src/payload.config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
const envPath = path.resolve(__dirname, '.env')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

const checkServices = async () => {
  try {
    const payload = await getPayload({ config })
    console.log('--- Checking Services Collection ---')

    const { docs: services } = await payload.find({
      collection: 'services',
      limit: 100
    })

    console.log(`Found ${services.length} services.`)
    services.forEach((s: any) => {
      console.log(`- Slug: ${s.slug} | Title: ${s.title}`)
    })

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

checkServices()
