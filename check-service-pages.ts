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

const checkServicePages = async () => {
  try {
    const payload = await getPayload({ config })
    console.log('--- Checking Service Pages ---')

    // List all pages to see what we have
    const { docs: pages } = await payload.find({
      collection: 'pages',
      limit: 100
    })

    console.log(`Found ${pages.length} pages.`)
    pages.forEach((p: any) => {
      console.log(`- Slug: ${p.slug} | Title: ${p.title} | Blocks: ${p.blocks?.length || 0}`)
      if (p.blocks) {
        const hero = p.blocks.find((b: any) => b.blockName === 'Hero')
        if (hero) {
          console.log(`   > Has Hero Block: ${hero.heading || 'No Heading'}`)
        } else {
          console.log(`   > ❌ NO HERO BLOCK`)
        }
      }
    })

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

checkServicePages()
