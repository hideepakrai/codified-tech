import { Blogcard } from './Blogcard'

type props = {
  withpopular: boolean
  image: string
  category: string
  title: string
  para: string
  author: string
}

export const PopularBlog = () => {
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
  ]

  return (
    <div className="mt-7 flex flex-col gap-2">
      <div>
        <Blogcard {...{ ...blogPosts[0], withpopular: false }} />
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        {blogPosts.map((d: props, i: number) => {
          return <Blogcard key={i} {...d} />
        })}
      </div>
    </div>
  )
}
