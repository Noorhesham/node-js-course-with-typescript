import { useActive } from "../context/useActiveLink"
import Parrallex from "../ui/Parrallex"

function About() {
  const{refs,addRef}=useActive()
    return (
        <section ref={el=>addRef(el)} id="about">
                  <h1 className=" capitalize text-center my-20 mt-24 text-7xl font-semibold text-violet-700 dark:text-gray-100 relative
            after:absolute lg:after:w-[20%] after:h-1 after:top-[50%] after:bg-pink-600 after:right-[20%]
            before:absolute lg:before:w-[20%] before:h-1 before:top-[50%] before:bg-pink-600 before:mr-2 before:left-[20%]">
                about me
            </h1>
            
          <Parrallex/>
          
        </section>
    )
}

export default About
