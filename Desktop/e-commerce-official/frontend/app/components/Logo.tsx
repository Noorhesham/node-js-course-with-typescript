import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={`${className} w-16 rounded-full h-16 sm:w-16 sm:h-16  relative`}>
      <Image src="/logo1.jpg" className=" absolute rounded-full object-cover" alt="logo" fill />
    </Link>
  );
};

export default Logo;
