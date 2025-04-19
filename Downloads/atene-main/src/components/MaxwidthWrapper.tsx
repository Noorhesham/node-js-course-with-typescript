import React from "react";

const MaxWidthWrapper = ({
  className,
  children,
  noPadding = false,
  noPaddingX = false,
}: {
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  noPaddingX?: boolean;
}) => {
  return (
    <div
      className={`${className || ""} max-w-[1330px] w-full mx-auto ${noPadding ? " py-0" : "py-6 lg:py-12"}   ${
        noPaddingX ? "px-0" : "px-4 md:px-10"
      } `}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
