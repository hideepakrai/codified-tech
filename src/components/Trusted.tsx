'use client'

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef } from 'react'

const fallbackData = {
  heading: 'Trusted by Top Technologies',
  description: {
    root: {
      children: [
        {
          type: 'paragraph',
          children: [
            { text: 'We are trusted by leading technologies and enterprises across the globe.' },
          ],
        },
      ],
    },
  },
  blobcard: [
    { id: '1', label: '500+', value: 'Happy Clients' },
    { id: '2', label: '50+', value: 'Team Members' },
    { id: '3', label: '15+', value: 'Years Experience' },
    { id: '4', label: '1000+', value: 'Projects Completed' },
    { id: '5', label: '24/7', value: 'Support' },
  ],
}

type LexicalTextNode = { text?: string; format?: number }
type LexicalParagraphNode = { children?: LexicalTextNode[] }
type LexicalRoot = { root?: { children?: LexicalParagraphNode[] } }

type LogoMedia = { url?: string; alt?: string }
type TrustedLogo = { name?: string; logo?: LogoMedia; logoUrl?: string }
type BlobCard = { id?: string; label?: string; value?: string }
type TrustedBySection = {
  heading?: string | null
  description?: LexicalRoot | string | null
  logos?: TrustedLogo[] | null
  blobcard?: BlobCard[] | null
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const getLexicalParagraphs = (value: LexicalRoot | string | null | undefined) => {
  if (!value) return null
  if (typeof value === 'string') {
    return [
      {
        children: [{ text: value, format: 0 }],
      },
    ]
  }
  return value?.root?.children
}

export const Trustedby = ({
  TrustedBy,
  useFallback = true,
}: {
  TrustedBy?: unknown
  useFallback?: boolean
}) => {
  const source = isRecord(TrustedBy) ? (TrustedBy as TrustedBySection) : undefined
  const hasSource =
    Boolean(source?.heading) ||
    Boolean(source?.description) ||
    (Array.isArray(source?.blobcard) && source.blobcard.length > 0) ||
    (Array.isArray(source?.logos) && source.logos.length > 0)

  if (!useFallback && !hasSource) return null

  const heading = source?.heading || (useFallback ? fallbackData.heading : '')
  const description = source?.description || (useFallback ? fallbackData.description : null)
  const blobcard = source?.blobcard?.length
    ? source.blobcard
    : useFallback
      ? fallbackData.blobcard
      : []

  const parsedDescription = getLexicalParagraphs(description)?.map(
    (paragraph: LexicalParagraphNode, i: number) => (
      <p key={i} className="text-sm md:text-lg text-center md:w-3/4">
        {(paragraph.children || []).map((child: LexicalTextNode, j: number) => {
          const isBold = child.format === 1
          return (
            <span key={j} className={isBold ? 'font-semibold' : ''}>
              {child.text}
            </span>
          )
        })}
      </p>
    ),
  )

  return (
    <section className="mt-2 bg-gray-900 text-white font-sans px-4 py-20 md:px-16 lg:px-32">
      <div className="flex flex-col items-center gap-6">
        {heading && (
          <h2 className="text-2xl font-extrabold md:text-4xl text-center">{heading}</h2>
        )}
        {parsedDescription}

        {/* Replace with <InfiniteTechScroll /> if needed */}
        <InfiniteTechScroll logos={source?.logos} useFallback={useFallback} />

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 w-full max-w-6xl">
          {blobcard?.map((item: BlobCard, index: number) => (
            <li
              key={item.id || item.label || index}
              className="flex flex-col p-4 bg-gray-800 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <span className="text-3xl md:text-4xl font-bold border-l-2 border-teal-400 pl-2 py-1">
                {item.label}
              </span>
              <span className="pl-2 text-sm md:text-base text-white/90">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

interface Tech {
  name: string
  logo: string
}

const technologies: Tech[] = [
  {
    name: 'JavaScript',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
  },
  {
    name: 'Python',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  },
  {
    name: 'HTML',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
  },
  {
    name: 'Bootstrap',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg',
  },
  {
    name: 'Material UI',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg',
  },
  {
    name: 'Java',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
  },
  {
    name: 'MongoDB',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'MySQL',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
  },
  {
    name: 'Express.js',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
  },
  {
    name: 'Node.js',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'React',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  },
  { name: 'Payload CMS', logo: 'https://payloadcms.com/apple-icon.png?ecf0fe126546bd55' }, // fallback logo
]

const resolveLogos = (logos: TrustedLogo[] | null | undefined, useFallback: boolean): Tech[] => {
  if (Array.isArray(logos) && logos.length > 0) {
    return logos
      .map((item: TrustedLogo) => {
        const url = item?.logo?.url || item?.logoUrl
        if (!url) return null
        return {
          name: item?.name?.trim() || item?.logo?.alt || 'Logo',
          logo: url,
        }
      })
      .filter(Boolean) as Tech[]
  }
  return useFallback ? technologies : []
}

const InfiniteTechScroll = ({
  logos,
  useFallback = true,
}: {
  logos?: TrustedLogo[] | null
  useFallback?: boolean
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const x = useRef<number>(0)
  const requestRef = useRef<number | null>(null)

  const resolved = resolveLogos(logos || [], useFallback)

  const animate = useCallback(() => {
    if (!scrollRef.current || !containerRef.current) return

    x.current -= 1 // Scroll speed
    const scrollWidth = scrollRef.current.scrollWidth / 2

    if (Math.abs(x.current) >= scrollWidth) {
      x.current = 0
    }

    scrollRef.current.style.transform = `translateX(${x.current}px)`
    requestRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!resolved.length) return
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current)
    }
  }, [animate, resolved.length])

  if (!resolved.length) return null

  return (
    <div
      onMouseEnter={() => {
        if (requestRef.current !== null) {
          cancelAnimationFrame(requestRef.current)
        }
      }}
      onMouseLeave={() => {
        requestRef.current = requestAnimationFrame(animate)
      }}
      ref={containerRef}
      className="overflow-hidden w-[calc(100vw-120px)] whitespace-nowrap bg-transparent mb-[50px]"
    >
      <div
        ref={scrollRef}
        className="flex gap-6 will-change-transform p-4"
        style={{ transform: 'translateX(0)', whiteSpace: 'nowrap' }}
      >
        {[...resolved, ...resolved].map((tech, index) => (
          <div
            key={index}
            className="min-w-[120px] flex flex-col items-center justify-center p-4 rounded-xl backdrop-blur-sm shadow-md bg-white"
          >
            <img src={tech.logo} alt={tech.name} className="w-10 h-10 object-contain mb-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
