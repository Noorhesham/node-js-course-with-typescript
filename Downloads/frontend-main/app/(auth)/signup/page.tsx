"use client";
import Image from "next/image";
import Signup from "@/app/components/Signup";
import MotionItem from "@/app/components/defaults/MotionItem";

const Page = () => {
  return (
    <section className=" flex items-stretch ">
      <Signup />
      <div
        style={{
          backgroundImage: "url(/10558814.jpg)",
          backgroundSize: "cover",

          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className=" hidden md:block md:w-[40%] lg:w-[60%]  min-h-full relative"
      />
    </section>
  );
};

export default Page;
