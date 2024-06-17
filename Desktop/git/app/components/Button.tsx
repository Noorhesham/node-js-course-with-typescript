import Link from "next/link";
import React from "react";

const Button = ({className,text,color,link}:{className?:string,text:string,color?:string,link?:string}) => {
  return (
    <div className={className||""}>
      <button className=" px-4 lg:px-8 py-2 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
        <div className="absolute -bottom-2 -right-2 bg-[#75a0f7] h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
        <Link href={link||"#"} className="relative">{text}</Link>
      </button>
    </div>
  );
};

export default Button;
