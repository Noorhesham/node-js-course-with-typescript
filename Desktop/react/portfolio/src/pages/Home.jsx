import { FaArrowRight, FaLaptopCode } from 'react-icons/fa6';
import { LiaDownloadSolid } from 'react-icons/lia';
import List from '../ui/List';
import { useDark } from '../context/useDarkMode';
import { motion } from 'framer-motion';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useActive } from '../context/useActiveLink';

function Home() {
  const { refs, addRef } = useActive();
  const { isDark } = useDark();

  const variants = {
    initial: { y: 0 },
    hover: { y: -10, opacity: 0.8, transition: 0.5 },
    animate: { x: 0, opacity: 1, transition: { duration: 1 } },
  };
  const skill = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  const [text] = useTypewriter({
    words: ['web developer', 'programmer', 'designer'],
    loop: {},
  });
  return (
    <>
      <section
        ref={(el) => addRef(el)}
        id="home"
        className="lg:h-[85vh]  relative flex-col flex md:flex-row justify-around items-center text-center w-full py-20 px-5 "
      >
        <motion.div style={{ backgroundImage: 'url(/sun.png)' }} className="planets"></motion.div>
        <motion.div className="stars"></motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-start text-start z-10"
        >
          <motion.h1
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent 
             capitalize font-semibold text-[2.5rem]  sm:text-7xl sm:leading-loose mt-12  z-10 "
          >
            <span className=" text-gray-800 dark:text-gray-100">
              <span className=" dark:text-slate-300">Hello, my name is </span>
              <br></br>Noor hesham{' '}
            </span>
            <br></br>
            <span className=" text-gray-800 dark:text-slate-400 ">i am</span> <span className="font-normal ">{text}</span>
            <span className="text-pink-500">
              <Cursor />
            </span>
          </motion.h1>
          <div className="flex-col flex gap-14 md:flex-row items-center justify-center ">
            <motion.a
              href="/Nooreldin-Hesham-FlowCV-Resume-20240224 (1).pdf"
              download="cv"
              className="group flex items-center gap-4 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-5 px-10 text-white
       shadow-xl rounded-full mt-10 text-3xl active:shadow-sm hover:translate-y-[-.5rem] hover:opacity-80 transition-all duration-100"
            >
              Download Cv{' '}
              <LiaDownloadSolid className=" text-violet-700 text-5xl z-[100000]  group-hover:animate-bounce transition-all duration-100" />
            </motion.a>
            <motion.button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-2 text-white
       shadow-xl rounded-lg mt-10 text-3xl active:shadow-sm hover:translate-y-[-.5rem] hover:opacity-80 transition-all duration-100"
            >
              <a href="#projects" className=" flex items-center gap-4 bg-white rounded-lg px-3 py-4 font-semibold text-purple-900">
                View my work <FaArrowRight className=" text-purple-600 anm" />{' '}
              </a>
            </motion.button>
          </div>
        </motion.div>
        <motion.div className=" flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          {isDark ? (
            <img
              src="/batman-seo.jpg"
              className=" w-[15rem] z-10 sm:w-[33rem] rounded-md shadow-xl mt-14 md:mt-0 -rotate-6 mr-10 relative transition-all duration-200 "
            />
          ) : (
            <img
              src="/photo_2023-12-14_21-21-17.jpg"
              className=" w-[15rem] z-10 sm:w-[26rem] rounded-md shadow-xl mt-14 md:mt-0 -rotate-6 mr-10 relative transition-all duration-200 "
            />
          )}
        </motion.div>
      </section>
      <section className=" relative flex bg-white dark:bg-slate-800 py-12 dark:text-gray-100 px-16 justify-around items-center flex-col lg:flex-row">
        <List />
        <h2
          className=" capitalize text-5xl  relative text-gray-800 text-center dark:text-gray-100
          after:absolute lg:after:right-[-95%] after:h-1 after:w-[90%] after:bg-pink-700 lg:after:top-[50%]
           after:bottom-[-1rem] after:right-[8%] "
        >
          i mainly use{' '}
        </h2>
        <motion.div initial="initial" whileInView="animate" variants={skill} className=" flex gap-20 flex-col md:flex-row mt-20 ">
          <motion.img variants={skill} src="/js.png" className=" w-[10rem]" alt="" />
          <motion.img variants={skill} src="/react.png" className=" w-[10rem] animate-spin delay-500  " alt="" />
          <motion.img variants={skill} src="/type.png" className=" w-[10rem]  " alt="" />
          <motion.img variants={skill} src="/next-js.svg" className=" w-[10rem]  " alt="" />
          <motion.img variants={skill} src="/tailwind.png" className=" w-[10rem]  " alt="" />
        </motion.div>
      </section>
    </>
  );
}

export default Home;
