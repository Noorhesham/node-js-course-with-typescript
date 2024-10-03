import { getTranslations } from "next-intl/server";
import Head from "../components/Head";
import Paragraph from "../components/defaults/Paragraph";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import { LeafyGreenIcon, SearchIcon, BookOpenIcon, GlobeIcon } from "lucide-react";
import FlexWrapper from "../components/defaults/FlexWrapper";
import SwiperCards from "../components/SwiperCards";
import FeatureCard from "../components/FeatureCard";
import GridContainer from "../components/defaults/GridContainer";
import { Button } from "@/components/ui/button";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineSolution } from "react-icons/ai";
import { FaInnosoft } from "react-icons/fa";
import { GiFlexibleLamp } from "react-icons/gi";
import { AppleCardsCarouselDemo } from "../components/CardsCarousel";
import { cn } from "@/lib/utils";

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations();

  const features = [
    {
      Icon: LeafyGreenIcon,
      title: t("featureAboutUsTitle"),
      description: t("featureAboutUsDescription"),
    },
    {
      Icon: BookOpenIcon,
      title: t("featureCoursesTitle"),
      description: t("featureCoursesDescription"),
    },
    {
      Icon: GlobeIcon,
      title: t("featureGlobalReachTitle"),
      description: t("featureGlobalReachDescription"),
    },
  ];

  return (
    <section className="">
      <div
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-[35rem]"
      >
        <FlexWrapper className="py-36 items-center">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col gap-4 max-w-lg">
              <Head text={t("heroHead")} />
              <Paragraph description={t("heroDescription")} />
              <div className="bg-white overflow-hidden relative rounded-xl border-primary border-2">
                <div className="flex items-center justify-between py-2 px-4">
                  <input className="w-full outline-none" placeholder={t("searchPlaceholder")} type="text" />
                  <div className="flex p-2 absolute rounded-xl right-0 text-white justify-center items-center bg-blue-800">
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full md:w-[60%]">
            <SwiperCards
              autoplay
              contain className=" md:h-96 h-64"
              slidesPerView={1}
              items={[
                { src: "/training-courses-2025.webp" },
                { src: "/london.webp" },
                { src: "/Corporate -Retreats.webp" },
                { src: "/banner-Amsterdam.webp" },
              ]}
            />
          </div>
        </FlexWrapper>
      </div>

      <MaxWidthWrapper>
        <GridContainer cols={3}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </GridContainer>
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-5 py-10" cols={2}>
          <div className="flex flex-col gap-4">
          <Head className=" text-black" text={t("valuePropositionTitle")} />
          <Paragraph  className=" text-gray-700" description={t('valuePropositionText')}/>
          <Button className=" w-[30%]"> {t("continue")}</Button>
          </div>
          <div>
          <FeatureCard
      Icon={GrUserExpert} 
      title={t("features.expertInstructors")}
      description={t("features.expertInstructorsdesc")}
    />

    <FeatureCard
      Icon={AiOutlineSolution} 
      title={t("features.customSolutions")}
      description={t("features.customSolutionsdesc")}
    />

    <FeatureCard
      Icon={FaInnosoft} 
      title={t("features.innovativeLearning")}
      description={t("features.innovativeLearningdesc")}
    />

    <FeatureCard
      Icon={GiFlexibleLamp} 
      title={t("features.flexibleDelivery")}
      description={t("features.flexibleDeliverydesc")}
    />
    <FeatureCard
      Icon={LeafyGreenIcon} 
      title={t("features.resultsOriented")}
      description={t("features.resultsOrienteddesc")}
    />
          </div>
          </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper noPadding>
        <AppleCardsCarouselDemo/>
      </MaxWidthWrapper>
      <div className=" flex items-center justify-center" style={{ backgroundImage: "url(/bg-meirc-numbers.png)", backgroundSize: "cover",
         backgroundPosition: "center", backgroundRepeat: "no-repeat"  }}>
      <MaxWidthWrapper className={cn(" flex   mr-auto",locale==="ar"?" justify-end":"")}>
      <div className=" self-end w-fit">
      <Head className=" text-black" text={t("valuePropositionTitle")} />
      <Paragraph  className=" text-gray-700" description={t('valuePropositionText')}/>
      <GridContainer className=" max-w-2xl mt-4" cols={3}>
        <div className="  px-4 py-2 bg-white shadow-md">
          <h1 className=" font-semibold text-blue-950 ">65+</h1>
          <p>Years of Experience</p>
        </div>
        <div className="  px-4 py-2 bg-white shadow-md">
          <h1 className=" font-semibold text-blue-950 ">65+</h1>
          <p>Years of Experience</p>
        </div>
        <div className="  px-4 py-2 bg-white shadow-md">
          <h1 className=" font-semibold text-blue-950 ">65+</h1>
          <p>Years of Experience</p>
        </div>
        <div className="  px-4 py-2 bg-white shadow-md">
          <h1 className=" font-semibold text-blue-950 ">65+</h1>
          <p>Years of Experience</p>
        </div>
        <div className="  px-4 py-2 bg-white shadow-md">
          <h1 className=" font-semibold text-blue-950 ">65+</h1>
          <p>Years of Experience</p>
        </div>
        <div className="  px-4 py-2 bg-white shadow-md">
          <h1 className=" font-semibold text-blue-950 ">65+</h1>
          <p>Years of Experience</p>
        </div>
      </GridContainer>
      </div>
        </MaxWidthWrapper>
      </div>

    </section>
  );
}
