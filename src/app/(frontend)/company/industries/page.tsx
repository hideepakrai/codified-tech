// src/app/(frontend)/industries/page.tsx

import Link from 'next/link'

async function getIndustries() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/industries`,
    { cache: 'no-store' }
  )

  if (!res.ok) throw new Error('Failed to fetch industries')

  const data = await res.json()
  return data.docs
}

export default async function IndustriesPage() {
  const industries = await getIndustries()

  return (
    <section className="px-6 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-8">Industries</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {industries.map((item: any) => (
          <Link
            key={item.id}
            href={`/industries/${item.slug}`}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.title}
            </h2>

            {(item.shortDescription || item.description) && (
              <p className="text-gray-600 text-sm">
                {item.shortDescription || item.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
