type Faq = {
  id: string
  question: string
  answer: unknown
}

const getPlainTextFromLexical = (value: unknown) => {
  if (!value) return ''
  if (typeof value === 'string') return value

  const texts: string[] = []
  const walk = (node: any) => {
    if (!node) return
    if (typeof node.text === 'string') texts.push(node.text)
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }

  walk((value as any)?.root)

  return texts.join(' ').replace(/\s+/g, ' ').trim()
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="bg-[#F7F8FD] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#6D5BFF] via-[#8A5BFF] to-[#C15BFF] text-transparent bg-clip-text">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group border border-[#2A2F44]/30 rounded-2xl px-6 py-4 bg-white shadow-[0_10px_24px_rgba(30,41,59,0.06)]"
            >
              <summary className="flex items-center justify-between font-semibold text-[#0B1220] text-base md:text-lg cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <svg
                  className="h-5 w-5 text-[#3B82F6] transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 8L10 13L15 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-[#5B6477] leading-relaxed">
                {getPlainTextFromLexical(faq.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
