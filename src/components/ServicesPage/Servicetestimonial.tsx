// 'use client'
// import { useRef, useState } from 'react'
// import '../../css/hero3.css'

// import { FaChevronLeft } from 'react-icons/fa6'
// import { FaChevronRight } from 'react-icons/fa6'
// import { motion } from 'motion/react'

// export const ServiceTestimonials = () => {
//   const sliderref = useRef<HTMLDivElement>(null)

//   const handleRightScroll = () => {
//     sliderref.current?.scrollBy({ left: 25, behavior: 'smooth' })
//   }

//   const handleLeftScroll = () => {
//     sliderref.current?.scrollBy({ left: -25, behavior: 'smooth' })
//   }

//   return (
//     <div className="mt-5">
//       <div
//         ref={sliderref}
//         className="tohide scroll-smooth snap-x snap-mandatory flex gap-2 p-2 flex-row  overflow-hidden transition-all"
//       >
//         {[1, 2, 3, 4].map((d) => {
//           return <SingleTestimonialcard key={d} />
//         })}
//       </div>
//       <div className="w-full mt-5 gap-5 flex items-center justify-center">
//         <motion.button
//           whileTap={{
//             scale: 0.9,
//           }}
//           onClick={handleLeftScroll}
//           className={` size-15 flex items-center justify-center border-2 rounded-full`}
//         >
//           <FaChevronLeft size={45} />
//         </motion.button>
//         <motion.button
//           whileTap={{
//             scale: 0.9,
//           }}
//           onClick={handleRightScroll}
//           className={` size-15 flex items-center justify-center border-2 rounded-full`}
//         >
//           <FaChevronRight size={45} />
//         </motion.button>
//       </div>
//     </div>
//   )
// }

// const SingleTestimonialcard = () => {
//   return (
//     <div className="snap-center flex-shrink-0 w-full grid h-full grid-cols-1 md:grid-cols-2 gap-5 md:gap-9">
//       <div className="rounded-lg w-full h-[calc(90vh-200px)] relative">
//         <div className="absolute inset-0 rounded-lg overflow-hidden">
//           <img
//             className="size-[100%] object-cover"
//             src="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="Service background image"
//           />
//           <div className="absolute inset-0 bg-black opacity-70"></div>
//         </div>
//         <div className="relative z-10 p-6 text-white  h-full flex flex-col justify-end">
//           <h2 className="text-[clamp(2rem,4vw,4rem)] font-extrabold">Name of Services</h2>
//           <h4 className="text-[clamp(1.2rem,3vw,2.6rem)] font-bold">Punch Line for the Service</h4>
//         </div>
//       </div>
//       <div className="h-auto md:h-[calc(90vh-200px)] flex flex-col justify-between bg-gray-800 border border-[#222] rounded-2xl p-8 text-white shadow-md">
//         <div>
//           <div className="w-14 h-14 border-2 border-black rounded-full flex items-center justify-center text-lg font-semibold bg-[#fff]">
//             L
//           </div>
//           <p className="mt-8 text-lg leading-relaxed text-gray-300">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi harum maiores fugit
//             repellat corrupti a ipsa. Quidem laboriosam cumque maxime molestiae in iusto sequi fugit
//             numquam tempore error repellat, molestias debitis modi harum? Itaque maiores possimus,
//             eveniet quod aspernatur dicta nisi id.
//           </p>
//         </div>
//         <div className="flex items-center gap-4 mt-8">
//           <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shadow">
//             I
//           </div>
//           <div>
//             <p className="font-semibold text-white">Ishaan Verma</p>
//             <p className="text-sm text-gray-400">Product Manager</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
