import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className=" relative m-auto h-80 w-80 ">
      <Image src="/study-focused.gif" className=" object-cover" layout="fill" alt="loader" />
    </div>
  );
};

export default Loader;
