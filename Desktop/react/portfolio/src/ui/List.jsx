import { BiBarChartAlt } from "react-icons/bi";
import { GiBurningPassion } from "react-icons/gi";
import { FaArrowRight, FaLaptopCode } from "react-icons/fa6";
import {motion} from 'framer-motion'
function List() {
  const variants={initial:{opacity:0,y:200},animate:{opacity:1,y:0,transition:{staggerChildren:.4,}},}
  return (
    <motion.div className=" m-auto justify-center hidden lg:flex items-center absolute top-[-7rem]  gap-5 my-10  py-5 px-14 "
    initial='initial' animate='animate' variants={variants} >
      <motion.span variants={variants} 
        className=" shadow-md flex items-center gap-4 bg-white dark:bg-slate-900  dark:text-gray-100
         py-2 px-10 text-3xl  rounded-full  "
      >
        <BiBarChartAlt className="z-50 bg-pink-500 rounded-full p-3 text-gray-200 dark:text-gray-200 text-[5rem]" />
        <span className=" text-pink-400 dark:text-pink-400 font-bold">2</span> years in the field
      </motion.span>
      <motion.span variants={variants} 
      className="shadow-md flex items-center gap-3 bg-white dark:bg-slate-900 dark:text-gray-100 py-2 px-10 rounded-full  text-3xl   ">
        <FaLaptopCode  className="z-50 bg-pink-500 rounded-full p-3 text-gray-200 dark:text-gray-200 text-[5rem]"/>
        <span className=" text-pink-400 dark:text-pink-400 font-bold">Huge</span> react & js
        projects
      </motion.span>
      <motion.span variants={variants} 
      className="shadow-md  flex items-center gap-4 bg-white dark:bg-slate-900 dark:text-gray-100 py-2 px-6 rounded-full  text-3xl ">
        <GiBurningPassion  className=" z-50 bg-pink-500 rounded-full p-3 text-gray-200 dark:text-gray-200 text-[5rem]" />
        <span className=" text-pink-400 dark:text-pink-400 font-bold">Passion</span> to the field
      </motion.span>
    </motion.div>
  );
}

export default List;
