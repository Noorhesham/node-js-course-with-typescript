import React from "react";

const MaxWidthWrapper = ({
  className,
  children,
  noPadding = false,
  style,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  style?: React.CSSProperties;
  id?: string;
}) => {
  return (
    <div
      id={id}
      style={style}
      className={`${className || ""} max-w-[1375px] w-full mx-auto ${
        noPadding ? " py-0" : "py-5 lg:py-12"
      }   px-5 md:px-10 lg:px-20`}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
