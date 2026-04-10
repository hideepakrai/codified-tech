type props = {
  withpopular: boolean
  image: string
  category: string
  title: string
  para: string
  author: string
}

export const Blogcard = ({ withpopular }: props) => {
  return (
    <div
      className={`${withpopular ? 'flex flex-col gap-2 md:flex-col md:gap-7' : 'flex flex-col gap-2 md:flex-row md:gap-7'} `}
    >
      <img
        className={`${withpopular ? 'rounded-xl w-full object-cover' : 'rounded-xl w-full md:w-1/2 object-cover'} h-60 lg:h-80`}
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="blogimage"
      />
      <div className={`${withpopular ? 'flex flex-col gap-3' : 'flex flex-col gap-3 md:w-1/2'}`}>
        <h4 className="text-sm text-gray-600">Category</h4>
        <h2 className="text-2xl sm:text-3xl lg-text-4xl font-bold">Name of the Blog</h2>
        <p className="text-[14px] font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam distinctio accusantium
          odit voluptatum numquam placeat dignissimos aspernatur quidem molestias cupiditate....
        </p>
        <h4 className="text-[13px]">Author Name</h4>
      </div>
    </div>
  )
}
