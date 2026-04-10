import { notFound } from "next/navigation";
import { Strategy } from "@/components/industries/SingleIndustries/Strategy";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getIndustryBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URI || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/industries?where[slug][equals]=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.docs?.[0] ?? null;
}

export default async function IndustrySlugPage({ params }: PageProps) {
  const { slug } = await params; // ✅ Next 15: params is Promise
  const industry = await getIndustryBySlug(slug);

  if (!industry) notFound();

  return (
    <section className="px-6 py-16 md:px-20">
      <h1 className="mb-6 text-4xl font-bold">{industry.title}</h1>
      {industry.description && (
        <p className="mb-8 max-w-3xl text-gray-600">{industry.description}</p>
      )}

      {industry.content && (
        <div className="prose max-w-4xl">
          {typeof industry.content === "string"
            ? industry.content
            : JSON.stringify(industry.content)}
        </div>
      )}

      <div className="mt-16">
        <Strategy strategy={industry.strategySection} />
      </div>

    </section>
  );
}
