'use client'

// import { getPayload } from 'payload'
// import config from '@/payload.config'

import { CareerHero } from '@/components/career/careerhero'
import { Position } from '@/components/career/position'

// export async function generateMetadata() {
//   const payloadInstance = await getPayload({ config })
//   const data = await payloadInstance.find({
//     collection: 'pages',
//     where: { slug: { equals: 'services' } },
//   })

//   const servicepage = data.docs[0]
//   return {
//     title: servicepage?.meta?.title,
//     description: servicepage?.meta?.description,
//   }
// }

const AboutUsPage = () => {
  // const payloadInstance = await getPayload({ config })
  // const pagedata = await payloadInstance.find({
  //   collection: 'pages',
  //   where: { slug: { equals: 'services' } },
  // })

  return (
    <section className="relative box-border text-white ">
      <CareerHero />
      <Position />
    </section>
  )
}

export default AboutUsPage

// py-24 px-6 md:px-16
