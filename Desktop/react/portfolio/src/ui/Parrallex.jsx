import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
function Parrallex() {
  const variants = {
    initial: { x: -10, opacity: 0, y: 10 },
    animate: { x: 0, y: 0, opacity: 1, transition: { duration: 1, staggerChildren: 0.1 } },
  };
  const ref = useRef();
  const ref2 = useRef();
  const isInView = useInView(ref2, { margin: '-100px' }); //we give it a ref to check if it is in view or not
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div ref={ref} className=" bg-slate-950 h-[100vh] lg:h-screen flex items-center relative flex-col overflow-hidden ">
      <motion.h1 style={{ y: yBg }} className=" m-auto ">
        About
      </motion.h1>
      <motion.div className="mountains lg:block hidden"></motion.div>
      <motion.div style={{ y: yBg }} className="planets"></motion.div>
      <motion.div style={{ x: yBg }} className="stars"></motion.div>
      <motion.div
        ref={ref2}
        className="lg:flex-row flex flex-col   items-center gap-10 py-6 px-12 z-[2] bg-slate-950 absolute rounded-lg top-0 lg:top-[10%]  "
        initial="initial"
        animate={isInView && 'animate'}
        variants={variants}
      >
        <motion.div className=" border-b-2 lg:border-r-2 border-pink-600" variants={variants}>
          <img src="/noor.jpg" className=" flex-1 w-[25rem] md:w-[33rem] rounded-md" alt="" />
        </motion.div>
        <motion.div
          className=" flex flex-col lg:gap-10 justify-center flex-[40%] text-white md:w-[54rem] lg:py-5 lg:px-10 "
          variants={variants}
        >
          <h2 className=" font-semibold text-pink-500 text-center lg:text-justify">My intro</h2>
          <p className="text-white text-xl text-center md:text-2xl leading-loose md:leading-10 lg:text-left ">
            Greetings! I'm a Full Stack Developer specializing in React, Next.js, Tailwind CSS, and TypeScript. With a track record of
            crafting robust and scalable web applications, I've recently expanded my skill set to include backend technologies like Node.js,
            MongoDB, and Express. My passion lies in creating impactful digital solutions, and I'm committed to pushing the boundaries of
            innovation. Join me on this journey as I continue to build, learn, and shape the future of web development.
          </p>
          <ul className=" capitalize flex flex-col mt-10 lg:mt-0  text-3xl lg:text-2xl text-xl  ">
            <li className="flex items-center mb-4 gap-4   text-pink-500 font-semibold">
              <MdEmail />
              email : <p className=" font-normal lowercase text-gray-200"> noordragon2004@gmail.com</p>
            </li>
            <li className="flex items-center justify-start   gap-4 text-pink-500 font-semibold">
              <FaPhone />
              phone : <p className=" font-normal  text-gray-200"> +20 1145838187</p>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Parrallex;
