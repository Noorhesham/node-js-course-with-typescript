import Image from "next/image";
import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";
import GridContainer from "./GridContainer";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Heading from "./Heading";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-10 bg-violet-700">
      <MaxWidthWrapper>
        <GridContainer className="" cols={3}>
          <Logo size="lg" />

          <div className=" flex  py-2 gap-10 items-center justify-center">
            <div className=" w-20 h-20 relative">
              <Image alt="logo" src={"/Facebook_Logo_2023.png"} fill className=" object-contain" />
            </div>
            <div className=" w-20 h-20 relative">
              <Image alt="facebook" src={"/social-06-512.webp"} fill className=" object-contain" />
            </div>
          </div>
          <div className=" flex flex-col gap-2 items-end  text-right">
            <Heading
              title="منصة الشادي التعليمية
"
            />
            <Heading
              title=" أول منصة متخصصة فى اللغة العربية
"
            />
          </div>
          <div className=" col-span-full items-center flex justify-between">
            <p className="inline ">
              El Shady LMS © 2022 All Rights Reserved. | Designed by&nbsp;
              <Link className="inline underline mt-3 font-bold" href="https://noor-hesham-portfolio.vercel.app/">
                Noor Hesham
              </Link>
            </p>
            <div className=" flex items-center gap-4">
              <p>التواصل مع المنصة</p>
              <p>التواصل مع السنتر</p>
              <p>التواصل مع المستر</p>
            </div>
          </div>
        </GridContainer>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
