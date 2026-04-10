'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export const CareerHero = () => {
  return (
    <div className="relative box-border h-screen flex flex-col md:flex-row item-end justify-end">
      <div className="absolute top-0 left-0 h-full w-full flex">
        <div className="bg-[#161616] w-[80%] sm:w-1/2 h-full"></div>
        <div className="bg-[#353434] w-[20%] sm:w-1/2 h-full"></div>
      </div>
      <div className="grid grid-cols-12 grid-rows-6 sm:gap-3 box-border relative z-10 pt-24 px-6 sm:pr-0 md:pl-16 pl:0 lg:px-15 w-full h-full bg-transparent sm:items-end">
        <div className="row-span-3 row-start-4 col-span-12 sm:col-span-7 sm:row-span-6 sm:col-start-6 sm:row-start-1 sm:h-[calc(100%-20vh)] w-full relative shadow-2xl">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661266819853-ac00dcaf21d2?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            sizes="(min-width: 640px) 58vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="row-span-3 row-start-1 col-span-12 bg-transparent sm:col-span-5 sm:row-span-6 sm:col-start-1 sm:col-end-7 sm:row-start-1 sm:h-[calc(100%-20vh)] flex flex-col gap-4 ">
          <h2 className="font-bold text-xl  w-full sm:w-[70%]">Welcome to our careers hub.</h2>
          <h2 className="md:text-4xl sm:text-2xl">
            Explore opportunities to join our team and make an impact.
          </h2>
          <p className="sm:w-[70%] w-full">
            We&#39;re always looking for talented individuals to join our team. Whether you&#39;re a
            recent graduate or an experienced professional, we have a range of opportunities
            available. Explore our current job openings and find the perfect fit for your skills and
            passion.
          </p>
          <div>
            <button className="w-[180px] text-white font-bold h-[60px] border border-gray-600 transition-colors duration-1000 ease-in-out relative overflow-hidden">
              <motion.svg
                width="180"
                height="60"
                viewBox="0 0 180 60"
                className="absolute left-0 top-0 pointer-events-none"
                fill="none"
                stroke="white"
                strokeWidth="5"
                initial={{ strokeDasharray: '150 480', strokeDashoffset: 0 }}
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
              <span className="text-white font-bold text-lg relative z-10">Explore</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

