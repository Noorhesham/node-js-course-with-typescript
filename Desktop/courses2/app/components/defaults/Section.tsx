import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import cookies from "js-cookie";
import MotionItem from "./MotionItem";
import Head1 from "../Head1";
import MotionContainer from "./MotionContainer";

const Section = ({
  heading,
  link,
  children,
  linkText,
  className,
  headingColor,
  paragraph,
  CustomePadding,
  id,
}: {
  heading?: string;
  link?: string;
  children: React.ReactNode;
  linkText?: string;
  className?: string;
  headingColor?: string;
  paragraph?: string;
  CustomePadding?: string;
  id?: string;
}) => {
  const locale = cookies.get("NEXT_LOCALE");
  console.log(locale?.trim() === "ar");
  return (
    <section id={id} className={`${className || ""}  `}>
      <div className=" flex flex-col items-stretch  w-full ">
        <MotionContainer className="flex flex-row items-center justify-between">
          {heading && <Head1 size="sm" text={heading} />}
          {paragraph && (
            <MotionItem nohover className=" text-sm sm:text-lg text-[20px] text-[#0D3B6F]">
              {paragraph}
            </MotionItem>
          )}
          {link && (
            <Link
              href={link}
              className={`text-[#E6007E] text-xs md:text-sm font-semibold flex flex-row items-center gap-1 md:gap-2 ${
                locale?.trim() === "ar" ? "flex-row-reverse" : " "
              }`}
            >
              {linkText} <ArrowRight className=" md:w-5 md:h-5 w-3 h-3" />
            </Link>
          )}
        </MotionContainer>
        {children}
      </div>
    </section>
  );
};

export default Section;
