import { HomeHeading } from './HomeHeading'
import Particles from './Particles'
 
export const LandingHero = ({ hero1 }: any) => {
  if (!hero1) return null
 
  const heading: string = hero1?.heading || ''
  const para: string = hero1?.text?.root?.children?.[0]?.children?.[0]?.text || ''
  const buttonText: string = hero1?.button?.[0]?.text || 'Get Started'
 
  return (
    <section className="h-[calc(100vh-80px)] relative overflow-hidden">
      <Particles
        particleCount={300}
        className="h-full w-full absolute top-0 left-0 z-1 bg-gray-900"
        particleColors={['#00d8ff']}
      />

      {/* Content Layer */}
      <HomeHeading data={{ heading, text: buttonText, para }} />
    </section>
  )
}
 