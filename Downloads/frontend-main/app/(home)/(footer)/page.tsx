"use client";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import AnimatedHeader from "../../components/AnimatedHeader";
import ScrollXSections from "../../components/ScrollXSections";
import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import ThreeDSpace from "../../components/ThreeDSpace";
import MaxWidthWrapper from "../../components/defaults/MaxWidthWrapper";
import Paragraph from "../../components/defaults/Paragraph";
import { Calendar, History, MessageCircle } from "lucide-react";
import MotionItem from "../../components/defaults/MotionItem";
import MotionContainer from "../../components/defaults/MotionContainer";
import Head1 from "../../components/defaults/Head1";
const featuredCardsData = [
  {
    icon: <History className="w-10 h-10 text-main" />,
    title: "تصفح تاريخك الطبي بسهولة",
    description: "يمكنك الآن عرض وإدارة تاريخك الطبي عبر الإنترنت بسهولة لتبقى على اطلاع دائم.",
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-main" />,
    title: "تواصل مع الأطباء في أي وقت",
    description: "منصتنا تتيح لك التواصل الفوري مع الأطباء والمهنيين الصحيين في أي وقت ومن أي مكان.",
  },
  {
    icon: <Calendar className="w-10 h-10 text-main" />,
    title: "احجز مواعيدك بسهولة",
    description: "يمكنك حجز زياراتك بسهولة من خلال نظام الحجز الإلكتروني لدينا لتوفير وقتك وجهدك.",
  },
];
export default function Home() {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  return loading ? (
    <div className=" w-full h-screen backdrop-blur-md  bg-blue-400/50 flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <>
      {" "}
      <section className=" overflow-auto over  flex min-h-screen flex-col items-center h-full w-full">
        <section className="  ">
          <HeroHighlight containerClassName="" className="min-h-screen   py-32">
            <div className="flex    flex-col">
              <AnimatedHeader />
            </div>
          </HeroHighlight>
          <ScrollXSections />
        </section>
      </section>
      <div className="flex my-10  w-full flex-col  md:flex-row items-center">
        <MaxWidthWrapper className=" w-[45%] flex flex-col   gap-4">
          <Head1 title="هتلاقي الرعاية المناسبة في احسن العيادات بمصر !" />
          <Paragraph description="مع تطبيق Tabib، رحلتك للحصول على الرعاية الصحية المثالية أصبحت أسهل من أي وقت مضى! سواء كنت تبحث عن أفضل الأطباء أو العيادات المتخصصة في مصر، يتيح لك Tabib الوصول لأفضل الخيارات بكل سهولة وراحة. بفضل تصميمه الذكي ومحرك البحث المتطور، هتقدر تحجز مواعيدك بسرعة وتتواصل مع الأطباء المختصين فورًا، مما يضمن لك تجربة رعاية صحية متكاملة ومتميزة في أقرب العيادات وأفضلها. مع Tabib، رعايتك الصحية في أيدٍ أمينة." />
        </MaxWidthWrapper>
        <ThreeDSpace className=" w-full md:w-[55%]  h-[80vh]" />
      </div>
      <MaxWidthWrapper>
        <div className=" flex flex-col gap-2">
          <Head1 title="اكتشف حلولنا الشاملة للرعاية الصحية" />
          <Paragraph description="من خلال منصتنا، نوفر لك مجموعة متكاملة من الخدمات التي تهدف إلى تحسين تجربتك الصحية. بدءًا من تتبع التاريخ الطبي للمرضى إلى تسهيل التواصل المباشر مع الأطباء، نضع احتياجاتك الصحية في المقام الأول لضمان رعاية متطورة وسلسة." />
        </div>
        <MotionContainer className=" grid lg:grid-cols-3 mt-4 grid-cols-1 gap-4">
          {featuredCardsData.map((card, index) => (
            <MotionItem
              key={index}
              className="p-6 border border-input bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center text-center"
            >
              <div className="mb-4">{card.icon}</div>
              <Head1 title={card.title} thickness="font-semibold" className="mb-2" size="text-xl" />
              <Paragraph description={card.description} />
            </MotionItem>
          ))}
        </MotionContainer>
      </MaxWidthWrapper>
    </>
  );
}
