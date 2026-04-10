import React from 'react'
import './styles.css'

import { Footer } from '@/components/Homepage/Footer'
import { Headers } from '@/components/Homepage/Headers'

import { ConsultationModal } from '@/components/ConsultationModal'
import { ModalProvider } from '@/context/ModalContext'
import { DEFAULT_META_DESCRIPTION } from '@/lib/seoDefaults'
import { SeoSchema } from '@/components/SeoSchema'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_noStore } from 'next/cache'
import { headers } from 'next/headers'
import { resolveSchemaByPath } from '@/lib/getResolvedSchema'
import type { Media } from '@/payload-types'

export const metadata = {
  description: DEFAULT_META_DESCRIPTION,
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  unstable_noStore()
  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || '/'
  const payload = await getPayload({ config })
  const globalData = await payload.findGlobal({
    slug: 'global-schema',
    overrideAccess: true,
  })
  const globalSchema =
    typeof globalData?.schema === 'string' && globalData.schema.trim()
      ? globalData.schema.trim()
      : null
  const pageSchema = await resolveSchemaByPath(pathname)
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
    overrideAccess: true,
  })
  const faviconUrlText =
    (siteSettings as { faviconUrl?: string | null } | null)?.faviconUrl ?? null
  const favicon =
    (siteSettings as { favicon?: string | Media | null } | null)?.favicon ?? null
  const faviconFromUpload =
    typeof favicon === 'string'
      ? favicon
      : favicon && typeof favicon === 'object'
        ? favicon.url
        : null
  const faviconUrl = faviconUrlText?.trim() ? faviconUrlText.trim() : faviconFromUpload

  return (
    <html lang="en">
      <head>
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
        {globalSchema && <SeoSchema schema={globalSchema} />}
        {pageSchema && <SeoSchema schema={pageSchema} />}
      </head>
      <body>
        <ModalProvider>
          <Headers />
          <ConsultationModal />
          <main>{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  )
}
