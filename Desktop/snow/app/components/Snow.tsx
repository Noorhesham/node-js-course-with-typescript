"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import SnowBullets from "./SnowBullets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Snow = () => {
  const container = useRef<null | any>(null);
  useEffect(() => {
    const scrolltrigger2 = {
      trigger: container.current,
      start: "top top", // Start pinning when the top of the container hits the top of the viewport
      end: "+=500", // Scroll length for which the section will remain pinned
      scroller: ".main-container", // Adjust this according to your layout
      invalidateOnRefresh: true,
      markers: true,
      scrub: 3,
      pin: true, // Pin the container
    };

    const tl = gsap.timeline();
    const tl2 = gsap.timeline();

    tl.from(".ground", {
      y: 100,
      duration: 2,
      ease: "power2.inOut",
    })
      .fromTo(".home", { opacity: 0, xPercent: -100, duration: 1 }, { opacity: 1, xPercent: 0, duration: 1 })
      .fromTo(
        ".noor",
        {
          opacity: 0,
          xPercent: -1500,
          duration: 1,
          rotate: 360,
          animationDuration: 1,
          yPercent: -500,
        },
        {
          opacity: 1,
          xPercent: 0,
          duration: 1,
          rotate: -360,
          animationDuration: 1,
          yPercent: 0,
        }
      )
      .fromTo(
        ".tree",
        { opacity: 0, y: 200, stagger: 0.5 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.5,
        }
      );
  }, []);
  return (
    <section
      ref={container}
      style={{
        overflow: "hidden",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/bg.png')",
      }}
      className=" h-screen section snowbg z-0   relative w-full"
    >
      <SnowBullets />
      <div className=" bottom-0 ground absolute h-full w-full  z-10">
        <Image src="/ground.png" className=" object-cover w-full h-full" alt="ground" fill />
      </div>
      <div className="home opacity-0 bottom-20 left-0 ground absolute aspect-square h-[35rem] w-[35rem]  z-10">
        <Image src="/home.png" className=" object-cover w-full h-full" alt="ground" fill />
      </div>
      <div className="noor opacity-0 bottom-20 right-20  absolute aspect-square rounded-full overflow-hidden h-96 w-96  z-10">
        <Image src="/noor.jpg" className=" object-cover w-full h-full" alt="ground" fill />
      </div>
      <div className="tree opacity-0 -bottom-4 right-16  absolute aspect-square rounded-full overflow-hidden h-96 w-96  z-10">
        <Image src="/tree1.png" className=" object-cover w-full h-full" alt="ground" fill />
      </div>
      <div className="tree opacity-0 bottom-20 left-1/2  absolute aspect-square rounded-full overflow-hidden h-96 w-96  z-10">
        <Image src="/tree2.png" className=" object-cover w-full h-full" alt="ground" fill />
      </div>
    </section>
  );
};

export default Snow;
// const handleMouseOver = () => {
//   // Animate the link text with a snowy glowing effect
//   gsap.to(".ex", {
//     duration: 1, // Longer duration for a smoother animation
//     ease: "power2.inOut", // Smooth easing
//     textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00f, 0 0 70px #00f, 0 0 100px #00f", // Snowy glow
//   });
//   // Animate the home image to move slightly upwards
//   gsap.to(".home", {
//     duration: 1, // Longer duration for smoother transition
//     y: -15, // Move slightly upwards
//     ease: "power2.inOut",
//   });
// };

// const handleMouseOut = () => {
//   // Revert the text animation
//   gsap.to(".ex", {
//     duration: 0.6, // Slightly faster return
//     ease: "power2.inOut", // Smooth easing
//     textShadow: "0", // Remove glow
//   });
//   // Revert the home image to its original position
//   gsap.to(".home", {
//     duration: 0.6, // Slightly faster return
//     y: 0, // Reset position
//     ease: "power2.inOut",
//   });
// };
