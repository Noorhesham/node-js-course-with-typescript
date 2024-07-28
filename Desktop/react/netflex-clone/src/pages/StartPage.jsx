import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

function StartPage() {
    return (
        <motion.div className="flex flex-col items-center gap-5  justify-center " initial={{opacity:0,y:200}} animate={{opacity:1,y:0}} transition={{duration:1}}>
               <h1 className="text-white text-6xl text-center font-bold">
                Countless movies, TV shows, and more
                </h1>
                <p className=" text-3xl">Watch wherever you are. You can cancel whenever you want.</p>
                <p className=" text-3xl font-semibold">Ready? Log in to join us.</p>
        <div className="flex gap-5">
            <Link to="/main" className="py-5 px-10 text-2xl bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-100
             mt-4 " >Browse as a guest </Link>
        <Link to="/start/login" className="py-5 px-10 text-3xl bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-100
         mt-4 " >Get started <IoIosArrowForward/></Link>
        </div>
        </motion.div>
    )
}

export default StartPage
