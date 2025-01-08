"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { ScrollTrigger } from "gsap/all";
const items = [
  {
    image: "/Rectangle 2980.png",
    desc: `At Right Mind, we aim to achieve a real estate revolution driven by innovation, creating integrated communities that enhance quality of life and add long-term value to investments.
To become the top choice in the real estate market.`,
    date: "01.11",
    month: "nov",
  },
  {
    image: "/Rectangle 2980 (1).png",
    desc: `At Right Mind, we aim to achieve a real estate revolution driven by innovation, creating integrated communities that enhance quality of life and add long-term value to investments.
    To become the top choice in the real estate market.`,
    date: "01.11",
    month: "nov",
  },
  {
    image: "/Rectangle 2980 (1).png",
    desc: `At Right Mind, we aim to achieve a real estate revolution driven by innovation, creating integrated communities that enhance quality of life and add long-term value to investments.
    To become the top choice in the real estate market.`,
    date: "01.11",
    month: "nov",
  },
  {
    image: "/Rectangle 2980.png",
    desc: `At Right Mind, we aim to achieve a real estate revolution driven by innovation, creating integrated communities that enhance quality of life and add long-term value to investments.
To become the top choice in the real estate market.`,
    date: "01.11",
    month: "nov",
  },
];
const XSldier = () => {
  const { isLoading } = useLoading();
  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".screenx",
              start:()=> "top top",
              scrub: true,
              scroller: ".main-container",
              end: "+=2000",
              pin: true,
            },
          })
          .to(".slideshow3", { xPercent: -150 })
          .to(".right-mind ", { xPercent: -20 }, "<");
      });
      media.add("(max-width: 768px)", () => {
        const slides = gsap.utils.toArray(".slidee");
        slides.forEach((slide: any, index) => {
          ScrollTrigger.create({
            trigger: slide,
            start: "top 40%",
            scrub: true,
            scroller: ".main-container",
            animation: gsap.to(slide.querySelector(".slideimg"), {
              scale: 1.2,
            }),
          });
        });
      });
    });
    return () => ctx.revert();
  }, [isLoading]);
  return (
    <section className=" flex lg:flex-row flex-col  lg:h-[80vh] screenx bg-white  items-center w-full relative">
      <h2 className=" text-[10vw] z-[51] -top-10 right-mind  text-orange-600   lg:absolute left-80">{"Our News"}.</h2>{" "}
      <MaxWidthWrapper className=" flex lg:flex-row flex-col slideshow3  z-[49]  w-full  top-40  gap-5 lg:gap-10 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="slidee w-full h-full" key={index}>
            <div
              key={index}
              style={{ zIndex: index % 2 === 0 ? "52" : "48" }}
              className="  overflow-hidden w-full lg:w-[50vw] relative  h-64 "
            >
              <Image fill className="slideimg object-cover" src={items[index].image} alt="" />
            </div>
            <div className=" circle2 w-14 h-14 absolute flex top-1/2 -translate-y-1/2  justify-center items-center z-[55] rounded-full bg-main left-1/2 -translate-x-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.152 6.13025H15.0425V9.26675H9.152V15.3867H5.939V9.26675H0.125V6.13025H5.939V0.125H9.152V6.13025Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex lg:flex-row flex-col w-full items-center gap-8 justify-between py-3">
              <div className="flex  items-start lg:flex-row flex-col w-full lg:items-center">
                <p className="flex uppercase items-center font-normal text-black text-2xl">
                  <span className=" text-6xl  m-1 font-normal">{items[index].date} </span>
                  {items[index].month}
                </p>
                <p className=" px-5 max-w-lg ml-auto w-fit self-end text-gray-900 text-base">{items[index].desc}</p>
              </div>
            </div>
          </div>
        ))}
      </MaxWidthWrapper>
    </section>
  );
};

export default XSldier;
