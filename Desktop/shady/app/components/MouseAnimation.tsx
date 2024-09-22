"use client";
import Image from "next/image";
import { useRef } from "react";
import { MouseParallax } from "react-just-parallax";

const MouseAnimation = () => {
  const parallaxRef = useRef();
  return (
    <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
      <div className="    h-[34rem] rounded-xl overflow-hidden r relative">
        {/* <AnimatedImage className="overflow-hidden w-[26rem] lg:w-full" /> */}
        <Image alt="بيت العربي الشادي" fill src="/photo_2024-08-21_14-18-20.jpg" className=" object-top object-cover" />
      </div>
    </MouseParallax>
  );
};

export default MouseAnimation;
