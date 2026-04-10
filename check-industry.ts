import { getPayload } from 'payload'
import config from './src/payload.config'
import fs from 'fs'
import path from 'path'

// Manually load .env file
const loadEnv = () => {
  try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const envConfig = fs.readFileSync(envPath, 'utf-8')
      envConfig.split('\n').forEach((line) => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value
          }
        }
      })
      console.log('.env loaded manually')
    } else {
      console.log('.env file not found')
    }
  } catch (e) {
    console.error('Error loading .env', e)
  }
}

loadEnv()

const slugsToCheck = [
  'fintech',
  'healthcare-healthtech',
  'e-commerce-retail',
  'education-edtech',
  'real-estate-proptech'
]

const checkIndustries = async () => {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('Payload initialized. Querying industries...')

    const { docs } = await payload.find({
      collection: 'industries',
      limit: 100,
    })

    console.log('Industries found:', docs.length)
    const foundSlugs = docs.map((d) => d.slug)
    console.log('Slugs:', foundSlugs)

    let allFound = true
    slugsToCheck.forEach((slug) => {
      if (foundSlugs.includes(slug)) {
        console.log(`[OK] ${slug} exists.`)
      } else {
        console.log(`[MISSING] ${slug} does NOT exist.`)
        allFound = false
      }
    })

    if (allFound) {
      console.log('SUCCESS: All required industries exist.')
      process.exit(0)
    } else {
      console.log('FAILURE: Some industries are missing.')
      process.exit(1)
    }
  } catch (err) {
    console.error('Error executing script:', err)
    process.exit(1)
  }
}

checkIndustries()
