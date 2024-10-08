import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import { PinContainer } from "@/components/ui/3d-pin";

const Project = ({ project, onClick }: { project: any; onClick: () => void }) => {
  return (
    <div
      className=" lg:min-h-[32.5rem]  text-white  sm:h-[35rem] h-[32rem] sm:w-[470px] items-center justify-center  w-[80vw]"
      key={project.id}
    >
      <PinContainer title={project.link} href={project.link}>
        <div className=" relative flex items-center justify-center sm:w-[470px] w-[80vw] overflow-hidden  sm:h-[37vh] h-[30vh]  mb-10">
          {/* <div className=" relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
            <img src="/bg.png" className=" z-50" alt="bg-img" />
          </div> */}

          <Image
            fill
            className=" z-10 absolute h-full w-full object-cover rounded-2  xl bottom-0"
            src={Array.isArray(project.img) ? project.img[0] : project.img}
            alt={project.title}
          />
        </div>
        <h1 className=" lg:text-2xl md:text-xl text-base line-clamp-1 font-bold">{project.title}</h1>
        <p className=" lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
          {project.des.split(" ").slice(1, 13).join(" ")}{" "}
          <span
            className=" md:text-xl text-base  text-purple underline hover:text-purple-500 duration-200"
            onClick={onClick}
          >
            Read More ...
          </span>
        </p>
        <div className=" flex items-center justify-between mt-7 mb-3">
          <div className="flex items-center">
            {project.iconLists.map((icon: any, i: number) => (
              <div
                style={{ transform: `translateX(-${5 * i * 2}px)` }}
                className=" border rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8  flex justify-center items-center border-white/[0.2]"
                key={icon}
              >
                <img src={icon} alt={icon} className=" p-2" />
              </div>
            ))}
          </div>
          <div className=" flex items-center justify-center">
            <a href={project.link} className=" flex lg:text-xl md:text-xs text-sm text-purple">
              Check life site
              <FaLocationArrow className=" ms-3" color="#CBACF9" />
            </a>
          </div>
        </div>
      </PinContainer>
    </div>
  );
};

export default Project;
