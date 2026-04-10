import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'industries',
      where: {
        slug: {
          equals: 'fintech',
        },
      },
    })

    if (docs.length > 0) {
      return NextResponse.json({ success: true, message: 'Fintech industry already exists.' })
    }

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
                    text: 'This is the Fintech industry page content. Verification successful.',
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

    return NextResponse.json({ success: true, message: 'Fintech industry created successfully.' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ success: false, error: 'Failed to seed data', details: String(error) }, { status: 500 })
  }
}
