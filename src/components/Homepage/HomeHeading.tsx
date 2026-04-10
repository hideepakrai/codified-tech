'use client'

import { motion, type Easing } from 'motion/react'

type ComponentProps = {
  data: {
    heading: string
    text: string
    para: string
  }
}

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing, // Custom easing function
    },
  }),
}

// export const HomeHeading = ({ data }: ComponentProps) => {
//   const words = data?.heading.split(' ')

//   return (
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[90%] z-10 text-white text-center px-4 mt-10">
//       <h1 className="w-[300px] sm:w-[520px] md:w-[720px] flex flex-wrap lg:w-[1200px] justify-center text-balance text-center leading-tight mb-6 font-bold text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
//         {words.map((word, i) => (
//           <motion.span
//             key={i}
//             custom={i}
//             initial="hidden"
//             animate="visible"
//             variants={wordAnimation}
//             className="mr-2 inline-block"
//           >
//             {word.split('').map((char, j) => (
//               <motion.span key={j} whileHover={{ scale: 1.25 }} className="inline-block">
//                 {char}
//               </motion.span>
//             ))}
//           </motion.span>
//         ))}
//       </h1>

//       <p className="text-base sm:text-lg md:text-xl mb-6 w-[100%] sm:w-[70%] md:w-[50%] lg:w-[70%] text-gray-300">
//         {data?.para}
//       </p>

//       <motion.button
//         className="relative px-6 py-2 border-2 text-white font-medium rounded-md overflow-hidden group cursor-pointer"
//         style={{ borderColor: '#4993cd' }} // Custom border color
//       >
//         {/* Text Layer */}
//         <span className="relative z-10 group-hover:text-white transition-colors duration-500">
//           Connect With Our Experts
//         </span>

//         {/* Animated Background Layer */}
//         <span
//           className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0 z-0"
//           style={{ backgroundColor: '#4993cd' }} // Custom hover background
//         ></span>
//       </motion.button>
//     </div>
//   )
// }

export const HomeHeading = ({ data }: ComponentProps) => {
  const words = data?.heading.split(' ')

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[90%] z-10 text-black text-center px-4 mt-10">
      <h1 className="w-[300px] sm:w-[520px] md:w-[720px] lg:w-[1200px] flex flex-wrap justify-center text-center leading-tight mb-6 font-bold text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl">
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={wordAnimation}
            className="mr-2 inline-block"
          >
            {word.split('').map((char, j) => (
              <motion.span key={j} whileHover={{ scale: 1.25 }} className="inline-block text-white">
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </h1>

      <p className="text-base sm:text-lg md:text-xl mb-6 w-[100%] sm:w-[70%] md:w-[50%] lg:w-[70%] text-gray-300">
        {data?.para}
      </p>

      <motion.button
        className="relative px-6 py-2 border-2 text-white font-medium rounded-md overflow-hidden group cursor-pointer"
        style={{ borderColor: '#4993cd' }}
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-500">
          {data.text}
        </span>
        <span
          className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0 z-0"
          style={{ backgroundColor: '#4993cd' }}
        ></span>
      </motion.button>
    </div>
  )
}
