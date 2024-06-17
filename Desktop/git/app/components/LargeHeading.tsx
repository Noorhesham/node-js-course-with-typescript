import React from "react";

const LargeHeading = ({
  text,
  paragraph,
  className,
  heighlight,
  colorful,
}: {
  text: string;
  paragraph?: string;
  className?: string;
  heighlight?: string;
  colorful: string;
}) => {
  return (
    <div className=" flex  capitalize flex-col items-center lg:items-start lg:gap-2">
      {heighlight && <h2 className=" text-2xl text-1 ">{heighlight}</h2>}
      <h1
        className={` ${heighlight && "title"}   text-2 font-bold  text-3xl  leading-relaxed  lg:text-5xl  ${
          className || "xl:text-7xl"
        }`}
      >
        {text}{" "}
        <span className=" text-1 relative after:-rotate-6 after:border-t-[6px] after:absolute after:h-4 after:w-full after:left-0 after:-bottom-5  after:border-t-1 after:rounded-[50%] ">
          {colorful}
        </span>
      </h1>
      <p className=" mt-8 dark:text-gray-400 text-2 leading-7"> {paragraph} </p>
    </div>
  );
};

export default LargeHeading;
