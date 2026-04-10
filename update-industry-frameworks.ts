
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

const updateFrameworks = async () => {
  try {
    const payload = await getPayload({ config })

    console.log('Fetching Industries...')
    const { docs: industries } = await payload.find({
      collection: 'industries',
      limit: 100
    })

    for (const ind of industries) {
      console.log(`Updating ${ind.title}...`)

      // Define a generic framework section based on the industry
      const framework = {
        eyebrow: 'SMART FRAMEWORK',
        heading: `${ind.title} Solutions Framework`,
        description: `Our comprehensive framework for ${ind.title} ensures scalable, secure, and efficient operations.`,
        features: [
          {
            icon: 'robot',
            title: 'Automated Workflows',
            description: 'Streamlining processes to reduce manual effort and errors.'
          },
          {
            icon: 'shield',
            title: 'Security & Compliance',
            description: 'Ensuring data protection and regulatory adherence.'
          },
          {
            icon: 'sync',
            title: 'Real-time Integration',
            description: 'Seamless connectivity across all your systems and data points.'
          }
        ]
      }

      await payload.update({
        collection: 'industries',
        id: ind.id,
        data: {
          frameworkSection: framework as any
        }
      })
      console.log(`✅ Updated ${ind.title}`)
    }

    console.log('All industries updated with frameworkSection.')
    process.exit(0)

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

updateFrameworks()
