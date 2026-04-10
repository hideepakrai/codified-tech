  
import config from './src/payload.config'
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
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
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

const debugHomeLinks = async () => {
  try {
    const payload = await getPayload({ config })

    // 1. Fetch Home Page Data
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (!pages.length) {
      console.error('❌ Home page not found!')
      return
    }

const homePage: any = pages[0];

const hero3Block: any = homePage.blocks?.find(
  (b: any) =>
    b?.blockType === "Single-Column-Section" &&
    (b?.blockName === "Industry" || b?.blockName === "Industries")
);

if (!hero3Block) {
  console.error("❌ Industry block (Hero3) not found in Home page!");
  return;
}

console.log("✅ Found Industry Block in Home Page");

// ✅ DEBUG: show what fields exist on this block
console.log("Hero3 keys:", Object.keys(hero3Block));

// ✅ MOST IMPORTANT: cards can be `cards` not `Cards` (case-sensitive)
const cards: any[] =
  hero3Block.cards ??
  hero3Block.Cards ??
  hero3Block.items ??
  hero3Block.Items ??
  [];

console.log(`Found ${cards.length} cards.`);

    // 2. Fetch All Industries
    const { docs: industries } = await payload.find({
      collection: 'industries',
      limit: 100,
    })
    const industrySlugs = industries.map((ind: any) => ind.slug)
    console.log(`✅ Found ${industries.length} industries in DB:`, industrySlugs)

    // 3. Compare
    console.log('\n--- Link Verification ---')
    let mismatchCount = 0

    cards.forEach((card: any) => {
      const heading = card.heading
      const generatedSlug = slugify(heading)
      const exists = industrySlugs.includes(generatedSlug)

      const status = exists ? '✅ OK' : '❌ MISSING (404)'
      if (!exists) mismatchCount++

      console.log(`Card: "${heading}" -> Slug: "${generatedSlug}" -> ${status}`)

      if (!exists) {
        // Suggest closest match?
        const match = industrySlugs.find(s => s.includes(generatedSlug) || generatedSlug.includes(s))
        if (match) {
          console.log(`   Detailed suggestion: Could reference "${match}"?`)
        }
      }
    })

    if (mismatchCount > 0) {
      console.log(`\n⚠️ Found ${mismatchCount} broken links!`)
    } else {
      console.log('\n✅ All links are valid!')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error debugging links:', error)
    process.exit(1)
  }
}

debugHomeLinks()
