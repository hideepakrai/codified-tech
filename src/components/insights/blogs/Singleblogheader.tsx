export const Singleblogheader = () => {
  return (
    <div className="mt-7 bg-white text-black md:h-[calc(100vh-200px)] flex flex-row box-border py-24 px-6 md:px-16 gap-2">
      <div className="flex flex-col justify-center grow-1">
        <h3 className="text-[14px]">Category Name</h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dignissimos excepturi
          delectus nihil totam? Laboriosam.
        </h2>
        <div className="flex justify-between items-center md:justify-start md:gap-3 font-semibold">
          <span>Author Name</span>
          <span className="size-2 bg-black rounded-full"></span>
          <span>Date Published</span>
        </div>
      </div>
      <img
        src="https://plus.unsplash.com/premium_photo-1722209813944-a4ee13b7bfd8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="blog header"
        className="hidden md:block w-4/6 max-w-5xl h-90 object-cover self-center rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out hover:scale-105"
      />
    </div>
  )
}
