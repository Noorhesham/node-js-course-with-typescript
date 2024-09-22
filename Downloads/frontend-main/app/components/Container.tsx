import React from "react";

const Container = ({
  className,
  children,
  CustomePadding,
  onClick,href
}: {
  className?: string;
  children: React.ReactNode;
  CustomePadding?: string;
  onClick?: any;href?:string
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className || ""} ${
        onClick && "cursor-pointer"
      }  border border-input rounded-2xl shadow-sm ${CustomePadding || "md:py-5 px-3 py-1.5 md:px-8"}`}
    >
      {children}
    </div>
  );
};

export default Container;
