'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useWindowSize } from '@uidotdev/usehooks'
import { useModal } from '@/context/ModalContext'

type HeaderLogo = {
  url: string
  alt: string
  width: number
  height: number
}

export const Header = ({ data, logo }: { data: any; logo?: HeaderLogo }) => {


  const [activeCategory, setActiveCategory] = useState<any>(null)
  const { openModal } = useModal()
  const controls = useAnimation()
  const { direction, scrollY } = useScrollDirection()
  const size = useWindowSize()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  const resolveNavHref = (item: any) => {
    const rawHref =
      typeof item?.href === 'string' ? item.href.trim() : ''
    if (rawHref) return rawHref

    const label = (item?.label || '').toLowerCase().trim()
    if (label === 'contact us' || label === 'contact') return '/contact-us'
    if (label === 'about') return '/about'
    if (label === 'services') return '/services'
    if (label === 'industries') return '/industries'

    const rawSlug =
      typeof item?.slug === 'string' ? item.slug.trim() : ''
    if (rawSlug) return `/${rawSlug}`

    return '#'
  }

  const handleMobileChange = () => {
    setMobileOpen(!mobileOpen)
    setOpenDropdown(null)
  }

  const handleDefaultCategory = (d: any) => {
    const defaultCategory = d?.dropdownItems?.[0] || null
    setActiveCategory(defaultCategory)
  }

  const handleToggleDropdown = (d: any) => {
    if (!d?.hasDropdown) return
    if (hoveredMenu === d.label) {
      setHoveredMenu(null)
      setActiveCategory(null)
      return
    }
    handleDefaultCategory(d)
    setHoveredMenu(d.label)
  }

  const handleHoverDropdown = (d: any) => {
    if (!d?.hasDropdown) return
    handleDefaultCategory(d)
    setHoveredMenu(d.label)
  }

  const cancelClose = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null)
      setActiveCategory(null)
    }, 120)
  }

  const [us, setUs] = useState(true)


  useEffect(() => {
    const onScroll = () => {
      setUs(window.scrollY < 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname === '/services' && size?.width && size.width >= 1024) {
      if (direction === 'down' && scrollY > 200) {
        controls.start({ y: '-100%' })
      } else if (direction === 'up') {
        controls.start({ y: '0%' })
      }
    }

  }, [direction, scrollY, pathname, size])

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  // const u = /^\/insights\/blog\/[^\/]+$/.test(pathname)

  return (
    <motion.header
      animate={controls}
      initial={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 w-full z-50 transition-colors duration-300 py-4 bg-[#101828]"
    >

      <nav className="relative flex justify-between items-center h-[72px] px-5 md:px-20">
        <Link href="/">
          <Image
            src={logo?.url || '/Image/codified-white-logo.webp'}
            alt={logo?.alt || 'Codified Logo'}
            width={logo?.width || 180}
            height={logo?.height || 72}
            className="h-18 w-auto"
            priority
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {data?.map((d: any) => (
            <li
              key={d.id}
              onMouseEnter={() => {
                cancelClose()
                handleHoverDropdown(d)
              }}
              onMouseLeave={() => {
                scheduleClose()
              }}
            >
              {d.hasDropdown ? (
                <Link
                  href={resolveNavHref(d)}
                  onClick={() => {
                    setHoveredMenu(null)
                    setActiveCategory(null)
                  }}
                  className="text-lg flex items-center gap-1 h-[72px] overflow-hidden"
                >
                  <motion.span className="hover:bg-black/40 hover:border-b-2 hover:border-b-white flex items-center p-2 h-[72px] text-white">
                    {d.label}
                  </motion.span>
                </Link>
              ) : (
                <Link
                  href={resolveNavHref(d)}
                  className="text-lg flex items-center gap-1 h-[72px] overflow-hidden"
                >
                  <motion.span className="hover:bg-black/40 hover:border-b-2 hover:border-b-white flex items-center p-2 h-[72px] text-white">
                    {d.label}
                  </motion.span>
                </Link>
              )}

              <AnimatePresence>
                {hoveredMenu === d.label && d.hasDropdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '25rem', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className="absolute left-0 top-20 px-20 bg-white text-black py-6 shadow-2xl flex flex-col gap-2 z-50 w-[100%] font-normal overflow-hidden rounded-b-xl"
                  >
                    <div className="h-20 flex flex-col justify-between">
                      <h2 className="text-3xl font-bold text-gray-900">
                        {d.label}
                      </h2>

                      <p className="text-md text-gray-600 leading-snug">
                        {activeCategory?.description || ''}
                      </p>
                    </div>


                    <div className="flex flex-row border-t border-gray-300 h-full gap-8 pt-4">
                      {activeCategory && activeCategory.categoryTitle !== 'Industries' && (
                        <ul className="relative z-30 flex flex-col gap-1 w-4/12 pr-4 border-r border-gray-200 min-h-[150px] max-h-[40vh]">
                          {d.dropdownItems?.map((d: any) => {
                            const isActive = activeCategory?.categoryTitle === d.categoryTitle
                            return (
                              <li
                                key={d.id}
                                className={`transition-colors duration-300 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 ${isActive ? 'font-extrabold bg-gray-100 text-blue-600' : ''
                                  }`}
                                onMouseEnter={() => setActiveCategory(d)}
                                onClick={() => setActiveCategory(d)}
                              >
                                {d.link ? (
                                  <Link
                                    className="block px-4 py-2 w-full text-[17px]"
                                    href={d.link}
                                  >
                                    {d.categoryTitle}
                                  </Link>
                                ) : (
                                  <span className="block px-4 py-2 w-full text-[17px]">
                                    {d.categoryTitle}
                                  </span>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      <ul
                        className={`
    ${activeCategory?.categoryTitle === 'Industries' ? 'w-12/12 grid-cols-3 auto-rows-min' : 'w-8/12'}
    ${activeCategory?.subServices?.length ? 'overflow-y-auto' : ''}
    grid grid-cols-2 auto-rows-minmin-h-[150px] max-h-[50vh]gap-2 pr-2 bg-white rounded-md `}>
                        {activeCategory?.subServices?.length === 0 ? (
                          <li className="mt-2 col-span-3 border h-30 rounded-xl hover:shadow-md flex items-center justify-start gap-4 bg-gray-50 p-4 transition">
                            <div className="size-8 bg-blue-100 text-black flex items-center justify-center rounded-full font-bold">
                              M
                            </div>
                            <div className="flex flex-col">
                              <span className="text-md font-medium">
                                {activeCategory.categoryTitle}
                              </span>
                              <span className="text-sm text-gray-600">
                                {activeCategory.description}
                              </span>
                            </div>
                            <div className="w-[400px] h-[400px] flex items-center justify-center">
                              <div className="w-[180px] h-[60px] relative">
                                <button className="w-[180px] h-[60px] border border-blue-300 bg-white relative overflow-hidden">
                                  <motion.svg
                                    width="180"
                                    height="60"
                                    viewBox="0 0 180 60"
                                    className="absolute left-0 top-0 pointer-events-none"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="6"
                                    initial={{
                                      strokeDasharray: '150 480',
                                      strokeDashoffset: 150,
                                    }}
                                    animate={{ strokeDashoffset: [-480, 100] }}
                                    transition={{
                                      duration: 2,
                                      ease: 'easeInOut',
                                      repeat: Infinity,
                                      repeatType: 'loop',
                                    }}
                                  >
                                    <polyline points="179,1 179,59 1,59 1,1 179,1" />
                                  </motion.svg>
                                  <span className="text-black text-lg font-light relative z-10">
                                    Explore
                                  </span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ) : (
                          activeCategory?.subServices?.map((d: any) => (
                            <li
                              key={d.id}
                              onClick={() => setHoveredMenu(null)}
                              className="hover:bg-gray-100 hover:border-l-4 border-blue-400 transition duration-300 h-20 rounded-md"
                            >
                              <Link
                                className="w-full h-full flex px-4 py-2 text-sm gap-2 items-center"
                                href={d.link}
                              >
                                <span className="size-10 rounded-full flex items-center justify-center border border-gray-700">
                                  L
                                </span>

                                <div className="flex flex-col gap-1">
                                  <span>{d?.label}</span>

                                  {/* ✅ ADMIN CONTROLLED DESCRIPTION */}
                                  <span className="text-[10px] text-gray-500">
                                    {d?.description}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
          <li>
            <button
              className="bg-white text-black px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
              onClick={openModal}
            >
              Free Consultation
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="block lg:hidden">
          <button onClick={handleMobileChange}>
            {mobileOpen ? (
              <IoMdClose size={28} />
            ) : (
              <GiHamburgerMenu className="text-white" size={26} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden fixed top-0 left-0 h-screen w-screen text-black z-50 bg-transparent"
          >
            <ul className="bg-white flex flex-col space-y-4 text-lg overflow-y-auto h-full p-4 w-full">
              <li className="self-end">
                <button onClick={handleMobileChange}>
                  <IoMdClose size={28} />
                </button>
              </li>
              {data?.map((d: any) => (
                <li key={d.id}>
                  <div className="flex justify-between items-center">
                    <Link
                      href={resolveNavHref(d)}
                      onClick={() => setMobileOpen(false)}
                    >
                      {d.label}
                    </Link>
                    {d.hasDropdown && (
                      <FaChevronDown
                        size={12}
                        onClick={() => toggleDropdown(d.label.toLowerCase())}
                        className={`cursor-pointer ml-2 transition-transform ${openDropdown === d.label.toLowerCase() ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </div>

                  {d.hasDropdown &&
                    openDropdown === d.label.toLowerCase() && (
                      <ul className="ml-4 mt-2 space-y-2 text-sm">
                        {d.dropdownItems.map((d: any) => (
                          <li key={d.id}>
                            <p className="font-semibold mt-2">{d.categoryTitle}</p>
                            <ul className="ml-2">
                              {d.subServices.map((item: any) => (
                                <li key={item.id}>
                                  <Link href={item.link} onClick={() => setMobileOpen(false)}>
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
              <li>
                <button
                  onClick={openModal}
                  className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-500 hover:text-white w-full transition"
                >

                  Free Consultation
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
