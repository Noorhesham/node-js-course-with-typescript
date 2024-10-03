"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MotionItem from "./defaults/MotionItem";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";

const Empty = ({ message }: { message?: string }) => {
  return (
    <MaxWidthWrapper className="  mx-auto col-span-full flex flex-col text-lg lg:text-xl justify-center items-center">
      <p>sorry ! the content you are looking for does not exist</p>
      <Link className=" text-blue-500 duration-150 hover:underline  text-center my-2" href="/">
        Reset
      </Link>
      <MotionItem
        nohover
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 50, 0, -50, 0], // Moves in a circular path
          y: [0, -50, 0, 50, 0], // Complements x to create rounded motion
        }}
        transition={{
          duration: 6, // Duration for one complete circular motion
          repeat: Infinity, // Repeat forever
          ease: "easeInOut", // Smooth in and out easing
        }}
        className=" mt-10 w-full h-96 relative"
      >
        <Image src="/emptycourse.png" fill alt="404" className=" object-contain" />
      </MotionItem>
    </MaxWidthWrapper>
  );
};

export default Empty;
