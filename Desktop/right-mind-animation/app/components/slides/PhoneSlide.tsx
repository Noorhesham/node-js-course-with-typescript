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
  const { isLoading } = useLoading();
  const [first, setFirst] = React.useState(true);
  useEffect(() => {
    if (isLoading) return;
    const timeline = gsap.timeline();
    const ctx = gsap.context(() => {
      console.log(currentIndex);
      if (first) {
        gsap.set(".slide", { translateY: "100%",autoAlpha: 0 });
        gsap.set(".img", { autoAlpha: 0 });
      }
      const imgs = document.querySelectorAll(".img");
      if (currentIndex === 1) {
        gsap.timeline().fromTo(".slide", { translateY: "100%" }, { translateY: "30%" });
        setFirst(false);
      }
      if (currentIndex === 0 && !first) {
        gsap
          .timeline()
          .fromTo(imgs[3], { autoAlpha: 1 }, { autoAlpha: 0 })
          .fromTo(".slide", { translateY: "30%" }, { translateY: "100%" });
      }
      slideRefs.current.forEach((el, index) => {
        const img = el.querySelector(".img");
        const text = el.querySelectorAll(".paraphone");
        if (index === currentIndex) {
          timeline
            .fromTo(img, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.inOut" })
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
          gsap.to(img, { autoAlpha: 0, duration: 0.5 });
          gsap.to(text, { opacity: 0, y: 20, duration: 0.5 });
        }
      });
    });
    return () => ctx.revert();
  }, [currentIndex, isLoading]);
  return (
    <div>
      <div className="slide absolute z-[20] bg-[#555555]  w-full h-full"></div>
      <div className="absolute inset-0 w-full h-full">
        <video loop src={slides[0].image} muted className="absolute inset-0 w-full h-full object-cover" />
      </div>
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
          {slide.video ? null : (
            <div className=" w-full   h-[30vh]   relative">
              {currentIndex > 0 && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Image
                    src={slides[currentIndex === 0 ? 3 : currentIndex - 1].image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="img  scale-125 w-full z-20 h-full absolute inset-0">
                <Image src={slides[currentIndex].image} fill className="object-cover" alt="Second slide" />
              </div>
            </div>
          )}
          <div className="">
            <Paragraph
              height="h-20"
              animate={false}
              // Pass the timeline reference
              className="paraphone  !opacity-100  top-52
               bottom-auto z-40 md:top-auto lg:bottom-20  absolute left-4 md:left-40 !text-7xl "
              text="Life style"
            />
          </div>
          <Paragraph
            height="h-8"
            animate={false}
            className=" paraphone  !opacity-100  bottom-40 w-full absolute z-40  lg:p-0 p-3 text-xl "
            text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
          />
        </div>
      ))}
    </div>
  );
};

export default PhoneSlide;
