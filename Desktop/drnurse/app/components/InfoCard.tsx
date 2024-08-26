import Image from "next/image";
import React from "react";
import MotionItem from "./MotionItem";
import { Arrow } from "./Icons";
import ArrowDrawingAnimation from "./AnimatedArrow";
const InfoCard = ({
  Icon,
  title,
  description,
  bgColor = " bg-transparent",
  iconBgColor = "bg-white",
  arrow,
  reverse,
}: {
  Icon: any;
  title: string;
  description: string;
  bgColor?: string;
  iconBgColor?: string;
  arrow?: boolean;
  reverse?: boolean;
}) => {
  return (
    <MotionItem
      nohover
      className={`flex hover:bg-white   relative duration-150 group gap-5 px-8 py-5 flex-col items-center ${bgColor} rounded-xl`}
    >
      {arrow && (
        <div
          style={reverse ? { transform: "rotate(180deg) scaleX(-1)", top: "70px", zIndex: 20 } : {}}
          className=" left-[62%] top-0 z-20 absolute w-full h-10"
        >
          <ArrowDrawingAnimation />
        </div>
      )}
      <div className={`rounded-full  p-3 ${iconBgColor}`}>
        <Icon />
      </div>
      <div className="flex flex-col text-center gap-1 items-center">
        <h2 className="text-black font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </MotionItem>
  );
};

export default InfoCard;
