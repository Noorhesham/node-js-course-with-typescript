import React from "react";

import { FaBook, FaChalkboardTeacher, FaMedal, FaClipboardList } from "react-icons/fa";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import LargeHeading from "./LargeHeading";
import GridContainer from "./GridContainer";
import NeonCard from "./Card";
import MotionItem from "./MotionItem";
import MotionContainer from "./MotionContainer";

const MoreInfo = () => {
  return (
    <MaxWidthWrapper className=" flex flex-col gap-4  lg:flex-row-reverse items-start">
      <div className=" flex flex-col items-end ">
        <MotionItem nohover
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -200, opacity: 0 }}
          className="after:w-10 mr-14  after:bg-primary after:h-1 after:rounded-2xl after:absolute after:-right-12 relative 
     after:top-1/2 text-primary after:z-10 font-semibold"
        >
          الطالب يحصل على المعلومة بشكل مُبسط
        </MotionItem>
        <MotionItem className="flex items-end flex-col">
          <LargeHeading text="أستاذ اللغة العربية" />
          <p className=" mt-4 max-w-lg text-muted-foreground text-right">
            فيديوهات مُسجلة وأخري مباشرة أونلاين بأشكال مختلفة مثلا: بإستخدام السبورة البيضاء، والسبورة
            المًضيئلة،ولإضافة تواصل مباشر مع الطالب نستخدم شاشة 60 بوصة تفاعلية. والتى يكون عليها المنهج واضح مع وضع
            الملاحظات.
          </p>
        </MotionItem>
      </div>

      <MotionContainer className="grid  flex-1 grid-cols-1 md:grid-cols-2 gap-4">
        <NeonCard
          title="واجب واختبارات دورية"
          description="اختبار سريع (واجب)، بعد كل فيديو لضمان وصول المعلومة، ونستكمل الاختبارات الدورية على أجزاء من المنهج او اختبارات شاملة لكي يكون التقييم مُكتمل مع تقديم مسابقات بجوائز قيمة للمتفوقين."
          icon={<FaClipboardList />}
          iconColor="text-neon-blue"
        />
        <NeonCard
          title="طرق مميزة للشرح"
          description="فيديوهات مُسجلة وأخري مباشرة أونلاين بأشكال مختلفة مثلا: بإستخدام السبورة البيضاء، والسبورة المًضيئلة، ولإضافة تواصل مباشر مع الطالب نستخدم شاشة 60 بوصة تفاعلية."
          icon={<FaChalkboardTeacher />}
          iconColor="text-neon-green"
        />
        <NeonCard
          title="اختبارات فى جميع المواد"
          description="اهتمامنا بطلابنا ليس فقط فى مادة اللغة العربية، اننا نسعي للمساهمة فى خدمة أبنائنا الطلاب، لذلك قمنا بإنشاء بنك أسئلة شامل فى جميع المواد."
          icon={<FaBook />}
          iconColor="text-neon-orange"
        />
        <NeonCard
          title="مسابقات وجوائز"
          description="تقديم مسابقات بجوائز قيمة للمتفوقين، تشجيعًا لهم على الاستمرار في التفوق وتحقيق أفضل النتائج الدراسية."
          icon={<FaMedal />}
          iconColor="text-neon-yellow"
        />
      </MotionContainer>
    </MaxWidthWrapper>
  );
};

export default MoreInfo;
