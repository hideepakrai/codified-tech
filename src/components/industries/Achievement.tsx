'use client'

// const cards = [
//   {
//     icon: '🧬',
//     title:
//       'Collaborating with TechAhead translates to enhancing your business with state-of-the-art technologies.',
//     light: true,
//   },
//   {
//     icon: '🏆',
//     title: '50+',
//     subtitle: 'Apps Development Agency & B2B Provider Awards',
//     description:
//       'Our commitment, diligence, and persistence propelled us to reach unprecedented heights in the digital realm.',
//   },
//   {
//     icon: '📱',
//     title: '2,000+',
//     subtitle: 'Apps & Digital Products Delivered',
//     description:
//       'Through our exceptional approach to each project, we transform our clients’ dream projects into reality.',
//   },
//   {
//     icon: '♾️',
//     title: 'Positive Vibes',
//     description:
//       'Our goal is to deliver ideal digital solutions for your business, ensuring a friendly and relaxed process throughout.',
//   },
// ]

// export const AchievementSection = () => {
//   return (
//     <section className="bg-black text-white py-20 px-6 md:px-20">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card, i) => (
//           <div
//             key={i}
//             className={`relative rounded-xl p-6 w-full min-h-[320px] flex flex-col justify-start ${
//               card.light
//                 ? 'bg-white text-black'
//                 : 'bg-violet-700 text-white border border-violet-500'
//             }`}
//             style={{
//               clipPath: 'polygon(0 0, 100% 0, 95% 10%, 100% 10%, 100% 100%, 0 100%)',
//             }}
//           >
//             <div className="text-4xl mb-4">{card.icon}</div>
//             <div className="flex-1 flex flex-col justify-between">
//               {card.subtitle ? (
//                 <>
//                   <h3 className="text-3xl font-bold mb-1">{card.title}</h3>
//                   <p className="text-lg font-medium leading-snug">{card.subtitle}</p>
//                   <p className="text-sm mt-3 text-gray-200">{card.description}</p>
//                 </>
//               ) : (
//                 <p className="text-lg font-medium leading-relaxed">{card.title}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

type AchievementCard = {
  title?: string
  subtitle?: string
  description?: string
  light?: boolean
}

type AchievementSectionData = {
  heading?: string
  description?: string
  cards?: AchievementCard[]
}

const fallbackCards: AchievementCard[] = [
  {
    title:
      'Collaborating with TechAhead translates to enhancing your business with state-of-the-art technologies.',
    light: true,
  },
  {
    title: '50+',
    subtitle: 'Apps Development Agency & B2B Provider Awards',
    description:
      'Our commitment, diligence, and persistence propelled us to reach unprecedented heights in the digital realm.',
  },
  {
    title: '2,000+',
    subtitle: 'Apps & Digital Products Delivered',
    description:
      "Through our exceptional approach to each project, we transform our clients' dream projects into reality.",
  },
  {
    title: 'Positive Vibes',
    description:
      'Our goal is to deliver ideal digital solutions for your business, ensuring a friendly and relaxed process throughout.',
  },
]

export const AchievementSection = ({
  achievement,
  useFallback = true,
}: {
  achievement?: AchievementSectionData
  useFallback?: boolean
}) => {
  const heading = achievement?.heading?.trim()
  const description = achievement?.description?.trim()
  const cards = achievement?.cards?.length
    ? achievement.cards
    : useFallback
      ? fallbackCards
      : []

  const hasContent =
    Boolean(heading) || Boolean(description) || (Array.isArray(cards) && cards.length > 0)

  if (!hasContent && !useFallback) return null

  return (
    <section className="bg-gray-900 text-white py-20 px-6 md:px-20">
      {(heading || description) && (
        <div className="max-w-4xl mx-auto text-center mb-12">
          {heading && <h2 className="text-2xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {description && <p className="text-white/70 text-base md:text-lg">{description}</p>}
        </div>
      )}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`group relative rounded-2xl p-6 min-h-[320px] flex flex-col justify-between overflow-hidden transition-all duration-300 transform hover:scale-[1.03] ${
              card.light
                ? 'bg-gradient-to-br from-white/90 to-white text-black'
                : 'bg-gradient-to-br bg-[#2a5298] text-white'
            } border border-white/10  `}
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              clipPath: 'polygon(0 0, 100% 0, 96% 10%, 100% 10%, 100% 100%, 0 100%)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none  z-0" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              {card.subtitle ? (
                <>
                  <h3 className="text-4xl font-bold mb-2">{card.title}</h3>
                  <p className="text-lg font-medium">{card.subtitle}</p>
                  <p className="text-sm mt-3 text-white/70">{card.description}</p>
                </>
              ) : (
                <p className="text-lg font-semibold leading-relaxed">{card.title}</p>
              )}
            </div>
            <div className="h-[2px] mt-6 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent animate-pulse opacity-50" />
          </div>
        ))}
      </div>
    </section>
  )
}
