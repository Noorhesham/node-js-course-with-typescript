"use client";
import { tech } from "@/constants";
import Image from "next/image";
import React, { useEffect } from "react";
import Bubble from "./Bubble";
import { useSmoothScroll } from "../context/SmoothScrollProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
const bgSound = "/Bubble Sound Effect.mp3";
gsap.registerPlugin(ScrollTrigger);
const TechStack = () => {
  const { locoScroll } = useSmoothScroll();
  useEffect(() => {
    const audio = new Audio(bgSound);

    if (locoScroll) {
      ScrollTrigger.create({
        trigger: ".tech",
        start: "top top",
        end: "+=" + window.innerHeight * 2,
        scroller: ".main-container",
        scrub: true,
        pin: true,
        onEnter: () => {
          console.log("enter");
          audio.play();
        },
      });
      const tl = gsap.timeline();
      tl.to(".boat", {
        x: -800,
        filter: "blur(4px)",
        scrollTrigger: {
          trigger: ".boat",

          start: "top top",
          end: "+=" + window.innerHeight * 2,
          scroller: ".main-container",
          scrub: true,
        },
      })
        .fromTo(
          ".dive-title1",
          { x: 0 },
          {
            x: 800,
            filter: "blur(4px)",
            duration: 1,
            scrollTrigger: {
              trigger: ".dive-title1",
              start: "top top",
              end: "+=" + window.innerHeight * 2,
              scrub: true,
              scroller: ".main-container",
              markers: true,
            },
          }
        )
        .fromTo(
          ".stack",
          { opacity: 0, y: -100, filter: "blur(10px)" },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".stack",
              start: "top top",
              end: "+=" + window.innerHeight * 1.3,
              scrub: true,
              scroller: ".main-container",
              markers: true,
            },
          }
        );
    }
  }, [locoScroll]);
  return (
    <section
      style={{
        backgroundImage: "url(/techwater.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="tech relative flex  justify-center  h-screen"
    >
      <div className="boat z-20 w-full h-64 absolute top-40 -right-64">
        <Image alt="boat" fill src="/boat.svg" />
      </div>
      <h1 className="text-6xl text-nowrap z-10 dive-title1 absolute w-full left-10 top-32 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
        SAIL INTO THE DEPTHS OF MY TECH ODYSSEY!
      </h1>

      <Bubble />
      <div className="flex gap-1 absolute left-1/2 -translate-x-1/2 bottom-10 mt-5 lg:gap-5">
        <div className="flex mt-5 flex-row mx-auto gap-5">
          {tech.map((item, i) => (
            <div
              style={{ marginTop: `${i * 5 - 2.5 * Math.random()}px` }}
              className="lg:w-24  opacity-90 floating lg:h-24 md:w-10 md:h-10 stack w-12 h-12 first:translate-y-3 even:-translate-y-3 odd:translate-y-4 last:translate-y-6"
              key={i}
            >
              <Image alt={item} fill className=" object-contain" src={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
