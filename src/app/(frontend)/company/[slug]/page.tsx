// src/app/(frontend)/company/[slug]/page.tsx

import { notFound } from "next/navigation";

type RouteParams = { slug: string };
type PageProps = { params: Promise<RouteParams> };

async function getCompanyBySlug(slug: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_WEB_URI ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const url = `${baseUrl}/api/company?where[slug][equals]=${encodeURIComponent(
    slug
  )}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const data = await res.json();
  return data?.docs?.[0] ?? null;
}

export default async function CompanySlugPage({ params }: PageProps) {
  const { slug } = await params; // ✅ Next 15: params is Promise
  const page = await getCompanyBySlug(slug);

  if (!page) notFound();

  return (
    <section className="px-6 py-16 md:px-20">
      <h1 className="mb-6 text-4xl font-bold">{page.title}</h1>

      {page.description && (
        <p className="mb-8 max-w-3xl text-gray-600">{page.description}</p>
      )}

      {page.content && (
        <div className="prose max-w-4xl">
          {typeof page.content === "string"
            ? page.content
            : JSON.stringify(page.content)}
        </div>
      )}

    </section>
  );
}
