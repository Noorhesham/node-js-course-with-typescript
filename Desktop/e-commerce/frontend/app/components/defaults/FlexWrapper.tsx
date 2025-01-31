import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

interface FlexWrapperProps {
  className?: string;
  children: React.ReactNode;
  max?: boolean;
  href?: string;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ className, children, max = true, href }) => {
  const content = <div className={`flex gap-5 w-full flex-col md:flex-row lg:gap-8 ${className || ""}`}>{children}</div>;

  if (max) {
    return <MaxWidthWrapper >{content}</MaxWidthWrapper>;
  }

  return content;
};

export default FlexWrapper;
