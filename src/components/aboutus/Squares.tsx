'use client'

// 'use client'

// import { useRef, useEffect, FC } from 'react'
// import '../../css/hero3.css'

// type Direction = 'right' | 'left' | 'up' | 'down' | 'diagonal'

// interface SquaresProps {
//   direction?: Direction
//   speed?: number
//   borderColor?: string
//   squareSize?: number
//   hoverFillColor?: string
//   className?: string
// }

// const Squares: FC<SquaresProps> = ({
//   direction = 'right',
//   speed = 1,
//   borderColor = '#999',
//   squareSize = 40,
//   hoverFillColor = '#222',
//   className = '',
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)
//   const requestRef = useRef<number | null>(null)
//   const numSquaresX = useRef<number>(0)
//   const numSquaresY = useRef<number>(0)
//   const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
//   const hoveredSquare = useRef<{ x: number; y: number } | null>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     const resizeCanvas = () => {
//       canvas.width = canvas.offsetWidth
//       canvas.height = canvas.offsetHeight
//       numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1
//       numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1
//     }

//     window.addEventListener('resize', resizeCanvas)
//     resizeCanvas()

//     const drawGrid = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height)

//       const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
//       const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

//       for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
//         for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
//           const squareX = x - (gridOffset.current.x % squareSize)
//           const squareY = y - (gridOffset.current.y % squareSize)

//           const hover = hoveredSquare.current
//           if (
//             hover &&
//             Math.floor((x - startX) / squareSize) === hover.x &&
//             Math.floor((y - startY) / squareSize) === hover.y
//           ) {
//             ctx.fillStyle = hoverFillColor
//             ctx.fillRect(squareX, squareY, squareSize, squareSize)
//           }

//           ctx.strokeStyle = borderColor
//           ctx.strokeRect(squareX, squareY, squareSize, squareSize)
//         }
//       }

//       const gradient = ctx.createRadialGradient(
//         canvas.width / 2,
//         canvas.height / 2,
//         0,
//         canvas.width / 2,
//         canvas.height / 2,
//         Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
//       )
//       gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
//       ctx.fillStyle = gradient
//       ctx.fillRect(0, 0, canvas.width, canvas.height)
//     }

//     const updateAnimation = () => {
//       const effectiveSpeed = Math.max(speed, 0.1)

//       switch (direction) {
//         case 'right':
//           gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
//           break
//         case 'left':
//           gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize
//           break
//         case 'up':
//           gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize
//           break
//         case 'down':
//           gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
//           break
//         case 'diagonal':
//           gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
//           gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
//           break
//       }

//       drawGrid()
//       requestRef.current = requestAnimationFrame(updateAnimation)
//     }

//     const handleMouseMove = (event: MouseEvent) => {
//       const rect = canvas.getBoundingClientRect()
//       const mouseX = event.clientX - rect.left
//       const mouseY = event.clientY - rect.top

//       const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
//       const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

//       const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize)
//       const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize)

//       if (
//         !hoveredSquare.current ||
//         hoveredSquare.current.x !== hoveredSquareX ||
//         hoveredSquare.current.y !== hoveredSquareY
//       ) {
//         hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY }
//       }
//     }

//     const handleMouseLeave = () => {
//       hoveredSquare.current = null
//     }

//     canvas.addEventListener('mousemove', handleMouseMove)
//     canvas.addEventListener('mouseleave', handleMouseLeave)

//     requestRef.current = requestAnimationFrame(updateAnimation)

//     return () => {
//       window.removeEventListener('resize', resizeCanvas)
//       if (requestRef.current) cancelAnimationFrame(requestRef.current)
//       canvas.removeEventListener('mousemove', handleMouseMove)
//       canvas.removeEventListener('mouseleave', handleMouseLeave)
//     }
//   }, [direction, speed, borderColor, hoverFillColor, squareSize])

//   return <canvas ref={canvasRef} className={`squares-canvas ${className}`} />
// }

// export default Squares

import { useRef, useEffect, FC } from 'react'
import '../../css/hero3.css' // Optional, for positioning or full-screen canvas

interface AnimatedBackgroundProps {
  particleCount?: number
  particleSize?: number
  particleColor?: string
  backgroundColor?: string
}

const Squares: FC<AnimatedBackgroundProps> = ({
  particleCount = 80,
  particleSize = 2,
  particleColor = '#00ffff',
  backgroundColor = 'rgba(0, 0, 0, 0.3)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
    }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      })
    }

    const draw = () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx
        p.y += p.vy

        // Bounce on edge
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.strokeStyle = `${particleColor}55` // semi-transparent line
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle)
          p.vy += Math.sin(angle)
        }
      })

      requestAnimationFrame(draw)
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [particleCount, particleSize, particleColor, backgroundColor])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />
  )
}

export default Squares
