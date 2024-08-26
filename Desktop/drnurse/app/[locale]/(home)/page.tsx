import CardContainer from "@/app/components/CardContainer";
import DownloadButtons from "@/app/components/DownloadButtons";
import FlexWrapper from "@/app/components/FlexWrapper";
import GridContainer from "@/app/components/GridContainer";
import Head1 from "@/app/components/Head1";
import Heading from "@/app/components/Heading";
import { PlayIcon } from "@/app/components/Icons";
import JobCard from "@/app/components/JobCard";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Paragraph from "@/app/components/Paragraph";
import Search from "@/app/components/Search";
import SwiperCards from "@/app/components/SwiperCards";
import VideoZoom from "@/app/components/VideoZoom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main>
      <section
        className={`w-full h-screen bg-no-repeat bg-cover  `}
        style={{
          backgroundImage: `url('/job.jpg')`,
          backgroundPosition: "center",
          padding: "0px 0px 0px 0px",
          zIndex: 1,
        }}
      >
        <div className="w-full h-screen bg-[#224982] bg-opacity-30 absolute inset-0 z-10"></div>
        <MaxWidthWrapper className=" flex-col items-center justify-center w-full h-full">
          <div className="   h-full z-10 relative flex gap-4 md:gap-8 lg:gap-12 xl:mt-10 flex-col items-center justify-center">
            <Heading text="FIND YOUR JOB" title2={`Search for more than 5,000+ jobs worldwide`} />
            <Search />
          </div>
        </MaxWidthWrapper>
      </section>{" "}
      <MaxWidthWrapper className=" mt-10 flex flex-col gap-20">
        <div className="flex flex-col gap-5">
          <Head1 text="Join Sudia arabic 's Top Hospitals" />
          <SwiperCards
            autoplay={true}
            slidesPerView={5.3}
            className="h-36"
            contain
            items={[
              { src: "/logo13.png", left: true },
              { src: "/logo12.png" },
              { src: "/logo9.png" },
              { src: "/logo8.png", cover: true },
              { src: "/logo7.png" },
              { src: "/logo1.png" },
              { src: "/logo5.png" },
              { src: "/logo2.png" },
              { src: "/logo3.png" },
              { src: "/logo4.png" },
            ]}
          />
        </div>
        <FlexWrapper className=" h-full">
          <div className="  rounded-[2.5rem] overflow-hidden flex-1 relative aspect-square">
            <VideoZoom
              btn={
                <div className="cursor-pointer absolute z-10 top-3 right-3">
                  <PlayIcon />
                </div>
              }
              content={
                <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/QczGoCmX-pI?si=agurhHubDIgVjErj"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    frameBorder="0"
                  ></iframe>
                </div>
              }
            />
            <Image alt="image" fill className="object-cover " src={"/doc2.jpg"} />
          </div>
          <div className="  rounded-[2.5rem] overflow-hidden flex-1  relative aspect-square">
            <VideoZoom
              btn={
                <div className=" cursor-pointer absolute z-10 top-3 right-3">
                  <PlayIcon />
                </div>
              }
              content={
                <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/QczGoCmX-pI?si=agurhHubDIgVjErj"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    frameBorder="0"
                  ></iframe>
                </div>
              }
            />
            <Image alt="image" fill className="object-cover w-full h-full " src={"/doc1.jpg"} />
          </div>
        </FlexWrapper>
      </MaxWidthWrapper>
      <div className="bg-[#F2F5FF]">
        <MaxWidthWrapper>
          <Head1
            paragraph="We are looking for an outstanding Surgical Nurse to join our medical team. The main role of a surgical nurse is to provide high-quality care to patients before, during and after surgical procedures.s"
            text="CURRENT JOB UPDATES"
          />
          <div className=" grid-cols-1 grid gap-5 lg:grid-cols-2 mt-3">
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
            <JobCard heading="Junior Nurse in AL Madinahs" />
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <Head1
          paragraph="We are looking for an outstanding Surgical Nurse to join our medical team. The main role of a surgical nurse is to provide high-quality care to patients before, during and after surgical procedures."
          text="Find your job
          according to your specialty"
          headingClasses=" max-w-lg"
        />
        <GridContainer className=" mt-4" cols={5}>
          <div className=" w-full h-72 relative">
            <Image fill alt="image" src={"/ob1.png"} className=" object-contain" />
          </div>
          <div className=" w-full h-72 relative">
            <Image fill alt="image" src={"/ob2.png"} className=" object-contain" />
          </div>
          <div className=" w-full h-72 relative">
            <Image fill alt="image" src={"/ob3.png"} className=" object-contain" />
          </div>
          <div className=" w-full h-72 relative">
            <Image fill alt="image" src={"/ob4.png"} className=" object-contain" />
          </div>
          <div className=" w-full h-72 relative">
            <Image fill alt="image" src={"/ob5.png"} className=" object-contain" />
          </div>
        </GridContainer>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Head1 text="IMPORTANT KEYWORDS" />
        <GridContainer cols={5} className=" gap-3 mt-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardContainer customPadding=" px-6 py-3" className="flex font-medium  flex-col">
              <p className=" text-muted-foreground">120 JOBS</p>
              <p className="  leading-5  text-gray-800  text-base">Find job Plastic surgry doctor in Jeddah, KSA</p>
            </CardContainer>
          ))}
        </GridContainer>
        <div className=" relative mt-20">
          <div className="  hidden lg:block lg:w-[34rem] aspect-square absolute -left-10 lg:-left-20 z-20 -top-10">
            <Image alt="image" fill className="object-contain" src={"/phone.png"} />
          </div>
          <div className="w-full   relative h-full lg:h-[430px] flex justify-center items-center">
            <Image alt="image" fill className=" object-cover lg:object-contain rounded-[2.5rem]   object-right-top" src={"/bg.jpg"} />
            <div className="flex p-4 max-w-xl relative lg:top-24 lg:left-[40%]  lg:absolute z-30 flex-col gap-5">
              <h1 className=" text-white text-3xl font-semibold">DOWNLOAD THE APP</h1>
              <p className=" text-gray-50">
                Download the application and enjoy the best services and features Download the application and enjoy the
                best services and features
              </p>
              <div className=" flex items-center">
                <DownloadButtons />
              </div>
            </div>
          </div>
          <div className="  block lg:hidden w-[20rem] mx-auto aspect-square relative  z-20">
            <Image alt="image" fill className="object-contain" src={"/phone.png"} />
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <section className="flex   lg:flex-row-reverse flex-col items-center gap-5 ">
          <div className=" rounded-2xl flex-1 overflow-hidden aspect-square relative w-full h-full">
            <Image alt="image" fill className="object-contain " src={"/bg3.jpg"} />
          </div>
          <div className="flex flex-col items-start gap-10 justify-between  flex-1">
            <div className="flex flex-col items-start">
              <h3 className=" text-main2 uppercase text-lg font-medium my-1">Are you an employer?</h3>
              <Head1 alignment="left" className=" text-left" text="Find a health professional" />
              <Paragraph
                description="The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. 
anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus."
              />
              <Button className=" mt-2">
                <Link href={"/hospital"}>GET STARTED</Link>
              </Button>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
