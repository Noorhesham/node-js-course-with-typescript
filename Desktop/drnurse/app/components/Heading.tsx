import { Button } from "@/components/ui/button";
import React from "react";

const Heading = ({ text, title2, btnText }: { text: string; title2?: string; btnText?: string }) => {
  return (
    <div className="flex flex-col  capitalize  items-center text-center">
      <h1 className=" text-3xl text-white font-bold lg:text-5xl ">{text}</h1>
      {title2 && <h2 className=" mt-2  text-xl   tracking-wide text-white font-semibold">{title2}</h2>}
     {btnText&& <Button className="  mt-5 ">{btnText}</Button>}
    </div>
  );
};

export default Heading;
