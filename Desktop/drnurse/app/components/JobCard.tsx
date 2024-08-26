import { Bookmark } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Location } from "./Icons";
import FlexWrapper from "./FlexWrapper";

const JobCard = ({ heading }: { heading: string }) => {
  return (
    <div className=" bg-white rounded-xl w-full gap-2   border border-input shadow-md px-10 py-7 flex flex-col">
      <h2 className=" font-semibold text-xl text-gray-900  uppercase">{heading}</h2>
      <div className=" flex  gap-4 items-center ">
        <div className=" text-blue-700 bg-blue-200 uppercase font-medium rounded-2xl text-xs py-1 px-2">InternShip</div>
        <p className=" text-sm font-semibold text-muted-foreground">Salary: 3500 SAR - 5000 SAR</p>
      </div>
      <div className="flex gap-2 items-center">
        <div className=" w-12 h-12 relative">
          <Image alt="hospital" fill src={"/his.png"} className=" object-cover" />
        </div>
        <div className=" p-1 flex flex-col items-start gap-1">
          <h3>#Hospital : K123456789-25</h3>
          <div className=" flex  items-center gap-2">
            <Location />
            <p>Mecca, Sudia Arabics</p>
          </div>
        </div>
        <div className="   ml-auto items-center flex flex-col">
          <Bookmark />
          <p className=" text-xs text-muted-foreground">25 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
