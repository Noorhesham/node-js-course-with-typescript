"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import gsap from "gsap";
import { MotionPathHelper, MotionPathPlugin, ScrollTrigger } from "gsap/all";
import { useSmoothScroll } from "../context/SmoothScrollProvider";
import { splitStringUsingRegex } from "@/lib/utils";
import TypeWriter from "./TypeWriter";
import AnimatedImage from "./AnimatedImage";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import SwiperCards from "./SwiperCards";
import { JOBS } from "@/constants";
import CardMeteors from "@/components/CardMeteors";
// STARTED BY CS 50 WITH A LONG JOURNY OF STUDY
// CRRUNTLY OWRKING AS FRONTEND AT RIGHTMIND
// YOUTUBE CHANNEL DEEP DIVES INTO NEXT JS
// FREELANCING IN WEEK ENDS
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
const Space = () => {
  const { locoScroll } = useSmoothScroll();

  useEffect(() => {
    if (locoScroll) {
      const ctx = gsap.context(() => {
        const tl0 = gsap.timeline();
        tl0
          .fromTo(
            ".char",
            { opacity: 0, y: 100, stagger: 0.1, ease: "power2.inOut", rotateX: -90 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, rotateX: 0 }
          )
          .fromTo(
            ".boi",
            { rotate: 45, y: 100, opacity: 0 },
            {
              rotate: 0,
              y: 0,
              opacity: 1,
              duration: 0.4,
            }
          )
          .fromTo(".ship", { opacity: 0, y: 100 }, { opacity: 1, y: 0 })
          .from(
            ".ground",
            {
              y: 400,
              duration: 0.5,
            },
            "<-"
          )

          .fromTo(
            ".earth",
            {
              rotate: "-360",
              x: "-500",
              duration: 1,
            },
            {
              rotate: "0",
              x: "0",
              duration: 0.5,
            }
          )
          .fromTo(
            ".planet",
            {
              rotate: "-360",
              x: "500",
              duration: 0.5,
            },
            {
              rotate: "0",
              x: "0",
              duration: 0.5,
            }
          );

        //pinning
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".spacebg",
            start: "top top",
            end: "+=" + window.innerHeight * 5,
            scrub: true,
            scroller: ".main-container",
            pin: ".spacebg",
          },
        });
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".spacebg",
            start: window.innerHeight - 300,
            end: "+=" + window.innerHeight * 3,
            scrub: true,

            scroller: ".main-container",
          },
        });
        tl2
          .from(".mountain", {
            y: 400,
            duration: 1,
            opacity: 1,
          })
          .to(".title", {
            rotate: 90,
            x: -500,
            scale: 0.8,
            y: -20,
          })
          .fromTo(
            ".title2",
            {
              x: 500,
              opacity: 0,
              rotate: 90,
            },
            { x: 0, opacity: 1, rotate: 0 }
          )
          .to(".boi", { x: 400, y: -150 }, "<-")
          .to(".title", { x: -300 })
          .to(".title2", {
            rotate: 90,
            x: -500,
            scale: 0.8,
            y: 80,
          })

          .to(".title", {
            rotate: 0,
            x: 0,
            y: -20,
          })
          .to(
            ".title2",
            {
              rotate: 0,
              x: 0,
            },
            "<-"
          )

          .to(".title", {
            opacity: 0,
            x: -300,
          })
          .to(
            ".title2",
            {
              opacity: 0,
              x: -300,
            },
            "<-"
          )
          .fromTo(
            ".write",
            {
              y: 350,
              opacity: 0,
            },
            {
              y: -20,
              opacity: 1,
            }
          )

          .fromTo(
            ".ship",
            {
              y: 0,
            },
            {
              duration: 4,
              ease: "power1.inOut",

              motionPath: {
                path: [
                  { x: 0, y: 0 },
                  { x: 400, y: -250 },
                  { x: 800, y: 0 },
                  { x: 1500, y: -100 },
                ],
                autoRotate: [45, 45],
                curviness: 1.5,
              },
            },
            "<-"
          )
          .to(".write", {
            rotateX: 90,
            opacity: 0,
          })
          .fromTo(
            ".lastdiv",
            {
              opacity: 0,
              x: -240,
              rotate: 45,
            },
            {
              opacity: 1,
              x: 0,
              rotate: 0,
            },
            "<-"
          );

        const tllast = gsap.timeline({});
        tllast
          .to(".earth", {
            y: 900,
            scrollTrigger: {
              trigger: ".earth",
              start: window.innerHeight * 3,
              end: "+=" + window.innerHeight * 4,
              scrub: true,
              scroller: ".main-container",
              pin: ".earth",
            },
          })
          .to(".planet", {
            y: 600,
            scrollTrigger: {
              trigger: ".planet",
              start: window.innerHeight * 3.2,
              end: "+=" + window.innerHeight * 3.5,
              scrub: true,
              scroller: ".main-container",
              pin: ".planet",
            },
          });

        const tll = gsap.timeline({
          scrollTrigger: {
            trigger: ".spacebg",
            start: window.innerHeight * 3.8,
            end: "+=" + window.innerHeight * 5,
            scrub: true,
            scroller: ".main-container",
          },
        });
        tll
          .fromTo(
            ".boi",
            { y: -150 },
            {
              y: 300,
            }
          )
          .to(".mountain", { y: 400 });
      });

      return () => ctx.revert();
    }
  }, [locoScroll]);
  return (
    <section>
      {" "}
      <section
        className="spacebg overflow-hidden h-full relative"
        style={{
          backgroundImage: "url('/space/2107 (1).svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          backgroundAttachment: "fixed",
        }}
      >
        <div className=" w-full gap-4 flex z-30 flex-col px-10 mt-20 py-5 absolute left-1/2 -translate-x-1/2 justify-center items-center lastdiv">
          <h1
            className="  text-5xl text-center font-extrabold text-white absolute top-10 left-1/2 -translate-x-1/2 
      "
          >
            WHY WOULD YOU <span className=" text-pink-500">HIRE ME ?</span>
            <button className="p-[3px] w-full mt-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="lg:px-8 py-2   bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                HERE IS WHY !
              </div>
            </button>
          </h1>
        </div>
        <div className=" boi w-96 z-[1] absolute h-96  top-[40%] md:top-40 left-1/2 -translate-x-1/2 ">
          <AnimatedImage className=" w-full" data="animate9.json" />
        </div>
        <div className="ship w-96 z-[5]  rounded-full overflow-hidden absolute h-96 top-[47%]  md:top-52 left-[-5.5rem] lg:left-10 ">
          <AnimatedImage className=" w-full " data="animate10.json" />
        </div>
        <h1
          className="section title text-6xl z-30 lg:text-7xl text-center font-extrabold text-white absolute top-24 lg:top-10 left-1/2 -translate-x-1/2 
      "
        >
          {splitStringUsingRegex(" HI , MY NAME IS").map((char, index) => (
            <p className="char inline-block" key={index}>
              {char === " " ? "\u00A0" : char}
            </p>
          ))}
          <span className="char text-pink-500">
            {splitStringUsingRegex("NOOR HESHAM").map((char, index) => (
              <p className="char inline-block" key={index}>
                {char === " " ? "\u00A0" : char}
              </p>
            ))}
          </span>
        </h1>{" "}
        <h1
          className="section title2 text-5xl lg:text-7xl text-center font-extrabold z-30 text-white absolute top-72 lg:top-10 left-1/2 -translate-x-1/2  
      "
        >
          <p className="char capitalize inline-block">MERN STACK </p>
          <span className="char capitalize text-pink-500">DEVELOPER with Next.js</span>
        </h1>
        <div className="write absolute  z-30 top-52 left-1/2 -translate-x-1/2 ">
          <TypeWriter
            words={[
              "3 YEARS  AS FULL STACK WEB DEVELOPER",
              "REMOTELY WORKING AS FRONTEND",
              "FREELANCING IN THE WEEKENDS ",
            ]}
          />
        </div>
        <div
          data-scroll-speed="-10.3"
          className="planet w-72 h-72 md:w-96 lg:w-[27rem] md:h-96 lg:h-[22rem] absolute top-10 -right-16 "
        >
          <Image alt="planet" className=" object-cover" fill src={"/space/planet.png"} />
        </div>
        <div
          data-scroll-speed="-1"
          className="earth w-72 h-72 md:w-96 lg:w-[27rem] md:h-96 lg:h-[22rem] absolute rotate-[18deg] -top-20 -left-32 "
        >
          <Image alt="earth" className=" object-cover" fill src={"/space/earth.png"} />
        </div>
        <div data-scroll-speed="-7" className=" w-full ground h-[39rem] z-20 absolute bottom-0 left-0 ">
          <Image alt="space-ground" className=" object-cover" fill src={"/space/grounnd.svg"} />
        </div>
        <div data-scroll-speed="-2.5" className=" w-full mountain  h-[34rem]  z-10 absolute bottom-5 left-0 mountain1">
          <Image alt="mountains" className=" object-cover" fill src={"/space/mountain.svg"} />
        </div>
      </section>
    </section>
  );
};

export default Space;
