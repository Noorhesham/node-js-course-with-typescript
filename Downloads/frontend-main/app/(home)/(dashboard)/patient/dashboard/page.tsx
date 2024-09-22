import CircleProgress from "@/app/components/Circular";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/defaults/Head1";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import MotionItem from "@/app/components/defaults/MotionItem";
import SwiperCards from "@/app/components/SwiperCards";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const page = () => {
  return (
    <main className=" pb-10">
      <GridContainer className=" gap-5" cols={6}>
        <MaxWidthWrapper className=" col-span-full md:col-span-4  rounded-2xl bg-gradient-to-br from-sky-300 to-indigo-600 relative ">
          <MotionItem
            nohover
            initial={{ scale: 1 }}
            animate={{ scale: [1, 0.9, 1.1, 0.9, 1] }}
            transition={{
              duration: 1.5,
              times: [0, 0.2, 0.4, 0.6, 1],
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="  relative   w-full h-64"
          >
            <Image src="/heart2.png" className=" object-contain" alt="doctor" fill />
          </MotionItem>
          <Head1 title="متابعة حالتك الصحية" color=" text-white" className=" absolute bottom-10 right-5" />
          <div className="glass-white-1  absolute left-5 top-10  z-10 px-8 py-4 flex flex-col items-center justify-center  rounded-2xl">
            <Head1 title="  مواعيد الادوية" size=" text-xl" className=" text-right ml-auto mb-2" color=" text-white" />
            <ul className=" flex items-start flex-col  text-gray-100  ">
              <li>اليوم الظهر panadoal</li>
              <li>قبل النوم بساعتين قرصين دواء</li>
              <li>لا تنسي اخاك</li>
              <li>ترعاه يداك</li>
            </ul>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="  border-2 shadow-md border-input  rounded-2xl max-h-96 overflow-y-scroll col-span-3 md:col-span-2">
          <div>
            <div>
              <Head1
                title="   نصائح اليوم !"
                size=" text-xl"
                thickness="  font-semibold"
                className=" text-right ml-auto mb-2"
                color=" text-gray-900"
              />
              <ol className=" list-disc">
                <li>لا تنسي ان عدم شرب الماء كثيرا قد يدمر الكلي</li>
                <li>وظائف القلب تصير افضل مع تمرينات الكارديو</li>
                <li>احذر من قله النوم ! لا تقصر في نومك حتي لو علي حساب عملك يا زياد يوسف</li>
              </ol>
            </div>
            <div className=" w-full relative h-40">
              <Image src={"/bmo.gif"} alt="doctor" fill className="object-cover" />
            </div>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className=" bg-gradient-to-br from-sky-300 to-indigo-600/40    border-2 backdrop-blur-md shadow-md border-input rounded-2xl col-span-3">
          <div className=" flex flex-col gap-2">
            <Head1
              title=" اقتراحات الدكاترة"
              size=" text-xl"
              thickness="  font-semibold"
              className=" text-right ml-auto mb-2"
              color=" text-gray-50"
            />
            <SwiperCards
              slidesPerView={3.3}
              className=" h-32"
              items={[
                {
                  card: (
                    <div className=" flex items-center gap-2 flex-col">
                      <div className=" w-20 relative h-20 rounded-3xl overflow-hidden">
                        <Image src="/doctor6.png" alt="doctor" fill className="object-cover" />
                      </div>
                      <h3 className=" text-gray-50">دكتور بطة</h3>
                    </div>
                  ),
                },
                {
                  card: (
                    <div className=" flex items-center gap-2 flex-col">
                      <div className=" w-20 relative h-20 rounded-3xl overflow-hidden">
                        <Image src="/doctor6.png" alt="doctor" fill className="object-cover" />
                      </div>
                      <h3 className=" text-gray-50">دكتور بطة</h3>
                    </div>
                  ),
                },
                {
                  card: (
                    <div className=" flex items-center gap-2 flex-col">
                      <div className=" w-20 relative h-20 rounded-3xl overflow-hidden">
                        <Image src="/doctor6.png" alt="doctor" fill className="object-cover" />
                      </div>
                      <h3 className=" text-gray-50">دكتور بطة</h3>
                    </div>
                  ),
                },
                {
                  card: (
                    <div className=" flex items-center gap-2 flex-col">
                      <div className=" w-20 relative h-20 rounded-3xl overflow-hidden">
                        <Image src="/doctor6.png" alt="doctor" fill className="object-cover" />
                      </div>
                      <h3 className=" text-gray-50">دكتور بطة</h3>
                    </div>
                  ),
                },
              ]}
            />
            <Button variant={"secondary"} className=" rounded-full bg-gray-100/30 text-white mt-2">
              تصفح كل الدكاترة
            </Button>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className=" col-span-3">
          <div className=" rounded-2xl items-center border-2 border-input glass-white-1 px-8 py-4 flex flex-col gap-2">
            <Head1
              title="  نسبة التحسن"
              size=" text-xl"
              thickness="  font-semibold"
              className=" text-right ml-auto mb-2"
              color=" text-black"
            />
            <span className="absolute top-1/2 text-3xl font-semibold left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 z-30">50%</span>
            <CircleProgress value={50} />{" "}
          </div>
        </MaxWidthWrapper>
      </GridContainer>
    </main>
  );
};

export default page;
