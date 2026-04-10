const services = [
  {
    title: 'Product Research',
    desc: 'To lay a solid foundation for the creative process that follows, we begin our journey with the discovery phase.',
    icon: '🔍',
    gradient: 'from-pink-400 to-purple-500',
  },
  {
    title: 'Product Design',
    desc: "By putting user's need at the forefront, we tell a unique story of your company, juggling with fancy visual elements.",
    icon: '🎨',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'Product Development',
    desc: 'The motto of our development process is creating digital experiences that are both appealing and functional.',
    icon: '💻',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    title: 'Product Growth & Care',
    desc: 'With various tools, our experts can help you expand the target audience and increase brand awareness.',
    icon: '📈',
    gradient: 'from-pink-500 to-indigo-500',
  },
]
interface ServicesSectionProps {
  industries?: any[]
}

export const ServicesSection = ({ industries: _industries }: ServicesSectionProps) => {
  return (
    <section className="bg-white text-black px-6 py-20 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          We enable rapid growth
        </h2>
        <p className="text-lg  md:text-2xl font-light mt-2">through digital creation</p>
        <p className="text-gray-700 mt-4 text-lg md:text-xl">
          Our team of experts are dedicated to helping clients navigate the complexities of digital
          transformation to unlock new avenues of growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-[#f2f2f2] hover:bg-[#f7f7f7] transition-all duration-300 rounded-2xl p-6 flex gap-6 items-start shadow-lg"
          >
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-black text-2xl`}
              >
                {item.icon}
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white flex items-center justify-center text-xs">
                ↗
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black text-lg md:text-xl mb-1">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
