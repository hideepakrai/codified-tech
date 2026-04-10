'use client'

import { useState } from 'react'
import Image from 'next/image'

import iconAndroid from '../../../public/icon-android.svg'
import iconAngular from '../../../public/icon-angular.svg'
import iconFlutter from '../../../public/104_flutter.png'
// import iconIOS from '../../../public/icon-ios.svg'
import iconNode from '../../../public/icon-nodejs.svg'
import iconPython from '../../../public/icon-python.svg'
import iconReact from '../../../public/icon-react.svg'
import iconCSharp from '../../../public/icon-csharp.svg'
import iconAWS from '../../../public/aws.svg'
import iconLaravel from '../../../public/icon-laravel.svg'
import iconMagento from '../../../public/icon-magento.svg'
import iconJava from '../../../public/icon-java.svg'
// import iconRuby1 from '../../../public/icon-ruby-on-rails (1).svg'
import iconRuby2 from '../../../public/icon-ruby-on-rails.svg'
import iconDjango from '../../../public/icon-django.svg'
// import iconIOSDev from '../../../public/ios-app-development.svg'

type SkillItem = {
  name: string
  iconUrl?: string | null
}

type HireDeveloperSectionProps = {
  skills?: SkillItem[]
  roles?: SkillItem[]
  eyebrow?: string
  heading?: string
}

const DEFAULT_SKILLS: SkillItem[] = [
  { name: 'Android Developers', iconUrl: iconAndroid.src },
  // { name: 'iOS Developers', iconUrl: iconIOS.src },
  { name: 'Flutter Developers', iconUrl: iconFlutter.src },
  { name: 'React Native Developers', iconUrl: iconReact.src },
  { name: 'React.JS', iconUrl: iconReact.src },
  { name: 'Node.JS', iconUrl: iconNode.src },
  { name: 'Python', iconUrl: iconPython.src },
  { name: 'AWS', iconUrl: iconAWS.src },
  { name: 'JavaScript', iconUrl: iconReact.src },
  { name: 'Ruby on Rails', iconUrl: iconRuby2.src },
  { name: 'Java', iconUrl: iconJava.src },
  { name: 'Angular', iconUrl: iconAngular.src },
  { name: 'Golang', iconUrl: iconNode.src }, // placeholder
  { name: 'Django', iconUrl: iconDjango.src },
  { name: 'Laravel', iconUrl: iconLaravel.src },
  { name: 'Magento', iconUrl: iconMagento.src },
  { name: 'ASP.NET', iconUrl: iconCSharp.src },
  { name: 'C#', iconUrl: iconCSharp.src },
]

export const HireDeveloperSection = ({
  skills,
  roles,
  eyebrow = 'Hire TechAhead Developers',
  heading = 'Empower your projects with expert developers',
}: HireDeveloperSectionProps) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'role'>('skills')
  const effectiveSkills = skills && skills.length ? skills : DEFAULT_SKILLS
  const effectiveRoles = roles && roles.length ? roles : effectiveSkills
  const displayed = activeTab === 'role' ? effectiveRoles : effectiveSkills

  return (
    <section className="bg-[#f9f9fc] py-20 px-4 md:px-10 text-center">
      <h4 className="text-sm font-bold text-black uppercase mb-2">{eyebrow}</h4>
      <h2 className="text-3xl md:text-5xl font-semibold mb-10 leading-snug text-black">
        {heading}
      </h2>

      {/* Tabs */}
      <div className="relative flex justify-center items-center w-full max-w-2xl mx-auto mb-12">
        <div className="flex justify-between w-full relative text-black text-lg font-medium">
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-1/2 pb-2 ${
              activeTab === 'skills' ? 'font-extrabold text-black' : ''
            }`}
          >
            Based on Skills
          </button>
          <button
            onClick={() => setActiveTab('role')}
            className={`w-1/2 pb-2 ${
              activeTab === 'role' ? 'font-extrabold text-black' : ''
            }`}
          >
            Based on Role
          </button>
        </div>

        {/* Animated Gradient Line */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gray-200 rounded-full" />
        <div
          className={`absolute bottom-0 h-[4px] rounded-full transition-all duration-500 ease-in-out ${
            activeTab === 'skills'
              ? 'left-0 w-1/2 bg-gradient-to-r from-purple-500 to-pink-500'
              : 'left-1/2 w-1/2 bg-gradient-to-r from-pink-500 to-purple-500'
          }`}
        />
      </div>

      {/* Tag Grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {displayed.map((skill, i) => (
          <div
            key={i}
            className="bg-white text-black flex items-center gap-2 py-2 px-4 rounded-full shadow-sm hover:shadow-md transition whitespace-nowrap text-sm md:text-base"
          >
            {skill.iconUrl ? (
              <Image src={skill.iconUrl} alt={skill.name} width={22} height={22} />
            ) : (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-bold">
                {skill.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
