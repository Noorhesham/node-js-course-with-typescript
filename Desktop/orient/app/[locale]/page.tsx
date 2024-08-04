import Image from "next/image";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import ImageSlider from "../components/ImageMainSlider";
import Section from "../components/Section";
import Card from "../components/Card";
import SwiperCards from "../components/SwiperCards";
import Heading from "../components/Heading";
import CardHuge from "../components/CardHuge";
import LinkButton from "../components/LinkButton";
import Link from "next/link";
import ModalCustom from "../components/ModalCustom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiCalculator2 } from "react-icons/ci";
import dynamic from "next/dynamic";
const MotionContainer = dynamic(() => import("../components/MotionContainer"), {
  ssr: false,
});
export default function Home() {
  return (
    <main style={{padding: "0px 0px !important"}} className="">
      <section className="relative h-full min-h-[110vh] w-full">
        <ImageSlider />
        {/* <div className=" relative z-10">
          <MaxWidthWrapper>
            <div className=" py-28 flex flex-col relative">
              <h1 className={`${NalikaSignature.className} text-center text-[15rem] text-gray-50`}>orient paints</h1>
              <h2 className=" absolute text-4xl font-semibold  uppercase  right-[20%]  bottom-[27%] text-gray-50">
                Mastering paints since 1946
              </h2>
            </div>
          </MaxWidthWrapper>
        </div> */}
      </section>
      <Section link="#" className="mt-10 min-h-[30vh]" heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
        <MotionContainer className="sm:grid flex flex-col  sm:grid-cols-2 lg:grid-cols-4 items-center gap-5 mt-[62px] justify-center">
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
        </MotionContainer>
      </Section>
      <div className=" relative mt-2">
        <SwiperCards
          items={[
            { src: "/Rectangle 156397.png", text: "INTERIOR" },
            { src: "/Rectangle 156397 (2).png", text: "EXTERIOR" },
            { src: "/Rectangle 156397 (1).png", text: "METAL" },
            { src: "/Rectangle 156397 (6).png", text: "WOOD" },
            { src: "/Rectangle 156397 (1).png", text: "ANY" },
          ]}
        />
      </div>
      <MaxWidthWrapper>
        <div className=" flex flex-wrap justify-center pb-10 items-center gap-[121px] mt-[60px]">
          <Link href={"/color-trend"} className=" flex gap-3 ">
            <div className=" flex flex-col  items-center gap-2">
              <div className=" rounded-full w-44 h-44 relative">
                <Image src={"/Ellipse 860.svg"} fill className="rounded-full object-cover" alt="" />
              </div>
              <h1 className="  text-2xl text-main2 font-[500] mt-4 ">COLOR TRENDS</h1>
            </div>
          </Link>

          <Link href={"/get-inspired"} className=" flex gap-3 ">
            <div className=" flex flex-col  items-center gap-2">
              <div className=" rounded-full w-44 h-44 relative">
                <Image src={"/Rectangle 156397.png"} fill className="rounded-full object-cover" alt="" />
              </div>
              <h1 className="  text-2xl text-main2 font-[500] mt-4 ">GET INSPIRED</h1>
            </div>
          </Link>
          <ModalCustom
            title="CALCULATE THE QUANTITY"
            btn={
              <>
                <div className=" cursor-pointer flex gap-3 ">
                  <div className=" flex flex-col  items-center gap-2">
                    <div className=" rounded-full w-44 h-44 relative">
                      <Image src={"/Ellipse 860.png"} fill className="rounded-full object-cover" alt="" />
                    </div>
                    <h1 className="  text-2xl text-main2 font-[500] mt-4 ">PAINT CALCULATOR</h1>
                  </div>
                </div>
              </>
            }
            desc="THE NUMBER OF PAINT SHEET USERD IS"
            span={"15 SHEETS"}
            functionalbtn={
              <Button className=" hover:bg-white hover:text-main2 border border-main2 text-xs font-medium rounded-full flex  items-center gap-2 px-6  bg-main2">
                <CiCalculator2 />
                CALCULATE
              </Button>
            }
            content={
              <div className=" flex-col flex py-5 px-20  mt-5">
                <Input placeholder="NUMBER OF METERS" className=" outline-gray-900 placeholder:text-gray-900" />
              </div>
            }
          />
        </div>
      </MaxWidthWrapper>
      <div className=" mt-[60px]">
        <div
          style={{
            height: "530px",
            backgroundImage: "url('/Rectangle 12333.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className=" w-full bg-contain lg:bg-cover  h-[630px] relative"
        >
          <div className=" hidden lg:block absolute inset-0 w-[97%] h-[20%] lg:h-[483px] top-1/2 lg:top-[5%] left-1/2 -translate-x-1/2 border-[3px] border-gray-100"></div>
        </div>
      </div>
      <Section headingColor="#E6007E" heading="PARKOSTIAN" className="relative mt-[60px]">
        <div className="  mt-[17px]">
          <p className=" xl:translate-x-1/2 z-10 relative mt-5 lg:mt-[60px] max-w-[810px] text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="  w-[300px] lg:w-[345px]   h-full top-[14.2rem] md:top-[12.3rem] left-10 lg:left-[12rem]  absolute">
            <Image src={"/brown.svg"} fill className=" object-contain lg:object-cover" alt="" />
          </div>
        </div>
      </Section>
      <div className=" px-3">
        <div className=" mt-[40px]   grid grid-cols-6 gap-[4px]">
          <div className=" w-full  h-[157px] bg-[#55402D]"></div>
          <div className=" w-full  h-[157px] bg-[#A7835E]"></div>
          <div className=" w-full ml-15 h-[157px] bg-[#A7835E]"></div>
          <div className=" w-full h-[157px] bg-[#4D3A2A]"></div>
          <div className=" w-full h-[157px] bg-[#73573F]"></div>
          <div className=" w-full h-[157px] bg-[#A9835E]"></div>
        </div>
      </div>
      <MaxWidthWrapper className=" mt-14 lg:mt-20 flex pb-[89px] flex-col items-center justify-center">
        <Heading
          mainText="DISCOVER THE MOST IMPORTANT"
          subText="ARTICLES ABOUT PAINTS"
          paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio, similique adipisci iure tempora harum
        voluptatum unde magni pariatur expedita ullam reprehenderit corporis! Alias beatae quasi dolore nulla officiis
        rerum."
        />
        <div className=" grid grid-cols-1 lg:grid-cols-3 mx-auto gap-3 items-center ">
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
}
