import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Section = ({
  heading,
  link,
  children,
  linkText,
  className,
  headingColor,
  paragraph,
  CustomePadding,
}: {
  heading?: string;
  link?: string;
  children: React.ReactNode;
  linkText?: string;
  className?: string;
  headingColor?: string;
  paragraph?: string;
  CustomePadding?: string;
}) => {
  return (
    <section className={`${className || ""} ${CustomePadding || "lg:px-20 px-5 md:px-10 py-8 lg:py-16"} `}>
      <MaxWidthWrapper>
        <div className="flex sm:flex-row flex-col justify-between">
          {heading && (
            <h1
              className={` text-2xl text-nowrap md:text-3xl  ${
                headingColor ? `text-[${headingColor}]` : "text-[#0D3B6F]"
              }   font-[700]`}
            >
              {heading}
            </h1>
          )}
          {paragraph && <p className="text-lg text-[20px] text-[#0D3B6F]">{paragraph}</p>}
          {link && (
            <Link
              href={link}
              className="text-[#E6007E] text-xs md:text-sm font-semibold flex items-center gap-1 md:gap-2"
            >
              {linkText} <ArrowRight  className=" md:w-5 md:h-5 w-3 h-3" />
            </Link>
          )}
        </div>
        {children}
      </MaxWidthWrapper>
    </section>
  );
};

export default Section;
