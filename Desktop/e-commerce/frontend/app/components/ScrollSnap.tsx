"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";
import { TypographyH1, TypographyH2, TypographyP } from "./Typography";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import InfinteTitle from "./InfinteTitle";
const HorizontalScroll = ({ items, paragraph }: { items: any[]; paragraph?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      let sections: HTMLDivElement[] = gsap.utils.toArray(".panel");
      ScrollTrigger.create({
        trigger: ".title",
        animation: gsap.from(".title", { x: -100, opacity: 0.4 }),
        scrub: true,
      });

      const animatopn = (section: HTMLElement) => gsap.to(section.querySelector(".innersection"), { y: 0, opacity: 1 });
      ScrollTrigger.create({
        trigger: ".container",
        animation: animatopn(sections[0]),
        start: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => setCurrentIndex(0),
      });
      const animationx = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          scrub: 1.5,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 1.5,
          },
          end: () => ("+=" + document.querySelector(".container")?.offsetWidth) as any,
        },
      });
      sections.slice(1).forEach((section: HTMLElement, index: number) => {
        ScrollTrigger.create({
          trigger: section,
          start: "left 60%",
          onEnter: () => {
            setCurrentIndex(index + 1);
          },
          onEnterBack: () => {
            setCurrentIndex(index + 1);
          },
          animation: animatopn(section),
          toggleActions: "play none none reverse",
          containerAnimation: animationx,
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <MaxWidthWrapper id="services" className="flex !pt-20 flex-col container items-start">
      <TypographyH1 className="text-stroke flex gap-3 lg:text-7xl text-main uppercase">
        <InfinteTitle text="My" /> Services
      </TypographyH1>
      <TypographyP className=" max-w-lg text-black dark:text-gray-50">{paragraph}</TypographyP>
      <div className={`flex w-${items.length * 100} flex-nowrap  h-screen`}>
        {items.map((item: any, index: number) => (
          <MaxWidthWrapper
            noPadding
            key={index}
            className="flex  lg:flex-row flex-col !pl-0 panel w-screen text-white "
          >
            <div
              
              className="flex innersection flex-col -translate-y-14 opacity-0 gap-6 w-full lg:w-1/2"
            >
              <p className="stroke-text text-[100px] lg:text-[140px] leading-none font-extrabold">
                <span className=" ">0</span>
                {index + 1}
              </p>
              <TypographyH2 className=" text-3xl lg:text-6xl text-black dark:text-white -mt-8 font-bold">
                {item.title || "add the title of your services "}
              </TypographyH2>
              <TypographyP className=" text-sm lg:text-lg text-black dark:text-gray-300">
                {item.description || "add any description you want here boi !"}
              </TypographyP>
            </div>

            {/* Right Image */}
            <div className="relative h-[80vh] w-full lg:w-1/2">
              <Image fill className="object-contain slideimg" src={item.img} alt={item.alt || "Image"} />
            </div>
          </MaxWidthWrapper>
        ))}{" "}
        <div className="fixed top-8 lg:top-20 right-10 text-white">
          <span className="text-2xl stroke-text  font-bold">{`0${currentIndex + 1}`}</span>
          <span className="text-xl"> / 0{items.length}</span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HorizontalScroll;
