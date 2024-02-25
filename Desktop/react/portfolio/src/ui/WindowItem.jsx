import { Link } from 'react-router-dom';
import { useTabs } from '../context/useTabs';
import { motion } from 'framer-motion';

function WindowItem({ name, description, img, gen, id, link }) {
  const { activeTab, TabClick } = useTabs();

  const variants = {
    initial: { y: 0, x: 0, opacity: 0 },
    hidden: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    hover: { opacity: 1, transition: { duration: 1 } },
  };

  const hover = {
    hidden: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} duration={1} className=" relative flex  ">
      <motion.div
        initial="hidden"
        whileInView="animate"
        whileHover="hover"
        variants={variants}
        className="cursor-pointer group relative after:transition-all after:duration-100 flex items-center justify-center flex-col
          after:bg-opacity-0 hover:after:bg-opacity-50  after:rounded-3xl after:bg-pink-500 after:w-full after:h-[100%]  after:absolute after:top-0"
      >
        <motion.h1
          variants={variants}
          className="hidden group-hover:flex z-50  absolute text-center 
           font-semibold capitalize text-white text-5xl animate-fade-up "
        >
          {name}
        </motion.h1>
        <img loading="lazy" src={img} className=" w-[43rem] rounded-3xl " />
        <div className=" flex items-center justify-center absolute top-[70%] left-[19%] mx-auto gap-3 ">
          <Link
            to={`${id}`}
            className="hidden group-hover:flex items-center gap-4 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-3 lg:py-4 lg:px-8 text-white
                  shadow-xl rounded-full text-lg lg:text-2xl active:shadow-sm animate-fade-up "
          >
            show details
          </Link>
          <motion.a
            whileTap={{ scale: 0.85 }}
            href={link}
            target="_blank"
            className="hidden group-hover:flex items-center gap-4 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-3 lg:py-4 lg:px-8 text-white
            shadow-xl rounded-full text-lg lg:text-2xl active:shadow-sm animate-fade-up "
          >
            run demo
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WindowItem;
