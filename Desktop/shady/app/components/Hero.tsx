import React from "react";
import LargeHeading from "./LargeHeading";
import Image from "next/image";
import AnimatedImage from "./AnimatedImage";
import { GrLike } from "react-icons/gr";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiUnlock } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Paragraph from "./Paragraph";
import MouseAnimation from "./MouseAnimation";
import MotionContainer from "./MotionContainer";

const Hero = () => {
  return (
    <MotionContainer className="flex flex-col overflow-hidden lg:flex-row-reverse relative  justify-center ">
      <span className="w-32 h-12 md:block hidden scale-125 -rotate-45 absolute top-36 -left-12 bg-purple-300 rounded-full"></span>
      <span className="w-32 h-12 md:block hidden scale-125 -rotate-45 absolute top-64 -left-10 bg-purple-300 rounded-full"></span>
      <span className="w-32 h-12 md:block hidden scale-125 -rotate-45 absolute top-36 -right-12 bg-purple-300 rounded-full"></span>
      <span className="w-32 h-12 md:block hidden scale-125 -rotate-45 absolute top-64 -right-10 bg-purple-300 rounded-full"></span>

      <MaxWidthWrapper className="flex flex-col lg:flex-row gap-14 items-center">
        <div className=" flex-[60%]  lg:border-r-2 text-center lg:text-right lg:pr-5 relative flex flex-col">
          <LargeHeading
            paragraph="منصة متخصصة في تعليم اللغة العربية بواسطة الأستاذ محمد رمضان (الشـــادي) بأحدث الأساليب التعليمية"
            colorful="منصة شادي التعليمية"
            heighlight="لطلاب الثانوية العامة"
            text="مرحبًا بكم في"
          />
          <h1 className=" text-4xl xl:text-7xl opacity-30 text-muted-foreground absolute font-bold right-40 -top-8">
            {" "}
            أستاذ اللغة العربية
          </h1>

          <Paragraph
            text="تأسست المنصة على يد أ. محمد رمضان (الشـــادي) بهدف تقديم محتوى علمي يليق بتطوير مستوى الطالب المصري في اللغة
            العربية حتى لا تكون هناك فجوة بين فهم المنهج وثبات المعلومة في ذهن الطالب."
          />
          <Paragraph
            text="على مدار سنوات، يتم تطوير المنصة طبقًا لاحتياجات الطالب وإضافة أدوات شرح واختبارات متعددة لضمان أفضل تجربة
            تعليمية."
          />

          <div className="flex w-[80%] lg:w-[40%] mx-auto  lg:ml-auto mt-5">
            <Button
              noDiv
              className="relative hover:shadow-lg z-10 w-full  hover:shadow-secondary  transition-all duration-150 border-white"
            >
              ابدأ الآن
            </Button>
          </div>
        </div>

        <MaxWidthWrapper className="z-10 overflow-x-hidden  relative flex-[40%] mt-auto h-full">
          <MouseAnimation />{" "}
          <Image
            alt="imag"
            width={100}
            height={100}
            src="/8303101.png"
            className="py-2 z-10 px-2 right-12 lg:right-10 top-32 rounded-lg absolute"
          />
          <IoIosHeartEmpty className="py-2 z-10 px-2 bottom-44  left-5  lg:right-52 rounded-lg text-5xl  bg-primary text-white absolute" />
        </MaxWidthWrapper>
      </MaxWidthWrapper>

      <Image
        src={"/arrow.png"}
        width={200}
        height={200}
        alt="arrow"
        className="hidden lg:block -rotate-90 -bottom-10 left-20 z-20 absolute"
      />
    </MotionContainer>
  );
};

export default Hero;
