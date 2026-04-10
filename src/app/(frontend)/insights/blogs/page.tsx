import { Blogbar } from '@/components/insights/blogs/Blogbar'
import { Latestblog } from '@/components/insights/blogs/Latestblog'
import { PopularBlog } from '@/components/insights/blogs/Popularblog'

const BlogPage = async () => {
  return (
    <section className="relative text-white py-24 px-6 md:px-16">
      <Blogbar />
      <PopularBlog />
      <Latestblog />
    </section>
  )
}

export default BlogPage
