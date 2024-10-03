"use client";
import React, { useEffect, useRef } from "react";
import useLocoScroll from "../hooks/useLocoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Lines from "./Lines";
import Image from "next/image";
import Snow from "./Snow";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const [scroll, setScroll] = React.useState(false);
  const container = useRef<null | any>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo([".clip1", ".clip2"], { y: -500, stagger: 0.2, duration: 1 }, { y: 0, stagger: 0.2, duration: 1 }).fromTo(
      ".clip3",
      { y: 500 },
      { y: 0, duration: 1 },
      "<"
    );
    tl.fromTo("#lines", { y: 70 }, { y: 0, duration: 0.4 }).fromTo(
      ".title",
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
        ease: "power2.inOut",
        stagger: 0.5,
        duration: 1,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.5,
        duration: 1,
      }
    );
    setTimeout(() => {
      setScroll(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!scroll) return;

    // Pin the container and allow scrolling effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: () => "+=" + container.current.offsetHeight,
        scrub: 1.5,
        scroller: ".main-container",
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // Apply animations for different clips
    tl.to(".clip1", {
      clipPath: "polygon(100% 17%, 0 1.6%, 0 41.6%, 100% 55%)",
      scrollTrigger: {
        trigger: ".clip1",
        start: "top 100px",
        end: "top center",
        scrub: 1,
        scroller: ".main-container",
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      ".char",
      { opacity: 0, y: 100, stagger: 0.1, ease: "power2.inOut", rotateX: -90 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, rotateX: 0 }
    );
    const scrollTriggerClip = {
      trigger: ".clip1",
      start: "top 100px",
      end: "top center",
      scrub: 1,
      scroller: ".main-container",
      invalidateOnRefresh: true,
    };
    const tl2 = gsap.timeline({
      scrollTrigger: { ...scrollTriggerClip },
    });
    tl2.to(".clip2", {
      rotate: "180deg",
      top: "73px",
      scrollTrigger: { ...scrollTriggerClip },
    });
    tl2.to(".clip3", {
      width: 0,
      scrollTrigger: { ...scrollTriggerClip },
      delay: 1,
    });

    tl2
      .to(
        ".lines",
        {
          top: -125,
          scrollTrigger: { ...scrollTriggerClip },
        },
        "<"
      )
      .to(
        ".intro-lines__item--1",
        {
          y: 100,
          stagger: 0.2,
          scrollTrigger: { ...scrollTriggerClip },
        },
        "<"
      )
      .to(
        ".intro-lines__item--2",
        {
          y: -250,
          stagger: 0.2,
          scrollTrigger: { ...scrollTriggerClip },
        },
        "<"
      );
    tl2
      .to(".title", {
        opacity: 0,
        y: 100,
        rotateX: -90,
      })
      .fromTo(
        ".title2",
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        { opacity: 1, y: 0, rotateX: 0, duration: 1 }
      );
  }, [scroll]);

  return (
    <main className="container section flex flex-col h-screen relative" ref={container}>
      <div className="w-full flex top-[20%] lg:top-0 absolute z-30 h-full">
        <div className="relative h-full w-1/2">
          <Lines id="lines" className="absolute right-[-3rem] top-0 z-30" />
          <div
            className="bg-snow6 clip3 w-[60%] h-96 lg:h-full absolute top-0"
            style={{ clipPath: "polygon(0 0, 100% 28%, 100% 68%, 0 43%)" }}
          ></div>
          <div
            className="clip1 bg-snow6 w-[40%] right-0 h-96 lg:h-full absolute top-[6rem] lg:top-48"
            style={{ clipPath: "polygon(100% 17%, 0 42%, 0 73%, 100% 49%)" }}
          ></div>
        </div>
        <div className="relative h-full w-1/2">
          <div
            className="bg-snow6 w-full h-96 clip2 lg:h-full absolute top-0"
            style={{ clipPath: "polygon(0 0, 100% 28%, 100% 68%, 0 43%)" }}
          ></div>
        </div>
      </div>

      <div className=" z-50 top-40 absolute right-10 text-5xl text-white font-bold">
        <h1 className=" title">Hi , I'm Noor Hesham</h1>
        <h1 className=" title">Mern Stack Developer</h1>
      </div>
      <div className=" z-50 top-80 absolute left-10 text-5xl text-violet-100 font-bold">
        <h1 className=" title2 opacity-0">Why Would You Hire Me ?</h1>
        <h1 className=" title2 opacity-0">Lets Swing Into My Experience</h1>
      </div>
      <section className="intro section1 z-10 relative w-full h-full min-w-[100vw] min-h-screen">
        <div className="absolute inset-0 w-full h-full">
          <video muted loop autoPlay className="w-full object-cover h-full">
            <source src="/spider.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </main>
  );
};

export default Intro;
