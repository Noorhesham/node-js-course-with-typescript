import React from "react";
import MiniTitle from "./MiniTitle";

const Meet = () => {
  return (
    <div className=" flex gap-1 items-stretch">
      <div className="flex flex-col items-center  px-2 py-2  rounded-xl bg-main2 text-gray-50 ">
        <span className=" text-sm">MO</span>
        <span className=" font-semibold">23</span>
      </div>
      <div className=" text-sm ">
        <MiniTitle boldness="bold" size="md" color="text-black" text="Dr. Mohamed Ahmed" />
        <p className="text-muted-foreground">GTM : 24 /10/ 2024 09:00AM - 10:00 AM</p>
        <p className="text-muted-foreground">Your local time : 24 /10/ 2024 12:00PM - 1:00 PM</p>
      </div>
    </div>
  );
};

export default Meet;
