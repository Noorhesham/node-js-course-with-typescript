"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import useLocoScroll from "../hooks/useLocoScroll";
import { useGSAP } from "@gsap/react";
import Snow from "../components/Snow";

const page = () => {
  useLocoScroll(true);

  const container = useRef<null | any>(null);
  useGSAP(() => {
    const sections = gsap.utils.toArray(".section");
    gsap.to(sections, {
      y: (sections.length - 1) * -100,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: () => "+=" + container.current.offsetHeight + 2000,
        scrub: 1,
        scroller: ".main-container", // Custom scroller if using LocoScroll
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    });
  }, []);

  return (
    <div ref={container} className=" min-h-screen w-full relative">
      {/* <div className="flex items-center">
        <div onClick={onClickGood} className="circle bg-red-500 z-50 w-80 h-80 rounded-full  relative"></div>
        <div onClick={onClickGood} className="circle bg-red-500 z-50 w-80 h-80 rounded-full  relative"></div>
        <div onClick={onClickGood} className="circle bg-red-500 z-50 w-80 h-80 rounded-full  relative"></div>
        <div onClick={onClickGood} className="circle bg-red-500 z-50 w-80 h-80 rounded-full  relative"></div>
        <div onClick={onClickGood} className="circle bg-red-500 z-50 w-80 h-80 rounded-full  relative"></div>
        </div> */}
      <section className="intro section section1 relative w-full  min-w-[100vw] h-screen">
        <div className="absolute inset-0 w-full h-full">
          <video muted loop autoPlay className="w-full object-cover h-full">
            <source src="/spider.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      <Snow />
    </div>
  );
};

export default page;
