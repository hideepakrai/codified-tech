'use client'

import { useEffect, useRef } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

const defaultColors = ['#ffffff', '#ffffff', '#ffffff']

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('')
  }
  const int = parseInt(hex, 16)
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ]
}

const vertex = /* glsl */ `
attribute vec3 position;
attribute vec4 random;
attribute vec3 color;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;

varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vRandom = random;
  vColor = color;

  vec3 pos = position * uSpread;
  pos.z *= 10.0;

  vec4 mPos = modelMatrix * vec4(pos, 1.0);
  mPos.xyz += sin(uTime + random.xyz * 6.28) * random.w;

  vec4 mvPos = viewMatrix * mPos;
  gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}
`

const fragment = /* glsl */ `
precision highp float;

uniform float uAlphaParticles;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float d = length(uv - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.3, d);
  gl_FragColor = vec4(vColor, alpha * uAlphaParticles);
}
`

interface ParticlesProps {
  particleCount?: number
  particleSpread?: number
  speed?: number
  particleColors?: string[]
  particleBaseSize?: number
  sizeRandomness?: number
  cameraDistance?: number
  className?: string
}

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.2,
  particleColors,
  particleBaseSize = 80,
  sizeRandomness = 1,
  cameraDistance = 20,
  className,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.WebGLRenderingContext) return

    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    canvasRef.current = canvas
    container.appendChild(canvas)

    let renderer: Renderer | null = null
    let animationId = 0

    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        depth: false,
        antialias: false,
      })
    } catch (err) {
      console.error('WebGL init failed', err)
      return
    }

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    const camera = new Camera(gl, { fov: 15 })
    camera.position.z = cameraDistance

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer!.setSize(w, h)
      camera.perspective({ aspect: w / h })
    }
    resize()
    window.addEventListener('resize', resize)

    const positions = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount * 4)
    const colors = new Float32Array(particleCount * 3)

    const palette = particleColors?.length ? particleColors : defaultColors

    for (let i = 0; i < particleCount; i++) {
      positions.set([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5], i * 3)
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), i * 3)
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: 1 },
      },
    })

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program })

    const animate = (t: number) => {
      animationId = requestAnimationFrame(animate)
      program.uniforms.uTime.value = t * speed * 0.001
      mesh.rotation.y += 0.001
      renderer!.render({ scene: mesh, camera })
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      if (renderer?.gl) {
        renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }, [])

  return <div ref={containerRef} className={`relative w-full h-full ${className || ''}`} />
}
