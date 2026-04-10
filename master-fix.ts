
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

const industries = [
  {
    title: 'Fintech',
    slug: 'fintech',
    shortDescription: 'Innovative financial technology solutions transforming the banking and finance sector.'
  },
  {
    title: 'Healthcare & HealthTech',
    slug: 'healthcare-healthtech',
    shortDescription: 'EMR systems, telemedicine, diagnostics, health monitoring'
  },
  {
    title: 'E-Commerce & Retail',
    slug: 'e-commerce-retail',
    shortDescription: 'Online stores, POS, Inventory, personalized shopping'
  },
  {
    title: 'Education & EdTech',
    slug: 'education-edtech',
    shortDescription: 'Learning platforms, virtual classrooms, exam portals'
  },
  {
    title: 'Real Estate & PropTech',
    slug: 'real-estate-proptech',
    shortDescription: 'Property listings, virtual tours, CRM for agents'
  }
]

const masterFix = async () => {
  try {
    console.log('🚀 Starting Data Fix...')
    const payload = await getPayload({ config })

    // 1. Seed Industries
    console.log('\n--- Seeding Industries ---')
    for (const ind of industries) {
      const { docs } = await payload.find({
        collection: 'industries',
        where: { slug: { equals: ind.slug } },
      })

      let id = null;

      if (docs.length === 0) {
        console.log(`Creating ${ind.title}...`)
        const newDoc = await payload.create({
          collection: 'industries',
          data: {
            title: ind.title,
            slug: ind.slug,
            shortDescription: ind.shortDescription,
            showInMenu: true,
            order: 1,
            strategySection: {
              heading: `Our ${ind.title} Strategy`,
              description: `Strategic solutions for ${ind.title}.`
            },
            frameworkSection: {
              eyebrow: 'FRAMEWORK',
              heading: `${ind.title} Framework`,
              description: 'Robust and scalable.'
            }
          }
        })
        id = newDoc.id;
      } else {
        console.log(`${ind.title} exists. Updating framework...`)
        id = docs[0].id;
        await payload.update({
          collection: 'industries',
          id: id,
          data: {
            frameworkSection: { // Ensure framework exists
              eyebrow: 'FRAMEWORK',
              heading: `${ind.title} Framework`,
              description: `Robust and scalable framework for ${ind.title}.`,
              features: [
                { icon: 'robot', title: 'Automation', description: 'Automated processes.' },
                { icon: 'shield', title: 'Security', description: 'Secure systems.' },
                { icon: 'sync', title: 'Integration', description: 'Seamless sync.' }
              ]
            }
          }
        })
      }
    }

   // 2. Update Home Page
console.log('\n--- Updating Home Page ---')
const { docs: pages } = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  limit: 1,
})

if (pages.length > 0) {
  const home: any = pages[0]
  const blocks: any[] = home.blocks || []

  const indBlockIndex = blocks.findIndex(
    (b: any) => b?.blockType === 'Single-Column-Section' && b?.blockName === 'Industry'
  )

  if (indBlockIndex > -1) {
    const updatedCards = industries.map((ind) => ({
      heading: ind.title,
      description: ind.shortDescription,
      slug: ind.slug, // ✅ IMPORTANT: store slug directly (no slugify mismatch ever)
    }))

    // ✅ Make TS happy + keep schema compatible (prefer lowercase)
    blocks[indBlockIndex] = {
      ...blocks[indBlockIndex],
      cards: updatedCards,
      // Optional: if your existing content uses Cards, keep it too
      Cards: updatedCards,
    }

    await payload.update({
      collection: 'pages',
      id: home.id,
      data: { blocks },
    })

    console.log('✅ Home page updated with correct cards.')
  } else {
    console.log('❌ Industry block not found on Home page.')
  }
} else {
  console.log('❌ Home page not found.')
}




    console.log('\n🏁 FIX COMPLETE. Please restart the server.')
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

masterFix()
