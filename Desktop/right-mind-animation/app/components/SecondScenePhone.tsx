"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useLoading } from "../context/LoadingContext";
import { useSmoothScroll } from "../context/ScrollProviderContext";
import Link from "next/link";
import { useIsMobile } from "../context/useIsMobile";

const SecondScenePhone = () => {
  const { isLoading } = useLoading();
  const { locoScroll } = useSmoothScroll();
  const { isMobile } = useIsMobile();
  const projectsRefs = useRef<HTMLDivElement[] | any>([]);

  useEffect(() => {
    if (isLoading || !locoScroll) return;

    const ctx = gsap.context(() => {
      gsap.set(".rest", { autoAlpha: 1, display: "block" });
      locoScroll.update();

      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".x",
              start: "top top",
              scrub: true,
              scroller: ".main-container",
              end: "+=2000",
              pin: true,
            },
          })
          .to(".slideshow2", { xPercent: -270 })
          .to(".rr ", { xPercent: -20 }, "<");
        locoScroll.update();
        ScrollTrigger.refresh();
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
  if (!isMobile) return null;
  return (
    <>
      <section className=" flex md:hidden  h-screen  x  bg  items-center w-full  relative">
        <h2 className=" text-[12vw] rr z-[51] top-32 right-mind  text-white   absolute lg:left-auto left-20 lg:right-10">RIGHT MIND</h2>{" "}
        <div className=" flex slideshow2   w-full  top-40  gap-10 py-10 px-20">
          {Array.from({ length: 4 }).map((_, index) => (
            <Link
              href={"/"}
              ref={(el) => {
                //storing all my divs in an array of refs
                if (el) projectsRefs.current[index] = el;
              }}
              onMouseOver={() =>
                gsap
                  .timeline({ defaults: { ease: "power2.out" } })
                  .to(projectsRefs.current[index].querySelector(".circle2") as HTMLDivElement, { scale: 1.4 })
                  .to(projectsRefs.current[index].querySelector(".imgproject"), { scale: 1.2 }, "<")
              }
              onMouseLeave={() =>
                gsap
                  .timeline()
                  .to(projectsRefs.current[index].querySelector(".circle2") as HTMLDivElement, { scale: 1 })
                  .to(projectsRefs.current[index].querySelector(".imgproject"), { scale: 1 }, "<")
              }
              key={index}
              style={{ zIndex: index % 2 === 0 ? "52" : "48" }}
              className="     aspect-square relative   w-80   h-80"
            >
              <div className=" circle2 w-20 h-20 absolute flex top-1/2 -translate-y-1/2  justify-center items-center z-[55] rounded-full bg-main left-1/2 -translate-x-1/2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.152 6.13025H15.0425V9.26675H9.152V15.3867H5.939V9.26675H0.125V6.13025H5.939V0.125H9.152V6.13025Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className=" absolute inset-0 w-full h-full overflow-hidden">
                <Image fill className="imgproject object-cover" src="/img2.webp" alt="" />
              </div>
              <h2 className=" uppercase text-black text-3xl font-semibold lg:text-5xl absolute -bottom-5 left-10">
                allcon
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default SecondScenePhone;
