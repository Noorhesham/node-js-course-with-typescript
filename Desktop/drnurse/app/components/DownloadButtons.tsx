import Image from "next/image";
import Link from "next/link";
import React from "react";

const DownloadButtons = () => {
  return (
    <>
      <Link href={"#"} className="   w-full h-20 relative">
        <Image fill className=" opacity-80 object-contain" src={"/apple.png"} alt="" />
      </Link>
      <Link href={"#"} className="   w-full h-20 relative">
        <Image fill className=" opacity-80 object-contain" src={"/google.png"} alt="" />
      </Link>
    </>
  );
};

export default DownloadButtons;
