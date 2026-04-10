import { useEffect, useState } from 'react'

export const useScrollDirection = () => {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      const newDirection = currentScrollY > lastScrollY ? 'down' : 'up'

      if (newDirection !== direction) {
        setDirection(newDirection)
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
    }

    window.addEventListener('scroll', updateScrollDirection)

    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [direction]) // include direction in dependencies so it updates on change

  return { direction, scrollY }
}
