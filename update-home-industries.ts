
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

const updateHome = async () => {
  try {
    const payload = await getPayload({ config })

    console.log('Fetching Home page...')
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (!docs.length) {
      console.error('Home page not found')
      return
    }

    const homePage = docs[0]
    const blocks = (homePage.blocks || []) as any[]

    // Find the Industry block
    const industryBlockIndex = blocks.findIndex(
      (b: any) => b.blockType === 'Single-Column-Section' && b.blockName === 'Industry'
    )

    if (industryBlockIndex === -1) {
      console.error('Industry block not found on Home page')
      return
    }

    console.log('Found Industry block. Updating cards...')

    // The 5 supported industries
    const newCards = [
      {
        heading: 'Fintech',
        description: 'Innovative financial technology solutions transforming the banking and finance sector.'
      },
      {
        heading: 'Healthcare & HealthTech',
        description: 'EMR systems, telemedicine, diagnostics, health monitoring.'
      },
      {
        heading: 'E-Commerce & Retail',
        description: 'Online stores, POS, Inventory, personalized shopping.'
      },
      {
        heading: 'Education & EdTech',
        description: 'Learning platforms, virtual classrooms, exam portals.'
      },
      {
        heading: 'Real Estate & PropTech',
        description: 'Property listings, virtual tours, CRM for agents.'
      }
    ]

    // Update the block
    blocks[industryBlockIndex] = {
      ...blocks[industryBlockIndex],
      Cards: newCards
    } as any

    // Save
    await payload.update({
      collection: 'pages',
      id: homePage.id,
      data: {
        blocks: blocks
      }
    })

    console.log('✅ Home page updated with correct Industry cards.')
    process.exit(0)

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

updateHome()
