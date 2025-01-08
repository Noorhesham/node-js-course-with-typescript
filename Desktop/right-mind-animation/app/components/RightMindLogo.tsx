import Image from "next/image";
import React from "react";

const RightMindLogo = () => {
  return (
    <div className=" relative Z-[60] w-32 h-14">
      <Image src="/logo.png" className=" object-contain" alt="logo" fill />
    </div>
  );
};

export default RightMindLogo;
