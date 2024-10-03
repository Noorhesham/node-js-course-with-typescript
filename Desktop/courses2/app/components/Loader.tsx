import Image from "next/image";
import React from "react";
import MotionItem from "./defaults/MotionItem";

const Loader = () => {
  return (
    <MotionItem
      initial={{ y: 0 }}
      animate={{ y: -20 }}
      transition={{
        duration: 0.5,
        repeat: Infinity, 
        ease: "easeInOut",
        repeatType: "reverse",
      }}
      className=" relative m-auto h-80 w-80 "
    >
      <Image src="/loader.png" className=" object-cover" fill alt="loader" />
    </MotionItem>
  );
};

export default Loader;
