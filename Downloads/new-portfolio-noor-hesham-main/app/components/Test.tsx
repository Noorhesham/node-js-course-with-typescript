"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
import useLocoScroll from "../hooks/useLocoScroll"; // Assuming you have this hook setup
import { useSmoothScroll } from "../context/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const Test = () => {
  const { locoScroll } = useSmoothScroll(); // Custom hook that initializes Locomotive Scroll

  useEffect(() => {
    if (locoScroll) {
      // Pin the sticky-container and animate its inner elements
      ScrollTrigger.create({
        trigger: ".sticky-container",
        start: "top top",
        end: "+=2000", // Adjust the duration of the pin
        pin: true,
        scrub: true,
        scroller: ".main-container", // Scroller must match Locomotive Scroll container
        markers: true, // Debugging markers, remove when done
      });

      // Animate elements inside the pinned section
      gsap.from(".animate-element", {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".sticky-container",
          start: "top top",
          end: "+=2000", // Match pinning duration
          scrub: true,
          scroller: ".main-container", // Custom scroller
          markers: true, // Debugging markers
        },
      });
    }
  }, [locoScroll]); // Ensure this runs once Locomotive Scroll is ready

  return (
    <div className="main-container" data-scroll-container>
      <div className="h-[300vh]">
        <div className="bg-blue-300 h-screen flex items-center justify-center">
          <h1>Scroll Down to See Pinning Effect</h1>
        </div>

        {/* Pinned Section */}
        <div className="sticky-container h-screen bg-green-300 flex flex-col items-center justify-center">
          <h1>Pinned Section</h1>
          <div className="animate-element">Element 1</div>
          <div className="animate-element">Element 2</div>
          <div className="animate-element">Element 3</div>
        </div>

        <div className="bg-red-300 h-screen flex items-center justify-center">
          <h1>End of Scroll</h1>
        </div>
      </div>
    </div>
  );
};

export default Test;
