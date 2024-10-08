import React from "react";
import { FaBackward, FaGithub, FaLocationArrow, FaPlay } from "react-icons/fa";
import Button from "./ButtonColorful";
import Link from "next/link";
import SwiperCards from "./SwiperCards";
import Image from "next/image";

const ProjectDescription = ({ project, moveback }: { project: any; moveback: () => void }) => {
  return (
    <div className="  h-full mb-12 mt-10 items-center justify-center  w-[80vw]" key={project.id}>
      <Button
        onClick={moveback}
        className="flex hover:text-purple duration-200  w-fit items-center transition-all left-0 mb-5 3"
      >
        <FaBackward />
        Back
      </Button>
      <div className=" relative flex items-center justify-center  w-[80vw] overflow-hidden   mb-10">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3  w-full  z-10 justify-between items-center">
          {Array.isArray(project.img) ? (
            <SwiperCards autoplay items={[...project.img]} />
          ) : (
            <div className=" min-h-80 w-full h-full relative">
              {" "}
              <Image
                src={project.img}
                fill
                className=" h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </div>
          )}

          {project.video && (
            <iframe
              src={project.video}
              className="rounded-xl  min-h-[24rem] lg:min-h-full w-full overflow-y-scroll "
              width="560"
              height="100%"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          )}
        </div>
      </div>
      <h1 className="  z-10 relative mb-4 lg:text-2xl md:text-xl text-base  font-bold">{project.title}</h1>
      <p className=" relative z-10  lg:text-xl lg:font-normal font-light text-sm ">{project.des} </p>
      <div className=" flex relative z-10 items-center justify-between mt-7 mb-3">
        <div className="flex items-center">
          {project.iconLists?.map((icon: any, i: number) => (
            <div
              style={{ transform: `translateX(-${5 * i * 2}px)` }}
              className=" border rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8  flex justify-center items-center border-white/[0.2]"
              key={icon}
            >
              <img src={icon} alt={icon} className=" p-2" />
            </div>
          ))}
        </div>
        <div className=" flex items-center gap-5 justify-center">
          {project?.git && (
            <a href={project?.git}>
              <FaGithub className=" text-4xl hover:text-purple duration-150" />
            </a>
          )}
          {project?.link && (
            <a href={project?.link || ""} className=" cursor-pointer flex lg:text-xl md:text-xs text-sm text-purple">
              Check life site
              <FaLocationArrow className=" ms-3" color="#CBACF9" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
