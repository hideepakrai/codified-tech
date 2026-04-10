import { Singleblogheader } from '@/components/insights/blogs/Singleblogheader'
import { SingleblogText } from '@/components/insights/blogs/SingleblogText'

const Singleblog = async () => {
  return (
    <section className="relative ">
      <Singleblogheader />
      <SingleblogText />
    </section>
  )
}

export default Singleblog
