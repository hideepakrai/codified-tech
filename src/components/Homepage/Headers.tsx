import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import { Header } from './Header'
import type { Media } from '@/payload-types'

type HeaderLogo = {
  url: string
  alt: string
  width: number
  height: number
}

const resolveLogo = (logo?: string | Media | null): HeaderLogo => {
  if (logo && typeof logo === 'object') {
    return {
      url: logo.url || '/Image/codified-white-logo.webp',
      alt: logo.alt || 'Codified Logo',
      width: logo.width || 180,
      height: logo.height || 72,
    }
  }

  return {
    url: '/Image/codified-white-logo.webp',
    alt: 'Codified Logo',
    width: 180,
    height: 72,
  }
}

export const Headers = async () => {
  const payloadInstance = await getPayload({ config })
  const siteSettings = await payloadInstance.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
  const headerLogo = resolveLogo(
    (siteSettings as { headerLogo?: string | Media | null } | null)?.headerLogo ??
      null,
  )
  const { docs } = await payloadInstance.find({
    collection: 'Menu',
    where: { title: { equals: 'Navigation' } },
  })

  const baseItems = docs[0]?.Items || []

  const servicesItems = baseItems.filter(
    (item: any) => item?.sourceCollection === 'services',
  )
  const industriesItems = baseItems.filter(
    (item: any) => item?.sourceCollection === 'industries',
  )
  const companyItems = baseItems.filter(
    (item: any) => item?.sourceCollection === 'company',
  )

  let servicesDropdownItems: any[] = []
  let industrySubServices: any[] = []
  let companySubServices: any[] = []

  if (servicesItems.length) {
    const { docs: services } = await payloadInstance.find({
      collection: 'services',
      where: {
        showInMenu: { equals: true },
      },
      sort: 'order',
      limit: 200,
    })

    const categoryConfig = [
      { value: 'ai', title: 'AI Services', slug: 'ai-services' },
      { value: 'web', title: 'Web Development', slug: 'web-development' },
      { value: 'cloud', title: 'Cloud & Hosting', slug: 'cloud-and-hosting' },
      { value: 'marketing', title: 'Digital Marketing', slug: 'digital-marketing' },
    ]

    servicesDropdownItems = categoryConfig
      .map((category) => {
        const categoryServices = services.filter(
          (service: any) => service?.category === category.value,
        )

        if (!categoryServices.length) return null

        const parentService = categoryServices.find(
          (service: any) => service?.slug === category.slug,
        )

        const subServices = categoryServices
          .filter((service: any) => service?.id !== parentService?.id)
          .map((service: any) => ({
            label: service?.title || 'Service',
            description: service?.shortDescription || '',
            link: service?.slug ? `/services/${service.slug}` : '#',
            slug: service?.slug,
          }))

        return {
          categoryTitle: category.title,
          slug: category.slug,
          description: parentService?.shortDescription || '',
          link: parentService?.slug ? `/services/${parentService.slug}` : undefined,
          subServices,
        }
      })
      .filter(Boolean)
  }

  if (industriesItems.length) {
    const { docs: industries } = await payloadInstance.find({
      collection: 'industries',
      where: {
        showInMenu: { equals: true },
      },
      sort: 'order',
      limit: 200,
    })

    industrySubServices = industries.map((industry: any) => ({
      label: industry?.title || 'Industry',
      description: industry?.shortDescription || '',
      link: industry?.slug ? `/industries/${industry.slug}` : '#',
      slug: industry?.slug,
    }))
  }

  if (companyItems.length) {
    const { docs: companyPages } = await payloadInstance.find({
      collection: 'company',
      where: {
        showInMenu: { equals: true },
      },
      sort: 'order',
      limit: 200,
    })

    companySubServices = companyPages.map((page: any) => ({
      label: page?.title || 'Company',
      description: page?.shortDescription || '',
      link: page?.slug ? `/company/${page.slug}` : '#',
      slug: page?.slug,
    }))
  }

  const data = baseItems.map((item: any) => {
    if (item?.sourceCollection === 'services') {
      return {
        ...item,
        dropdownItems: servicesDropdownItems,
      }
    }

    if (item?.sourceCollection === 'industries') {
      return {
        ...item,
        dropdownItems: [
          {
            categoryTitle: 'Industries',
            slug: 'industries',
            description: item?.description || '',
            link: '/industries',
            subServices: industrySubServices,
          },
        ],
      }
    }

    if (item?.sourceCollection === 'company') {
      return {
        ...item,
        dropdownItems: [
          {
            categoryTitle: item?.label || 'Company',
            slug: 'company',
            description: item?.description || '',
            link: '/company',
            subServices: companySubServices,
          },
        ],
      }
    }

    return item
  })

  return <Header data={data} logo={headerLogo} />
}
