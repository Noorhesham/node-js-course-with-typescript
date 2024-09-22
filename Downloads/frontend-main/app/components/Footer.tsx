import React from "react";
import GridContainer from "./defaults/GridContainer";
import Logo from "./Logo";
import Link from "next/link";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="  text-xs lg:text-sm    ">
      <MaxWidthWrapper className="border-b border-main flex items-center md:flex-nowrap flex-wrap justify-between text-main">
        <Logo />
        <ul className=" flex items-center gap-1 md:gap-4 ">
          <Link href={`/contactus`}>تواصل معنا</Link>
          <Link href={`/aboutus`}> من نحن ؟</Link>
          <Link href={`/find-doctor`}>تصفح الدكاترة </Link>
        </ul>{" "}
        <div className="flex lg:flex-row items-center flex-col gap-2">
          <p className=" font-semibold text-center  text-main">
            كل الحقوق محفوظة لفريق<Link href={`/`}> @One More Light</Link>
          </p>
          <Button size={"sm"} className=" text-white">
            تواصل معنا
          </Button>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
