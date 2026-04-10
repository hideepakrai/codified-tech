// src/app/(frontend)/company/page.tsx

import Link from 'next/link'

async function getCompanyPages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/company`,
    { cache: 'no-store' }
  )

  if (!res.ok) throw new Error('Failed to fetch company pages')

  const data = await res.json()
  return data.docs
}

export default async function CompanyPage() {
  const companyPages = await getCompanyPages()

  return (
    <section className="px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-8">Company</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {companyPages.map((item: any) => (
          <Link
            key={item.id}
            href={`/company/${item.slug}`}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.title}
            </h2>

            {item.description && (
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            )}
          </Link>
        ))}
      </div>

    </section>
  )
}
