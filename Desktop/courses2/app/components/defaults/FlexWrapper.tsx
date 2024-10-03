import { cn } from "@/lib/utils";
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
  const content = <div className={cn("flex gap-5 flex-col md:flex-row lg:gap-10", className)}>{children}</div>;

  if (max) {
    return <MaxWidthWrapper noPadding>{content}</MaxWidthWrapper>;
  }

  return content;
};

export default FlexWrapper;
