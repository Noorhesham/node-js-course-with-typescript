import React, { ReactNode } from "react";

const SpcialButton = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <button
      className={`${className}  relative  cursor-pointer  h-full flex rounded-r-full w-[240px]  text-main2  items-stretch text-sm`}
    >
      <img className=" z-20 w-9 lg:w-12 relative" src="/q.svg" alt="" />
      <div className=" bg-main w-full !h-full flex items-center justify-center   px-8  self-center  rounded-r-full ">
        <div className="flex flex-col items-center my-auto">{children}</div>
      </div>
    </button>
  );
};

export default SpcialButton;
