"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useSlider } from "../context/useSlider";
import Pagination from "./Pagination";
import Image from "next/image";
import Paragraph from "./Paragraph";
import { useLoading } from "../context/LoadingContext";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { useIsMobile } from "../context/useIsMobile";
const items = [
  {
    desc1: "Life style",
    image: "/4-xxxl.webp",
  },
  {
    desc1: "Life style",
    image: "/4-xxxl.webp",
  },
  {
    desc1: "Life style",
    image: "/3-xxxl.webp",
  },
  {
    desc1: "Life style",
    image: "/2-xxxl.webp",
  },
];

const ThirdSlider = () => {
  const {
    handlePrev,
    handleNextSlide,
    progress,
    isClickable,
    currentSlideIndex,
    setIsClickable,
    TOTAL_SLIDES,
    isChangingSlide,
  } = useSlider({});

  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [isFirst, setIsFirst] = React.useState(true);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const { isMobile } = useIsMobile();
  const { isLoading } = useLoading();
  useEffect(() => {
    if (isLoading || !imageRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: () => "top bottom",
        end: "bottom top",
        scroller: ".main-container",
        scrub: 1,
        animation: gsap.to(imageRef.current, { scale: 1.25 }),
        onEnter: () => setIsFirst(false),
      });
      ScrollTrigger.create({
        trigger: ".third",
        start: () => "top 50%",
        end: "bottom top",
        scroller: ".main-container",
        animation: gsap.to(".movingpara span", {
          opacity: 1,
          stagger: { amount: 2 },
          color: "black",
          skewX: 0,
          y: 0,
        }),
      });
      if (timeline.current) {
        timeline.current.clear(); // Clear the existing timeline
      }
      (timeline.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 50%",
            end: "top top",
            scroller: ".main-container",
          },
        })
        .fromTo(imageRef.current, { width: 0 }, { width: "100%", duration: 1 }))
        .to(".para", { autoAlpha: 1 })
        .to(
          ".para span",
          {
            autoAlpha: 1,
            y: 0,
            skewX: 0,
            stagger: { amount: 0.3 },
          },
          "<"
        );
    });

    return () => ctx.revert();
  }, [currentSlideIndex, isLoading]);

  return (
    <section className="  bg-white">
      <MaxWidthWrapper className="third flex gap-10 items-center relative flex-col">
        <Paragraph
          className=" text-left capitalize lg:text-4xl text-xl !opacity-100  w-full !max-w-full !text-black  movingpara"
          animate={false}
          text={`Right Mind is a leading company in the real estate development sector,providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving t balance luxury with functionality across all our projects.`}
        />
        <div
          className="  w-32 h-32  rounded-full border-orange-600  border-2 flex items-center justify-center
         text-gray-900  relative text-center text-base font-semibold "
        >
          ABOUT US
        </div>
        <div className=" absolute w-96 h-80 left-16 -bottom-10">
          <Image src="/Group 48097963.png" alt="" fill className=" object-contain" />
        </div>
      </MaxWidthWrapper>{" "}
      <div className=" h-96 w-full relative">
        <Image alt="" src={"/Rectangle 2976.png"} fill className=" object-cover" />
      </div>
      <div className="flex items-center relative mt-[8rem] w-full flex-col gap-5">
        <h2 className=" text-[7vw] z-40  absolute -top-20 -translate-x-1/2 left-1/2  text-black text-center">
          WHY CHOOSE US
        </h2>
        <div className="  flex lg:flex-row flex-col items-start">
          <div className=" w-full lg:w-[50%] relative h-96 lg:h-[80vh] aspect-square overflow-hidden">
            {
              <div
                className={` ${
                  isFirst && "opacity-0"
                } duration-150 scale-125 absolute inset-0 z-10 flex items-center justify-center`}
              >
                <Image
                  src={items[currentSlideIndex === 0 ? TOTAL_SLIDES - 1 : currentSlideIndex - 1].image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            }
            <div ref={imageRef} className="absolute z-20 inset-0 flex items-center justify-center">
              <Image src={items[currentSlideIndex].image} alt="" fill className="object-cover" />
            </div>
            {isMobile && (
              <Pagination
                reverseColors
                className=" mt-auto  absolute right-0 bottom-0 lg:relative !text-white z-40"
                handlePrev={handlePrev}
                progress={progress}
                currentSlideIndex={currentSlideIndex}
                handleNextSlide={handleNextSlide}
                isClickable={isClickable}
                TOTAL_SLIDES={TOTAL_SLIDES}
              />
            )}
          </div>{" "}
          <div className=" flex items-center lg:flex-row flex-col lg:self-end gap-2 w-full lg:w-[50%] my-5">
            {!isMobile && (
              <Pagination
                reverseColors
                className=" mt-auto  absolute right-0 bottom-10 lg:relative !text-white z-40"
                handlePrev={handlePrev}
                progress={progress}
                currentSlideIndex={currentSlideIndex}
                handleNextSlide={handleNextSlide}
                isClickable={isClickable}
                TOTAL_SLIDES={TOTAL_SLIDES}
              />
            )}

            <MaxWidthWrapper>
              <Paragraph
                animate={false}
                height="h-8"
                className=" flex-1 para p-3 text-xs !text-black"
                text=" Мы верим, что внутренний и внешний облик здания влияют на мироощущение человека, который проводит в этом здании много времени. Красивые, элегантные и гармоничные строения способны вдохновлять и мотивировать. Именно поэтому мы уделяем большое внимание эстетике проектов, значительно превышая в этом аспекте стандарты рынка. А наша особая гордость и награда — это восторженные эмоции клиентов при виде наших строений"
              />
            </MaxWidthWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSlider;
