"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import { useSmoothScroll } from "../context/ScrollProviderContext";

const SecondScenePhone = () => {
  const { isLoading } = useLoading();
  const { locoScroll } = useSmoothScroll();
  useEffect(() => {
    if (isLoading || !locoScroll) return;

    const ctx = gsap.context(() => {
      gsap.set(".rest", { autoAlpha: 1, display: "block" });
      locoScroll.update();

      const mm = gsap.matchMedia();

      // Create ScrollTrigger with proxy
      ScrollTrigger.create({
        trigger: ".x",
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1,
        scroller: ".main-container",
        markers: true,
      });

      // Refresh everything after initialization
      locoScroll.update();
      ScrollTrigger.refresh();
      mm.add("(max-width: 768px)", () => {
        // Add any mobile-specific changes here if needed
      });
    });

    // Trigger refresh after a timeout to handle viewport recalculations
    setTimeout(() => {
      locoScroll.update();
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, [isLoading, locoScroll]);

  return (
    <>
      <section className=" flex  h-screen  x  bg-[#555555]  items-center w-full  relative">
        <h2 className=" text-[12vw] z-[51] top-0 right-mind  text-white   absolute right-10">RIGHT MIND</h2>{" "}
        <div className=" flex slideshow2   w-full translate-x-[20%] top-40  gap-10 py-10 px-20">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              style={{ zIndex: index % 2 === 0 ? "52" : "48" }}
              className="  w-full aspect-square relative  h-[37rem]"
            >
              <Image fill className=" object-cover" src="/img2.webp" alt="" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SecondScenePhone;
