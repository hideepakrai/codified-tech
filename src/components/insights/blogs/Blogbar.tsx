'use client'

export const Blogbar = () => {
  const categories = [
    'App Development',
    'Software Dev',
    'Cloud',
    'AI/ML',
    'App Development',
    'Software Dev',
    'Cloud',
    'AI/ML',
    'App Development',
    'Software Dev',
    'Cloud',
    'AI/ML',
  ]

  return (
    <ul className="mt-2 w-full flex flex-wrap gap-2">
      {categories.map((d, i) => {
        return (
          <li className=" text-white bg-[#222222] rounded-lg px-3 py-2" key={i}>
            {d}
          </li>
        )
      })}
    </ul>
  )
}
