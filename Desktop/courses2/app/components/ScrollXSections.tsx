"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import useLocoScroll from "../hooks/useLocoScroll";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import AnimatedImage from "./AnimatedImage";

gsap.registerPlugin(ScrollTrigger);

const ScrollXSections = () => {
  const containerRef = useRef<any>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = gsap.utils.toArray(".section");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scroller: ".main-container",
        scrub: true,
        pin: true,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Move the sections horizontally with xPercent
    timeline.to(sections, {
      xPercent: -100 * (sections.length - 1), // Move through each section
      ease: "none", // Keep the animation linear
    });

    // Animations for individual section content
    // sections.forEach((section) => {
    //   const animatedContent = section.querySelector("#animated");
    //   if (animatedContent) {
    //     gsap.fromTo(
    //       animatedContent,
    //       { y: 50, opacity: 0 }, // Initial state
    //       {
    //         y: 0, // Final state
    //         opacity: 1,
    //         duration: 1,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //           trigger: section,
    //           scroller: ".main-container",
    //           start: "top center",
    //           toggleActions: "play none none none",
    //         },
    //       }
    //     );
    //   }
    // });

    // Refresh ScrollTrigger to account for dynamic content
    ScrollTrigger.refresh();

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <div ref={containerRef} className="flex w-[300vw]">
        {/* Horizontal sections */}
        <div className="section w-[100vw] h-screen bg-red-500"></div>
        <div className="section w-[100vw] h-screen bg-cyan-700">
          <MaxWidthWrapper className="flex lg:flex-row h-full flex-col items-center justify-between">
            <div id="animated" className="flex-1 px-4 py-2">
              <h2 className="text-gray-50 text-5xl font-bold my-3 lg:text-7xl">ليه ممكن استخدم طبيب ؟</h2>
              <ol className="flex gap-2 text-base lg:text-xl flex-col text-gray-50">
                <li>تواصل مع الدكتور في ثواني</li>
                <li>احجز مواعيد للتخصص الي محتاجه</li>
                <li>ارفع سجلك المرضي في مكان واحد</li>
                <li>سهولة الاستخدام والسلاسة</li>
              </ol>
            </div>
            <div className="w-1/2">
              <AnimatedImage className="w-full h-full" />
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
    </div>
  );
};

export default ScrollXSections;
