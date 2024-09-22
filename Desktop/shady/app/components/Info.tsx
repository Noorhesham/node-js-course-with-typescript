import React, { ReactNode } from "react";

interface InfoProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

const Info: React.FC<InfoProps> = ({ title, desc, icon }) => {
  return (
    <div className="flex gap-3 text-sm items-center ">
      <div className=" flex gap-2 items-center flex-[60%]">
        <span className="text-violet-300">{icon}</span>
        <p className=" ">{title}:</p>
      </div>
      <p className=" flex-[40%] text-violet-300 ">{desc}</p>
    </div>
  );
};

export default Info;
