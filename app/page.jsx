import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Our
        <br className="max-md:hidden"/> 
        <span className="purple_gradient text-center"> Secrets</span>
      </h1>
      <p className="desc text-center">
      This is a place where you can share your thoughts and ideas with the world.
      </p>

      <Feed />
    </section>
  )
}

export default Home