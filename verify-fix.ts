
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

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}


const verifyFix = async () => {
  try {
    const payload = await getPayload({ config })
    console.log('--- Verifying Industries ---')

    const { docs: industries } = await payload.find({
      collection: 'industries',
      limit: 100,
    })

    const requiredSlugs = [
      'fintech',
      'healthcare-healthtech',
      'e-commerce-retail',
      'education-edtech',
      'real-estate-proptech'
    ]


    const existingSlugs = industries.map((ind: any) => ind.slug)
    const missing = requiredSlugs.filter(s => !existingSlugs.includes(s))

    if (missing.length > 0) {
      console.error('❌ MISSING INDUSTRIES:', missing)
    } else {
      console.log('✅ All 5 required industries exist in DB.')
    }

    console.log('\n--- Verifying Home Page Links ---')
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (pages.length > 0) {
      const home = pages[0]
      const industryBlock = home.blocks?.find((b: any) => b.blockType === 'Single-Column-Section' && b.blockName === 'Industry') as any

      const cards = Array.isArray(industryBlock?.Cards) ? industryBlock.Cards : []

      if (cards.length) {
        cards.forEach((card: any) => {
          const generatedLink = slugify(card.heading)
          const isValid = existingSlugs.includes(generatedLink)
          console.log(`Homepage Card: "${card.heading}" -> Link: /industries/${generatedLink} -> ${isValid ? '✅ VALID' : '❌ BROKEN (Target not in DB)'}`)
        })
      } else {
        console.error('❌ Industry block not found on Home page!')
      }
    } else {
      console.error('❌ Home page not found!')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error verifying:', error)
    process.exit(1)
  }
}

verifyFix()
