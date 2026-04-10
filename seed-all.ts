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

const industries = [
  {
    title: 'Fintech',
    slug: 'fintech',
    shortDescription: 'Innovative financial technology solutions transforming the banking and finance sector.',
    strategySection: {
      heading: 'Our Fintech Strategy',
      description: 'We leverage cutting-edge technology to build secure, scalable, and user-friendly financial applications.'
    }
  },
  {
    title: 'Healthcare & HealthTech',
    slug: 'healthcare-healthtech',
    shortDescription: 'EMR systems, telemedicine, diagnostics, health monitoring',
    strategySection: {
      heading: 'Our HealthTech Strategy',
      description: 'Building HIPAA-compliant, patient-centric digital health solutions used by hospitals and clinics worldwide.'
    }
  },
  {
    title: 'E-Commerce & Retail',
    slug: 'e-commerce-retail',
    shortDescription: 'Online stores, POS, Inventory, personalized shopping',
    strategySection: {
      heading: 'Our Retail Strategy',
      description: 'Creating seamless omnichannel shopping experiences with AI-driven recommendations and robust inventory management.'
    }
  },
  {
    title: 'Education & EdTech',
    slug: 'education-edtech',
    shortDescription: 'Learning platforms, virtual classrooms, exam portals',
    strategySection: {
      heading: 'Our EdTech Strategy',
      description: 'Empowering educators and learners with interactive, accessible, and data-driven educational platforms.'
    }
  },
  {
    title: 'Real Estate & PropTech',
    slug: 'real-estate-proptech',
    shortDescription: 'Property listings, virtual tours, CRM for agents',
    strategySection: {
      heading: 'Our PropTech Strategy',
      description: 'Revolutionizing real estate with virtual tours, smart property management, and streamlined transaction workflows.'
    }
  }
]

const seedAll = async () => {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('Payload initialized.')

    for (const ind of industries) {
      console.log(`Checking if ${ind.title} exists...`)
      const { docs } = await payload.find({
        collection: 'industries',
        where: {
          slug: {
            equals: ind.slug,
          },
        },
      })

      if (docs.length > 0) {
        console.log(`${ind.title} already exists. Skipping.`)
        continue
      }

      console.log(`Seeding ${ind.title}...`)
      await payload.create({
        collection: 'industries',
        data: {
          title: ind.title,
          slug: ind.slug,
          shortDescription: ind.shortDescription,
          showInMenu: true,
          order: 1,
          strategySection: ind.strategySection,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: `This is the ${ind.title} industry page content.`,
                      version: 1
                    }
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          }
        },
      })
      console.log(`SUCCESS: ${ind.title} created.`)
    }

    console.log('All industries processed.')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding data:', err)
    process.exit(1)
  }
}

seedAll()
