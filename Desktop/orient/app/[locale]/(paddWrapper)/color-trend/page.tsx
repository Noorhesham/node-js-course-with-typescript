import localfont from "@next/font/local";
import BreadCrumb from "../../../components/BreadCrumb";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import { Neonderthaw } from "next/font/google";
import Image from "next/image";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import CardHuge from "../../../components/CardHuge";
import Heading from "../../../components/Heading";
import LinkButton from "../../../components/LinkButton";
import ZoomImage from "../../../components/ZoomImage";
const inter = Neonderthaw({ subsets: ["latin"], weight: "400" });

const page = () => {
  return (
    <main className=" py-40 min-h-screen  ">
      <BreadCrumb />
      <section className=" relative min-h-screen">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('/trend.png')`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
        <div className="absolute z-10 top-[15%] left-1/2 -translate-x-1/2 flex flex-col">
          <h1 className={`${inter.className} font-bold    text-center text-[7rem] text-gray-50`}>Brown Color</h1>
          <div className="flex  z-10 items-center justify-center gap-3">
            <div className=" w-20 bg-white h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#7F4222] h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#D9D9D9] h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#BA6E46] h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#D7C3A6] h-20 aspect-square rounded-full border-white border-[3px]"></div>
          </div>
        </div>
      </section>

      <MaxWidthWrapper className=" mt-5">
        <div className=" flex justify-center gap-10 items-start py-5  ">
          <div className=" flex text-amber-700 flex-col items-start">
            <p className=" text-xs">ABOUT COLOR</p>
            <h1 className=" text-3xl font-semibold uppercase max-w-[20rem] ">burgundy color is a color of life</h1>
          </div>
          <p className=" ml-10 flex-grow text-black text-sm leading-5 max-w-xl  ">
            UC developments is an investment entity that was established through an alliance and merger of a number of
            real estate expertise working in the field of real estate investment, engineering, architectural, marketing
            consulting, and project management in the Egyptian market spanning more than 20 years and owns more than 70
            real estate projects in many areas such as Heliopolis, New Cairo and 6th of October. UC developments is an
            investment entity that was established through an alliance and merger of a number of real estate expertise
            working in the field of real estate investment, engineering, architectural, marketing consulting, and
            project management in the Egyptian market spanning more than 20 years and owns more than 70 real estate
            projects in many areas such as Heliopolis, New Cairo and 6th of October.
          </p>
        </div>
        <div className="  mx-auto ml-32 h-[616px] gap-3 grid grid-rows-2 relative grid-cols-7">
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" relative rounded-lg w-full h-full col-span-2">
                <Image className=" rounded-lg w-full h-full absolute object-cover" fill src="/brown4.png" alt="" />
              </div>
            }
          />
          <div className=" w-full rounded-lg h-full relative col-span-2">
            <Image className=" rounded-lg w-full h-full absolute object-cover" fill src="/brown (2).png" alt="" />
          </div>
          <div className=" col-span-3 relative row-span-2 ">
            {" "}
            <Image
              className=" rounded-lg w-full h-full absolute object-left object-contain"
              fill
              src="/brown.png"
              alt=""
            />
          </div>
          <div className=" w-full rounded-lg h-full relative col-span-4 ">
            {" "}
            <Image
              className=" mb-auto rounded-lg w-full h-full absolute  object-top object-cover"
              fill
              src="/brown3.png"
              alt=""
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className=" flex items-center    mt-[128px]">
        <div className=" flex-grow  min-w-[563px] h-[435px] relative">
          <Image src={"/chair.png"} alt="" fill className=" object-cover" />
        </div>
        <Section link="#" className="mt-[79px] " heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
          <div className="  grid grid-cols-3 items-center gap-5 mt-[62px] ">
            <Card width="w-44 h-44" color="#CA0096" text={`putty (acrylic 1000) 233`} img="Image.svg">
              <p className="text-[#CA0096] font-semibold text-sm uppercase">442.12 EGP</p>
            </Card>

            <Card
              width="w-44 h-44"
              className=" text-sm"
              color="#EB9A26"
              text={`putty (acrylic 1000) 233`}
              img="Image (5).svg"
            >
              <p className="text-[#CA0096] font-semibold text-sm uppercase">442.12 EGP</p>
            </Card>
            <Card
              width="w-44 h-44"
              className=" text-sm"
              color="#EFDB04"
              text={`putty (acrylic 1000) 233`}
              img="Image (6).svg"
            >
              <p className="text-[#CA0096] font-semibold text-sm uppercase">442.12 EGP</p>
            </Card>
          </div>
        </Section>
      </div>
      <MaxWidthWrapper className=" flex pb-[89px] flex-col items-center justify-center">
        <Heading
          mainText="DISCOVER THE MOST IMPORTANT"
          subText="ARTICLES ABOUT PAINTS"
          paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio, similique adipisci iure tempora harum
        voluptatum unde magni pariatur expedita ullam reprehenderit corporis! Alias beatae quasi dolore nulla officiis
        rerum."
        />
        <div className=" flex gap-3 items-center ">
          <CardHuge />
          <CardHuge />
          <CardHuge />
        </div>
        <div className=" mt-[50px] ">
          <LinkButton text="BROWSE ALL BLOG" href="/blog" />
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
