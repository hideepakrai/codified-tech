'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Industry {
  id?: string
  title?: string
  shortDescription?: string
  slug?: string
  icon?: {
    url?: string
  }
}

interface SliderProps {
  industries: any[]
}

export const Indutryslider = ({ industries }: SliderProps) => {
  // 🔹 ONE ref only (IMPORTANT)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // 🔹 active index (start from 1 because of clones)
  const [active, setActive] = useState(1)

  // 🔹 real data from CMS
  const data = industries || []

  // ===============================
  // CENTER ACTIVE CARD ON LOAD / CHANGE
  // ===============================
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const children = container.children as HTMLCollectionOf<HTMLElement>
    const activeCard = children[active]

    if (activeCard) {
      const scrollTo =
        activeCard.offsetLeft -
        container.clientWidth / 2 +
        activeCard.clientWidth / 2

      container.scrollTo({ left: scrollTo, behavior: 'auto' })
    }
  }, [active])

  // ===============================
  // AUTOPLAY
  // ===============================
  useEffect(() => {
    if (!data.length) return

    const interval = setInterval(() => {
      handleNext()
    }, 2500)

    return () => clearInterval(interval)
  }, [active, data.length])

  // ===============================
  // NEXT
  // ===============================
  const handleNext = () => {
    const container = scrollRef.current
    if (!container) return

    const children = container.children as HTMLCollectionOf<HTMLElement>
    const newActive = active + 1
    setActive(newActive)

    const activeCard = children[newActive]
    if (!activeCard) return

    const scrollTo =
      activeCard.offsetLeft -
      container.clientWidth +
      activeCard.clientWidth

    container.scrollTo({ left: scrollTo, behavior: 'smooth' })

    // clone end → jump to real first
    if (newActive === data.length + 1) {
      setTimeout(() => {
        const realFirst = children[1]
        const resetScroll =
          realFirst.offsetLeft -
          container.clientWidth +
          realFirst.clientWidth

        container.scrollTo({ left: resetScroll, behavior: 'auto' })
        setActive(1)
      }, 20)
    }
  }

  // ===============================
  // PREV
  // ===============================
  const handlePrev = () => {
    const container = scrollRef.current
    if (!container) return

    const children = container.children as HTMLCollectionOf<HTMLElement>
    const newActive = active - 1
    setActive(newActive)

    const activeCard = children[newActive]
    if (!activeCard) return

    const scrollTo =
      activeCard.offsetLeft -
      container.clientWidth +
      activeCard.clientWidth

    container.scrollTo({ left: scrollTo, behavior: 'smooth' })

    // clone start → jump to real last
    if (newActive === 0) {
      setTimeout(() => {
        const realLast = children[data.length]
        const resetScroll =
          realLast.offsetLeft -
          container.clientWidth +
          realLast.clientWidth

        container.scrollTo({ left: resetScroll, behavior: 'auto' })
        setActive(data.length)
      }, 20)
    }
  }

  if (!data.length) return null

  return (
    <div className="w-screen px-6 py-20 min-h-screen flex flex-col items-center justify-center bg-[#171624]">
      {/* HEADER */}
      <div className="p-10 text-white text-center max-w-4xl">
        <h2 className="text-xl font-extrabold uppercase mb-4">
          Explore Industries
        </h2>
        <p className="text-2xl md:text-4xl font-medium">
          Industries we empower with technology
        </p>
      </div>

      {/* SLIDER */}
      <div
        ref={scrollRef}
        className="lg:w-[76%] w-full flex snap-x snap-mandatory overflow-hidden items-center"
      >
        {[data[data.length - 1], ...data, data[0]].map((item, i) => {
          const href = item?.slug ? `/industries/${item.slug}` : undefined
          const Card = (
            <div
              className={`snap-center flex-none w-full lg:w-[420px] h-[420px] mx-4 rounded-xl flex items-center justify-center transition-all duration-300 ${active === i
                ? 'bg-[#2a5298] scale-105 z-30'
                : 'bg-gray-800'
                }`}
            >
              <div className="text-white p-8 flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">
                    {item?.title || 'Industry'}
                  </h3>
                  <BsArrowUpRight />
                </div>

                <p className="text-sm text-gray-200">
                  {item?.shortDescription ||
                    'Industry focused digital solutions'}
                </p>

                {item?.icon?.url && (
                  <img
                    src={item.icon.url}
                    alt={item.title}
                    className="h-24 w-24 object-contain mt-6"
                  />
                )}
              </div>
            </div>
          )

          return href ? (
            <Link key={i} href={href} className="snap-center flex-none">
              {Card}
            </Link>
          ) : (
            <div key={i}>{Card}</div>
          )
        })}
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 mt-8 text-white">
        <button
          onClick={handlePrev}
          className="p-3 border rounded-full hover:bg-white hover:text-black transition"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={handleNext}
          className="p-3 border rounded-full hover:bg-white hover:text-black transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}
