import React from "react";
import MotionItem from "./MotionItem";
import Paragraph from "./Paragraph";

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
  colorful?: string;
}) => {
  return (
    <MotionItem
      nohover
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" flex  capitalize flex-col items-center lg:items-end lg:gap-2"
    >
      {heighlight && <h2 className=" text-center lg:text-right text-2xl  ">{heighlight}</h2>}
      <h1
        className={` ${heighlight && "title"}   font-bold  text-4xl  leading-relaxed  lg:text-5xl  ${
          className || "xl:text-7xl"
        }`}
      >
        {text}{" "}
        {colorful && (
          <span className="after:bg-primary after:border-t-primary text-primary  relative after:-rotate-3 after:border-t-[3px] after:absolute after:h-3 after:w-full after:left-0 after:-bottom-5  after:border-t-1 after:rounded-[50%] ">
            {colorful}
          </span>
        )}
      </h1>
      {paragraph && <Paragraph text={paragraph} className=" mt-20" />}
    </MotionItem>
  );
};

export default LargeHeading;
