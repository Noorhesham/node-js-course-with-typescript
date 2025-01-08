"use client";
import Image from "next/image";

import Paragraph from "./Paragraph";
import { useSmoothScroll } from "../context/ScrollProviderContext";
import { useEffect } from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const Success = () => {
  return (
    <section className=" lg:h-screen relative z-[99] bg-white grid grid-cols-1 lg:grid-cols-2 items-center ">
      <MaxWidthWrapper className="  col-span-1  m-auto ">
        <div className="flex gap-2 items-center">
          <h2 className=" !text-main  font-extrabold text-[10vw]">20+</h2>
          <div className="flex flex-col">
            <Paragraph
              text2={"text-black"}
              className=" max-w-md !font-extrabold  !text-main  text-2xl"
              text=" YEARS OF SUCCESSFUL WORK <br> IN Real Estate Developments"
            />
          </div>
        </div>
        <div className=" mt-10 grid gap-y-10 grid-cols-2">
          <div className=" flex !text-black text-2xl gap-1  flex-col-reverse lg:flex-col  items-center lg:items-start ">
            <p>Areas in Egypt</p>
            <Paragraph text="+4" height="h-20" className=" !text-main text-[5vw] font-extrabold" />
          </div>
          <div className=" flex !text-black text-2xl gap-1  flex-col-reverse lg:flex-col  items-center lg:items-start ">
            <p>Areas in Egypt</p>
            <Paragraph text="+4" height="h-20" className=" !text-main text-[5vw] font-extrabold" />
          </div>
          <div className=" flex !text-black text-2xl gap-1  flex-col-reverse lg:flex-col  items-center lg:items-start ">
            <p>Areas in Egypt</p>
            <Paragraph text="+4" height="h-20" className=" !text-main text-[5vw] font-extrabold" />
          </div>
          <div className=" flex !text-black text-2xl gap-1  flex-col-reverse lg:flex-col  items-center lg:items-start ">
            <p>Areas in Egypt</p>
            <Paragraph text="+4" height="h-20" className=" !text-main text-[5vw] font-extrabold" />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className=" h-full relative  w-full">
        <Image alt="" src={"/Rectangle 2979.png"} fill className=" object-cover" />
      </div>
    </section>
  );
};

export default Success;
