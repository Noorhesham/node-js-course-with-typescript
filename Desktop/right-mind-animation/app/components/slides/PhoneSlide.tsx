import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Paragraph from "../Paragraph";
import gsap from "gsap";
import { useLoading } from "@/app/context/LoadingContext";
const slides = [
  { desc: "Life style", desc2: "lorem ipsum dolor sit amet", image: "/video-main.mp4", video: true },
  { desc1: "Life style", desc2: "lorem ipsum dolor sit amet", image: "/2-xxxl.webp" },
  { desc1: "Life style", desc2: "lorem ipsum dolor sit amet", image: "/3-xxxl.webp" },
  { desc1: "Life style", desc2: "lorem ipsum dolor sit amet", image: "/4-xxxl.webp" },
];
const PhoneSlide = ({ currentIndex }: { currentIndex: number }) => {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const {isLoading} = useLoading();
  useEffect(() => {
    if(isLoading) return
    const timeline = gsap.timeline();
    const ctx = gsap.context(() => {
      if (currentIndex === 1) gsap.timeline().to(".slide", { translateY: "30%" }).set(".slide", { translateY: "30%" });

      slideRefs.current.forEach((el, index) => {
        const img = el.querySelector(".img");
        const text = el.querySelectorAll(".paraphone");
        if (index === currentIndex) {
          gsap.set(el, { zIndex: 2 });

          timeline
            .fromTo(img, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.inOut" })
            .set(img, { autoAlpha: 1 })
            .to(text, { opacity: 1, y: 0, duration: 0.5 })
            .to(
              text[0].querySelectorAll("span") as NodeListOf<HTMLElement>,
              {
                autoAlpha: 1,
                y: 0,
                skewX: 0,
                stagger: { amount: 0.3 },
              },
              "<"
            )
            .to(
              text[1].querySelectorAll("span") as NodeListOf<HTMLElement>,
              {
                autoAlpha: 1,
                y: 0,
                skewX: 0,
                stagger: { amount: 0.3 },
              },
              "<"
            );
        } else {
          gsap.set(el, { zIndex: 1 });
          gsap.to(img, { opacity: 0, duration: 0.5 });
          gsap.to(text, { opacity: 0, y: 20, duration: 0.5 });
        }
      });
    });
    return () => ctx.revert();
  }, [currentIndex, isLoading]);
  return (
    <div>
      <div className="slide absolute z-[2] bg-[#555555] translate-y-[100%]  w-full h-full"></div>
      {slides.map((slide, index) => (
        <div
          className=" absolute inset-0 w-full h-full"
          key={index}
          ref={(el) => {
            //storing all my divs in an array of refs
            if (el) slideRefs.current[index] = el;
          }}
        >
          {" "}
          {slide.video ? (
            <div className="absolute inset-0 w-full h-full">
              <video
                loop
                src={slides[currentIndex].image}
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className=" w-full  img opacity-0 h-[30vh]  scale-125 relative">
              <Image src={slides[currentIndex].image} fill className="object-cover" alt="Second slide" />
            </div>
          )}
          <div className="">
            <Paragraph
              height="h-20"
              animate={false}
              // Pass the timeline reference
              className="paraphone  !opacity-100  top-40 bottom-auto z-40 md:top-auto lg:bottom-20  absolute left-4 md:left-40 !text-7xl "
              text="Life style"
            />
          </div>
          <Paragraph
            height="h-8"
            animate={false}
            className=" paraphone  !opacity-100  bottom-20 absolute z-40  right-40 lg:p-0 p-3 text-xl "
            text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
          />
        </div>
      ))}
    </div>
  );
};

export default PhoneSlide;
