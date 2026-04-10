
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

const checkHealthcare = async () => {
  try {
    const payload = await getPayload({ config })
    console.log('--- DEBUG: Healthcare & HealthTech ---')

    // 1. Check DB
    const { docs: industries } = await payload.find({
      collection: 'industries',
      where: { slug: { equals: 'healthcare-healthtech' } }
    })

    if (industries.length > 0) {
      console.log('✅ DB: Found "healthcare-healthtech"')
      console.log('   Title:', industries[0].title)
    } else {
      console.log('❌ DB: "healthcare-healthtech" NOT FOUND')
      // List all to see what's there
      const { docs: all } = await payload.find({ collection: 'industries' })
      console.log('   Available slugs:', all.map((d: any) => d.slug).join(', '))
    }

    // 2. Check Home Page
    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } }
    })

if (pages.length > 0) {
  const blocks = (pages[0] as any).blocks as any[] | undefined;

  const hero3 = blocks?.find(
    (b) =>
      b?.blockType === "Single-Column-Section" &&
      (b?.blockName === "Industry" || b?.blockName === "Industries")
  ) as any;

  if (!hero3) {
    console.log('❌ Home: Industry block not found.');
  } else {
    // ✅ handle both possible key names
    const cards = (hero3.cards ?? hero3.Cards ?? hero3.items ?? hero3.Items) as any[] | undefined;

    if (!Array.isArray(cards)) {
      console.log("❌ Home: Industry block found but cards array not found.");
      console.log("   Available keys:", Object.keys(hero3));
    } else {
      const card = cards.find((c: any) =>
        String(c?.heading || "").toLowerCase().includes("health")
      );

      if (!card) {
        console.log("❌ Home: No Healthcare card found.");
      } else {
        console.log(`✅ Home: Found card with heading "${card.heading}"`);
        const generated = slugify(String(card.heading || ""));
        console.log(`   Generated Slug: "${generated}"`);

        if (generated === "healthcare-healthtech") {
          console.log("✅ MATCH: Generated slug matches DB slug.");
        } else {
          console.log("❌ MISMATCH: Generated slug DOES NOT match DB slug.");
        }
      }
    }
  }
}


    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

checkHealthcare()
