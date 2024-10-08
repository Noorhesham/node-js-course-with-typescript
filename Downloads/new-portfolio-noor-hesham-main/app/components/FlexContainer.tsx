import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const FlexContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <MaxWidthWrapper className={`${className || ""} `}>
     <div className="flex flex-col lg:flex-row  justify-between pt-40">
     {children}
     </div>
    </MaxWidthWrapper>
  );
};

export default FlexContainer;
