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

const seedFintech = async () => {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    console.log('Payload initialized.')

    console.log('Checking if Fintech exists...')
    const { docs } = await payload.find({
      collection: 'industries',
      where: {
        slug: {
          equals: 'fintech',
        },
      },
    })

    if (docs.length > 0) {
      console.log('Fintech industry already exists.')
      process.exit(0)
    }

    console.log('Seeding Fintech industry...')
    await payload.create({
      collection: 'industries',
      data: {
        title: 'Fintech',
        slug: 'fintech',
        shortDescription: 'Innovative financial technology solutions transforming the banking and finance sector.',
        showInMenu: true,
        order: 1,
        strategySection: {
          heading: 'Our Fintech Strategy',
          description: 'We leverage cutting-edge technology to build secure, scalable, and user-friendly financial applications.'
        },
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
                    text: 'This is the Fintech industry page content. Verification successful1.',
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

    console.log('SUCCESS: Fintech industry created.')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding data:', err)
    process.exit(1)
  }
}

seedFintech()
