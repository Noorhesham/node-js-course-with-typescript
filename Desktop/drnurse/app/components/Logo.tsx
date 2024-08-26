import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ size = "sm",isdark }: { size?: "sm" | "lg",isdark?:boolean }) => {
  return (
    <Link href={"/"} className={` relative ${size === "sm" ? "w-28 h-28" : "w-52 h-52"}`}>
     {isdark?<Image src={"/logoNurseDark.svg"} className=" object-contain" alt="logo" fill />: <Image src={"/logoNurse.svg"} className=" object-contain" alt="logo" fill />}
    </Link>
  );
};

export default Logo;
