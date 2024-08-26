import { cn } from "@/lib/utils";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const FlexWrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper noPadding className={cn("flex gap-5 flex-col lg:flex-row lg:gap-10 ", className)}>
      {children}
    </MaxWidthWrapper>
  );
};

export default FlexWrapper;
