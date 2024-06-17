import Image from "next/image";
import { motion } from "framer-motion";

const Slide = ({ image, text }: { image: string; text: string }) => {
  return (
    <div>
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: -50 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className=" hidden md:flex flex-col items-center w-full h-full p-20 pb-0 "
      >
        <Image src={`${image}`} width={500} height={500} alt="" />
        <p className="  leading-8 font-normal text-gray-50 text-xl my-3">{text}</p>
      </motion.div>
    </div>
  );
};

export default Slide;
