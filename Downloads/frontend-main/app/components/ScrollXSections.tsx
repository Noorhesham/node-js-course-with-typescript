"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import AnimatedImage from "./AnimatedImage";
import MotionItem from "./defaults/MotionItem";
import MotionContainer from "./defaults/MotionContainer";
import { Button } from "@/components/ui/button";
import Paragraph from "./defaults/Paragraph";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { HeroHighlight } from "@/components/ui/hero-highlight";

gsap.registerPlugin(ScrollTrigger);

const ScrollXSections = () => {
  const containerRef = useRef<any>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const sections = gsap.utils.toArray(".section");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scroller: ".main-container",
          scrub: 1,
          pin: true,
          start: "top top",
          end: () => `+=${container.scrollWidth - 50}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Move the sections horizontally with xPercent
      timeline.to(sections, {
        xPercent: -100 * (sections.length - 1), // Move through each section
        ease: "none", // Keep the animation linear
      });

      // Refresh ScrollTrigger to account for dynamic content
      ScrollTrigger.refresh();

      // Cleanup on component unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [], scope: containerRef.current }
  );

  return (
    <div className="" style={{ overflow: "hidden" }}>
      <div ref={containerRef} className="flex  h-screen w-[500vw]">
        <div className="section w-[100vw] h-[110vh] lg:h-screen ">
          <MaxWidthWrapper className="flex flex-col md:flex-row h-full  items-center justify-between">
            <MotionItem
              nohover
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 flex flex-col gap-5 px-4 py-2"
            >
              <h2 className="text-gray-900 text-5xl font-bold my-3 lg:text-7xl"> تعاون مع الذكاء الاصطناعي </h2>
              <Paragraph
                size="lg"
                description="تم تصميم روبوت الدردشة الذكي الخاص بنا لتحسين تجربتك من خلال تقديم الدعم والمعلومات الفورية. سواء كان لديك استفسارات حول خدماتنا أو تحتاج إلى مساعدة في الحجوزات، فإن روبوت الدردشة متاح لخدمتك على مدار الساعة. تفاعل معه لتسهيل تواصلك والحصول على الإجابات التي تحتاجها في أي وقت."
              />
            </MotionItem>
            <MotionItem
              nohover
              transition={{ duration: 0.6, delay: 0.2 }}
              initial={{ opacity: 0, x: -500 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="w-1/2 h-96 relative"
            >
              <Image fill alt={"bot"} src={"/bot.gif"} className=" object-cover" />
            </MotionItem>
          </MaxWidthWrapper>
        </div>
        <div className="section w-[100vw] h-[110vh] lg:h-screen bg-cyan-700">
          <MaxWidthWrapper className="flex md:flex-row h-full flex-col items-center justify-between">
            <MotionItem
              nohover
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 px-4 flex flex-col gap-2 py-2"
            >
              <h2 className="text-gray-50 text-5xl font-bold my-3 lg:text-7xl"> التواصل الفوري والبحث السريع ! </h2>
              <Paragraph
                size="lg"
                color="text-gray-50"
                description="هتقدر تلاقي النصيحة الصح وتتواصل مع الدكتور الي حجزت عنده في ثواني ! مع مميزات الشات السريع والحجز الاونلاين بضغطة زر !"
              />
            </MotionItem>
            <MotionItem
              nohover
              transition={{ duration: 0.6, delay: 0.2 }}
              initial={{ opacity: 0, x: -500 }}
              whileInView={{ opacity: 1, x: 0 }}
              className=" w-full md:w-1/2"
            >
              <AnimatedImage data="animate3.json" className="w-full h-full" />
            </MotionItem>
          </MaxWidthWrapper>
        </div>
        <div className="section w-[100vw] h-[110vh] lg:h-screen  bg-blue-800">
          <MaxWidthWrapper className="flex md:flex-row h-full flex-col items-center justify-between">
            <MotionItem
              nohover
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 px-4 py-2"
            >
              <h2 className="text-gray-50 text-5xl font-bold my-3 lg:text-7xl">ليه ممكن استخدم طبيب ؟</h2>
              <MotionContainer className="flex gap-2 text-base lg:text-xl flex-col text-gray-50">
                <MotionItem nohover>تواصل مع الدكتور في ثواني</MotionItem>
                <MotionItem nohover>احجز مواعيد للتخصص الي محتاجه</MotionItem>
                <MotionItem nohover>ارفع سجلك المرضي في مكان واحد</MotionItem>
                <MotionItem nohover>سهولة الاستخدام والسلاسة</MotionItem>
              </MotionContainer>
              <Button className=" mt-4 rounded-full">احجز مواعيد دلوقتي ! </Button>
            </MotionItem>
            <MotionItem
              nohover
              transition={{ duration: 0.6, delay: 0.2 }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              className=" w-full md:w-1/2"
            >
              <AnimatedImage className="w-full h-full" />
            </MotionItem>
          </MaxWidthWrapper>
        </div>
      </div>
    </div>
  );
};

export default ScrollXSections;
