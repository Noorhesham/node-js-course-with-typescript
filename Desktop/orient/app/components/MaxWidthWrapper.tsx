import React from "react";

const MaxWidthWrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`${className || ""} max-w-screen-[1375px] w-full mx-auto px-2.5 md:px-20`}>{children}</div>;
};

export default MaxWidthWrapper;
