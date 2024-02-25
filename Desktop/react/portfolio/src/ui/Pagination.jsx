import {motion} from "framer-motion"
function Pagination({i,onClick,active}){
    
    return <motion.div onClick={()=>onClick(i)}  initial={{y:20,opacity:0}}
    whileInView={{y:0,opacity:1}}
     className={`cursor-pointer  hover:bg-pink-500 transition-all duration-100 py-4 px-8  text-gray-800 dark:text-gray-100
     ${active?"bg-pink-600":"bg-gray-200 dark:bg-slate-800"} text-gray-100`}>
        {i}
    </motion.div>
}
export default Pagination