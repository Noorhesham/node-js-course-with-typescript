import Container from "@/app/components/Container";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/defaults/Head1";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import { Button } from "@/components/ui/button";
import { ChartLine, CheckIcon, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCogs, FaHeadset, FaLightbulb, FaTachometerAlt } from "react-icons/fa";

const page = () => {
  return (
    <div className=" pt-32">
      <MaxWidthWrapper>
        <div className=" w-full relative h-96">
          <Image src="/image.png" alt="image" className=" object-cover" fill />
        </div>
        <div className=" grid md:grid-cols-2 gap-5   mt-5">
          <Head1 size="text-2xl" color=" text-main" title="تشخيص الحالات بشكل ثوري عن طريق ال AI" />
          <div className="flex flex-col gap-5">
            <Paragraph description="تم تصميم منصا لتمكين المرضى من الحصول على ميزات صحية أساسية. بدءًا من الحجز عبر الإنترنت وحتى التواصل في الوقت الفعلي مع الأطباء، نضمن تجربة رعاية صحية سلسة." />
            <div className=" flex items-stretch gap-5">
              <div className=" flex flex-col items-start">
                <Head1 size=" text-base md:text-lg" color=" text-main" title="الدقة و الكفاءة" />
                <Paragraph description=" استمتع بأوقات استجابة سريعة للتقارير ، مما يعزز كفاءة علاج المرضى." />
              </div>
              <div className=" flex flex-col items-start">
                <Head1 size=" text-base md:text-lg" color=" text-main" title="الدقة و الكفاءة" />
                <Paragraph description=" استخدم الذكاء الاصطناعي لتقليل الخطأ البشري وتحسين دقة التشخيص للحصول على نتائج أفضل." />
              </div>
            </div>
          </div>
        </div>
        <MaxWidthWrapper className=" flex flex-col gap-4  items-center ">
          <Head1 title="ليه ممكن تستعمل طيب ؟" className=" text-center" />
          <Paragraph
            className=" text-center"
            description="منصتنا بتتميز بخصائص جديدة مش موجود فأي منصه تانيه وقابله للتطوير وبنضيف ليها مميزات جديدة تماما كل مدي ! "
          />
          <GridContainer cols={3}>
            {/* First Column: 2 Feature Cards */}
            <div className="flex flex-col gap-5">
              <Container className="p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckIcon />
                  <div>
                    <Head1 size="text-lg" color="text-main" title="الدقة و الكفاءة" />
                    <Paragraph description="نقدم أداء عالي ودقة ممتازة في كافة العمليات." />
                  </div>
                </div>
              </Container>

              <Container className="p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock />
                  <div>
                    <Head1 size="text-lg" color="text-main" title="الأمان والخصوصية" />
                    <Paragraph description="حفاظ على بياناتك الشخصية بكل أمان وخصوصية." />
                  </div>
                </div>
              </Container>
            </div>

            <div className="flex justify-center items-center">
              <img src="/Placeholder Image.png" alt="Features Image" className="rounded-lg shadow-md" />
            </div>

            <div className="flex flex-col gap-5">
              <Container className="p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-3">
                  <FaCogs />
                  <div>
                    <Head1 size="text-lg" color="text-main" title="التخصيص" />
                    <Paragraph description="تحكم كامل في إعدادات المنصة لتتناسب مع احتياجاتك." />
                  </div>
                </div>
              </Container>

              <Container className="p-4 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-3">
                  <ChartLine />
                  <div>
                    <Head1 size="text-lg" color="text-main" title="المرونة وقابلية التوسع" />
                    <Paragraph description="منصتنا تدعم النمو والتوسع بسهولة." />
                  </div>
                </div>
              </Container>
            </div>
          </GridContainer>
          <div className=" py-8 w-full h-52 relative">
            <div className=" absolute top-1/2 -translate-y-1/2  z-20   flex flex-col gap-2 left-1/2 -translate-x-1/2">
              <Head1 title="  انضم لينا دلوقتي " size="text-2xl" className=" text-center" color=" text-white" />
              <div className="flex items-center gap-2">
                <Link href={"/login"}>
                  <Button>سجل دخول</Button>
                </Link>
                <Link href={"/signup"}>
                  <Button>أنشئ حساب </Button>
                </Link>
              </div>
            </div>
            <Image src={"/image (13).png"} fill alt="Background Image" className="object-cover" />
          </div>
          <GridContainer cols={3}>
            <Container className="p-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center gap-3">
                <FaLightbulb className="text-3xl text-main" />
                <div>
                  <Head1 size="text-lg" color="text-main" title="الإبداع والابتكار" />
                  <Paragraph description="نقدم حلول جديدة ومبتكرة باستمرار." />
                </div>
              </div>
            </Container>

            <Container className="p-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center gap-3">
                <FaHeadset className="text-3xl text-main" />
                <div>
                  <Head1 size="text-lg" color="text-main" title="دعم العملاء" />
                  <Paragraph description="فريق دعم متواجد دائمًا لمساعدتك." />
                </div>
              </div>
            </Container>

            <Container className="p-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center gap-3">
                <FaTachometerAlt className="text-3xl text-main" />
                <div>
                  <Head1 size="text-lg" color="text-main" title="السرعة في الأداء" />
                  <Paragraph description="تجربة مستخدم سريعة وسلسة." />
                </div>
              </div>
            </Container>
          </GridContainer>
        </MaxWidthWrapper>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
