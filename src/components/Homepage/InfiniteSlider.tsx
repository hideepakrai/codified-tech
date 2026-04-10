'use client'

import { useEffect, useRef } from 'react'

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

export const InfiniteTechScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const x = useRef<number>(0)
  const requestRef = useRef<number | null>(null)

  const animate = () => {
    if (!scrollRef.current || !containerRef.current) return

    x.current -= 1 // Scroll speed
    const scrollWidth = scrollRef.current.scrollWidth / 2

    if (Math.abs(x.current) >= scrollWidth) {
      x.current = 0
    }

    scrollRef.current.style.transform = `translateX(${x.current}px)`
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div
      onMouseEnter={() => cancelAnimationFrame(requestRef.current!)}
      onMouseLeave={() => (requestRef.current = requestAnimationFrame(animate))}
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap bg-gray-900 p-4 pb-[50px]"
    >
      <div
        ref={scrollRef}
        className="flex gap-6 will-change-transform "
        style={{ transform: 'translateX(0)', whiteSpace: 'nowrap' }}
      >
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="min-w-[120px] flex flex-col items-center justify-center p-4 border border-white/10 rounded-xl bg-white backdrop-blur-sm shadow-md"
          >
            <img src={tech.logo} alt={tech.name} className="w-10 h-10 object-contain mb-2" />
            <p className="text-black font-bold text-sm text-center">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
