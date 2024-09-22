import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import AnimatedImage from "./AnimatedImage";
import LargeHeading from "./LargeHeading";
import Image from "next/image";
import { VideoIcon } from "lucide-react";
import { GrAnalytics } from "react-icons/gr";
import { Feature } from "./Feature";
import MotionItem from "./MotionItem";
import MotionContainer from "./MotionContainer";

const About = () => {
  return (
    <MaxWidthWrapper className=" flex flex-col gap-4  lg:flex-row items-start">
      <div className=" relative flex-[40%]">
        <AnimatedImage className="overflow-hidden  w-full" />
        <MotionItem className=" absolute top-[20%] left-32   aspect-square  w-80 h-80 rounded-2xl overflow-hidden">
          <Image
            src="/photo_2024-08-21_14-18-31.jpg"
            alt="الطالب يحصل على المعلومة بشكل مُبسط"
            fill
            className="object-cover"
          />
        </MotionItem>
      </div>
      <div className=" flex flex-[60%] flex-col items-end ">
        <h2
          className="after:w-10 mr-14  after:bg-primary after:h-1 after:rounded-2xl after:absolute after:-right-12 relative 
   after:top-1/2 text-primary after:z-10 font-semibold"
        >
          الطالب يحصل على المعلومة بشكل مُبسط
        </h2>
        <div className="flex items-end flex-col">
          <LargeHeading paragraph="" text="أستاذ اللغة العربية" />
          <p className=" mt-4  text-muted-foreground text-right">
            فيديوهات مُسجلة وأخري مباشرة أونلاين بأشكال مختلفة مثلا: بإستخدام السبورة البيضاء، والسبورة
            المًضيئلة،ولإضافة تواصل مباشر مع الطالب نستخدم شاشة 60 بوصة تفاعلية. والتى يكون عليها المنهج واضح مع وضع
            الملاحظات.
          </p>
        </div>
        <MotionContainer className="flex flex-col gap-5">
          <Feature
            title="فيديوهات شرح"
            text="فيديوهات مسجلة لكل جزء فى المنهج بأحدث الامكانيات المتاحة حاليا عشان تضمن ثبات المعلومة"
            Icon={VideoIcon}
            iconColor="text-blue-500"
          />
          <Feature
            title="حصص مباشرة"
            text="حصص لايف على كل جزء فى المنهج ومتابعة دورية لكل ما تم شرحه عن طريق الأسئلة والاختبارات"
            Icon={VideoIcon}
            iconColor="text-green-500"
          />
          <Feature
            title="تقييم دوري"
            text="من خلال أداء الطالب والإلتزام بالحضور وحل الاختبارات نقوم بتقييم شامل لكل طالب"
            Icon={GrAnalytics}
            iconColor="text-purple-500"
          />
        </MotionContainer>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
