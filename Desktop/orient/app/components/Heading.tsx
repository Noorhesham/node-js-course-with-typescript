import React from "react";
interface TextProps {
  className?: string;
  mainText: string;
  subText: string;
  MainTextColor?: string;
  SubTextColor?: string;
  paragraph?: string;
}
const Heading = ({ className, mainText, subText, MainTextColor, SubTextColor, paragraph }: TextProps) => {
  return (
    <div className={`${className} text-center flex flex-col max-w-[695px] `}>
      <h1 className={` text-3xl  lg:text-4xl uppercase font-bold ${MainTextColor ? `text-[${MainTextColor}]` : "text-[#E6007E]"}`}>{mainText}</h1>
      <h2 className={` text-2xl  lg:text-3xl uppercase font-bold ${MainTextColor ? `text-[${MainTextColor}]` : "text-[#0D3B6F]"}`}>{subText}</h2>
      <p className=" mt-4 text-sm">{paragraph}</p>
    </div>
  );
};

export default Heading;
