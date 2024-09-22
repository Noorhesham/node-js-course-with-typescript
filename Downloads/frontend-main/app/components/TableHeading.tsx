import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const TableHeading = ({
  className,
  image,
  title,
  paragraph,
  back,
}: {
  className?: string;
  image?: string;
  title: string;
  paragraph: string;
  back?: string;
}) => {
  return (
    <div className={`${className} w-full flex   justify-between md:flex-row flex-col  items-start gap-3 px-5 py-3 `}>
      {/* <div className=" w-10 h-10 relative">
        <Image className=" object-contain lg:object-cover" fill src={image} alt={title} />
      </div> */}
      <div className=" flex lg:flex-row flex-col items-start lg:items-center">
        <h1 className=" text-main text-xl lg:text-3xl font-[700]">{title}</h1>
      </div>{" "}
      <div className=" items-start flex-col gap-2 flex">
        <p className=" border-l-[3px] lg:ml-4 pl-2 max-w-sm text-sm border-input text-gray-800 ">{paragraph}</p>
        <Link href={back ? back : "/dashboard"} className=" flex items-center  text-xs gap-2 ">
          <div className=" p-1 rounded-xl border border-gray-800 ml-auto">
            <MdKeyboardArrowRight className="h-7 w-7 ml-auto" />
          </div>
          <p className=" text-sm ">العودة للرئيسية</p>
        </Link>
      </div>
    </div>
  );
};

export default TableHeading;
