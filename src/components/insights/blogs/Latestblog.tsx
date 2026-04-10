import { Blogbar } from './Blogbar'
import { Blogcard } from './Blogcard'
import '../../../css/hero3.css'

type props = {
  withpopular: boolean
  image: string
  category: string
  title: string
  para: string
  author: string
}

export const Latestblog = () => {
  const blogPosts: props[] = [
    {
      withpopular: true,
      image: 'https://images.unsplash.com/photo-1600077104161-e3a8ed2c4c14',
      category: 'Technology',
      title: 'The Future of AI in Everyday Life',
      para: 'Artificial Intelligence is transforming how we work, communicate, travel, shop, learn, and interact with the digital world.',
      author: 'Jane Doe',
    },
    {
      withpopular: true,
      image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702',
      category: 'Health',
      title: '10 Habits for a Healthier Lifestyle',
      para: 'Small consistent changes in your routine can drastically improve physical and mental health, energy levels, and overall well-being.',
      author: 'John Smith',
    },
    {
      withpopular: true,
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      category: 'Travel',
      title: 'Top 5 Hidden Gems in Europe',
      para: 'Discover lesser-known European destinations offering breathtaking landscapes, rich culture, and unique experiences without tourist crowds.',
      author: 'Emily Clark',
    },
    {
      withpopular: true,
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      category: 'Travel',
      title: 'Top 5 Hidden Gems in Europe',
      para: 'Discover lesser-known European destinations offering breathtaking landscapes, rich culture, and unique experiences without tourist crowds.',
      author: 'Emily Clark',
    },
    {
      withpopular: true,
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      category: 'Travel',
      title: 'Top 5 Hidden Gems in Europe',
      para: 'Discover lesser-known European destinations offering breathtaking landscapes, rich culture, and unique experiences without tourist crowds.',
      author: 'Emily Clark',
    },
    {
      withpopular: true,
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      category: 'Travel',
      title: 'Top 5 Hidden Gems in Europe',
      para: 'Discover lesser-known European destinations offering breathtaking landscapes, rich culture, and unique experiences without tourist crowds.',
      author: 'Emily Clark',
    },
  ]

  return (
    <div className="mt-7 ">
      <h2 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl">Latest</h2>
      <div className="tohide relative flex flex-row gap-2 h-screen overflow-y-scroll scroll-smooth mt-2">
        <div className="flex flex-col gap-8 mt-4">
          {blogPosts.map((d: props, i: number) => {
            return <Blogcard key={i} {...{ ...d, withpopular: false }} />
          })}
        </div>
        <div className="hidden md:flex flex-col divide-y-2 w-4/12 sticky left-0 top-0">
          <h2>Categories</h2>

          <Blogbar />
        </div>
      </div>
      <div className="border-2 mt-4 h-10">For Pagination</div>
    </div>
  )
}
