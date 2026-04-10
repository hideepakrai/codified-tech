'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useRef } from 'react'

function tochangeinsentence(words: string) {
  const arr = words.split(' ')
  const chunks: string[][] = []
  for (let i = 0; i < arr.length; i += 9) {
    chunks.push(arr.slice(i, i + 9))
  }
  return chunks
}

export function useFixedScrollGradients(
  scrollYProgress: MotionValue<number>,
  count: number,
  {
    range = [0, 1400],
  }: {
    range?: [number, number]
  } = {},
) {
  // Predeclare a safe upper limit
  const gradients = [
    useTransform(scrollYProgress, [0.1, 0.22], range, { clamp: true }),
    useTransform(scrollYProgress, [0.2, 0.32], range, { clamp: true }),
    useTransform(scrollYProgress, [0.3, 0.42], range, { clamp: true }),
    useTransform(scrollYProgress, [0.4, 0.52], range, { clamp: true }),
    useTransform(scrollYProgress, [0.5, 0.62], range, { clamp: true }),
    useTransform(scrollYProgress, [0.6, 0.72], range, { clamp: true }),
    useTransform(scrollYProgress, [0.7, 0.82], range, { clamp: true }),
    useTransform(scrollYProgress, [0.8, 0.92], range, { clamp: true }),
    useTransform(scrollYProgress, [0.9, 1.0], range, { clamp: true }),
  ]

  return gradients.slice(0, count)
}
export const Section2 = ({ achievement }: any) => {
  const words = achievement.description.root.children[0].children[0].text
  const word = tochangeinsentence(words)
  const divref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: divref,
    offset: ['center end', 'end center'],
  })

  const gradients = useFixedScrollGradients(scrollYProgress, word.length)
  // const gradient = [gradient1, gradient2, gradient3]

  return (
    <div className="py-20 h-screen px-3 md:px-20 flex flex-col justify-center w-full bg-section">
      <div ref={divref} className="text-center w-full ">
        {word.map((chunk, i) => (
          <motion.span
            key={i}
            style={{
              backgroundPositionX: gradients[i],
              backgroundSize: '150%',
              backgroundRepeat: '',
              backgroundImage: 'linear-gradient(to right, #1f2937, white)',
              backgroundClip: 'text',
            }}
            className="text-justify font-bold px-1 inline text-base md:text-3xl  text-white md:text-transparent "
          >
            {chunk.join(' ')}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-row flex-wrap items-center gap-3 md:flex-nowrap mt-5 self-stretch">
        {achievement.blobcard.map(({ label, value, id }: any) => {
          return (
            <div
              key={id}
              className="md:w-1/4 w-[47%] rounded-xl flex flex-col h-32 p-4 bg-[#4994cc] shadow"
            >
              <span className="font-extrabold text-6xl text-black mb-2">{value}</span>
              <span className="text-[18px] text-black">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
