import React from "react";
import GridContainer from "./GridContainer";
import Logo from "./Logo";
import Socials from "./Socials";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import DownloadButtons from "./DownloadButtons";
import FlexWrapper from "./FlexWrapper";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className=" relative">
      <Image
        className=" lg:block hidden w-full  -z-10 absolute left-0 -top-20"
        width={800}
        height={400}
        alt="footer"
        src={"/footershape.svg"}
      />
      <div className="lg:block hidden w-6 h-6 rounded-full bg-main2 absolute top-10 z-30 left-[30%]"></div>
      <div className=" relative ">
        <div className="  hidden lg:block z-[-1] absolute w-full h-full inset-0">
          <Image src={"/footer.svg"} alt="footer" fill className=" object-top object-cover" />
        </div>
        <MaxWidthWrapper className=" flex z-10 lg:bg-none  bg-gradient-to-b from-[#224982] to-[#0C1D37]  flex-col items-start   lg:pt-40">
          <GridContainer className=" pb-5  border-white border-b-2 justify-between  gap-20 " cols={11}>
            <div className=" col-span-4 lg:col-span-3 flex flex-col  items-center">
              <Logo size="lg" />
              <Socials />
            </div>
            <div className=" col-span-2">
              <ul className="  text-white flex flex-col gap-3 lg:list-disc">
                <li>{t("aboutus")}</li>
                <li>{t("contactus")}</li>
                <li>{t("ourblog")}</li>
                <li>{t("pricing")}</li>
                <li>{t("solutions")}</li>
                <li>{t("agree")}</li>
                <li>{t("testimonials")}</li>
              </ul>
            </div>
            <div className=" col-span-2">
              <ul className="  text-white flex flex-col gap-3 lg:list-disc">
                <li>{t("aboutus")}</li>
                <li>{t("contactus")}</li>
                <li>{t("ourblog")}</li>
                <li>{t("pricing")}</li>
                <li>{t("solutions")}</li>
                <li>{t("agree")}</li>
                <li>{t("testimonials")}</li>
              </ul>
            </div>
            <div className=" col-span-3 flex flex-col items-start">
              <h1
                className=" text-white  mb-3 after:w-full after:left-[110%] after:top-1/2 after:rounded-2xl after:bg-white after:absolute after:h-[2px] 
          relative text-xl"
              >
                {t("jobs")}
              </h1>
              <ul className="  text-white flex flex-col gap-3 lg:list-disc">
                <li>{t("senior")}</li>
                <li>{t("jr")}</li>
                <li>{t("predicate")}</li>
                <li>{t("fresh")}</li>
                <li>{t("mad")}</li>
                <li>{t("predicate")}</li>
              </ul>
            </div>
          </GridContainer>
          <FlexWrapper className=" w-full pt-5 flex justify-between items-center">
            <p className=" basis-[70%] text-gray-100">{t("copyright")}</p>

            <div className="flex self-end  w-full lg:basis-[30%] items-center gap-3">
              <DownloadButtons />
            </div>
          </FlexWrapper>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
