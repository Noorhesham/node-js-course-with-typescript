import About from "@/app/components/About";
import FindDoctor from "@/app/components/FindDoctor";
import FlexWrapper from "@/app/components/FlexWrapper";
import GridContainer from "@/app/components/GridContainer";
import Head1 from "@/app/components/Head1";
import Heading from "@/app/components/Heading";
import { CheckIcon, CloudUploadIcon, PersonAdd, PlayIcon, SearchIcon } from "@/app/components/Icons";
import InfoCard from "@/app/components/InfoCard";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import Paragraph from "@/app/components/Paragraph";
import SwiperCards from "@/app/components/SwiperCards";
import VideoZoom from "@/app/components/VideoZoom";
import Widget from "@/app/components/Widget";
import Image from "next/image";
import { FaBriefcase } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export default function Home() {
  return (
    <main>
      <section
        className={`w-full h-screen bg-no-repeat bg-cover  `}
        style={{
          backgroundImage: `url('/cover1.jpg')`,
          backgroundPosition: "center",
          padding: "0px 0px 0px 0px",
          zIndex: 1,
        }}
      >
        <div className="w-full h-screen bg-[#224982] bg-opacity-30 absolute inset-0 z-10"></div>
        <MaxWidthWrapper className=" flex-col items-center justify-center w-full h-full">
          <div className="   h-full z-10 relative flex gap-4 md:gap-8 lg:gap-12 xl:mt-10 flex-col items-center justify-center">
            <Heading
              btnText="START HIRING NOW"
              text="HIRE SMARTER , GROW FASTER"
              title2={`With Egypt’s #1 Online Recruitment Platform`}
            />
            <GridContainer cols={4}>
              <Widget title="1,75,32" subTitle="LIVE JOB" icon={<FaBriefcase className=" w-8 h-8" />} />
              <Widget title="97,354" subTitle="Companies" icon={<HiOutlineBuildingOffice2 className=" w-8 h-8" />} />
              <Widget title="38,47,154" subTitle="Candidates" icon={<GoPeople className=" w-8 h-8" />} />
              <Widget title="7,532" subTitle="New Jobs" icon={<FaBriefcase className=" w-8 h-8" />} />
            </GridContainer>
          </div>
        </MaxWidthWrapper>
      </section>
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
      <FindDoctor />
      <About />
      <div className="bg-[#F2F5FF]">
        <MaxWidthWrapper>
          <div className=" flex flex-col gap-5 my-10">
            <Head1 text="HOW DOCTOR NURSE WORK" />
            <GridContainer motion className=" relative mt-5" cols={4}>
              <InfoCard
                arrow
                Icon={PersonAdd}
                title="Create account"
                description="Lorem ipsum dolor sit amet consecteturlametcteturl"
              />

              <InfoCard
                arrow
                reverse
                Icon={CloudUploadIcon}
                title="Search or post a job"
                description="Lorem ipsum dolor sit amet consecteturlametcteturl"
                iconBgColor="bg-main"
              />
              <InfoCard
                arrow
                Icon={SearchIcon}
                title="Hold meetings"
                description="Lorem ipsum dolor sit amet consecteturlametcteturl"
              />
              <InfoCard
                Icon={CheckIcon}
                title="Send an initial job offer"
                description="Lorem ipsum dolor sit amet consecteturlametcteturl"
              />
            </GridContainer>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <section className="flex  lg:flex-row flex-col items-center gap-5 ">
          <div className=" rounded-2xl flex-1 overflow-hidden aspect-square relative w-full h-full">
            <Image alt="image" fill className="object-contain " src={"/docround.jpg"} />
          </div>
          <div className="flex flex-col items-start gap-10 justify-between  flex-1">
            <div className="flex flex-col items-start">
              <h3 className=" text-main2 text-lg uppercase font-medium my-1">Are you an employer?</h3>
              <Head1 alignment="left" className=" text-left" text="Control your hiring process from start to finish" />
              <Paragraph
                description="The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus. 
anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. Aenean tincidunt id mauris id auctor. Donec at ligula lacus. Nulla dignissim mi quis neque interdum, quis porta sem finibus."
              />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
