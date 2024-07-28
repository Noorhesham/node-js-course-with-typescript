import{motion} from "framer-motion";
const animations={
    initial:{opacity:0,y:100},animate:{opacity:1,y:0},exit:{opacity:0,y:-100}
}
function AnimatedPage({children}) {
    return (
        <motion.div className=" overflow-hidden" variants={animations} initial="initial" animate="animate" exit="exit" transition={{duration:1}}>
            {children}
        </motion.div>
    )
}

export default AnimatedPage
