import React from "react";
import { Meteors } from "./ui/Meteors";
import Image from "next/image";
import Link from "next/link";

const CardMeteors = ({ job }: { job: any }) => {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs h-full">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative  shadow-xl bg-gray-900  border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-between  items-start">
          <div className="h-5 w-5 rounded-full border flex  items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          </div>

          <div className="flex-grow">
            <div className="text-xl font-bold text-neutral-600 dark:text-white">{job.title}</div>
            <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">{job.des}</p>
          </div>
          {job.link ? (
            <Link href={job.link} className="h-36 relative w-full  mt-4">
              {" "}
              <Image
                src={job.img}
                fill
                className=" w-full h-full  object-contain rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </Link>
          ) : (
            <div className="h-36 relative w-full  mt-4">
              <Image
                src={job.img}
                fill
                className=" w-full h-full  object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </div>
          )}
          <div className=" mt-2 flex items-center ">
            {job.iconLists.map((icon: any, i: number) => (
              <div
                style={{ transform: `translateX(-${5 * i * 2}px)` }}
                className=" border rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8  flex justify-center items-center border-white/[0.2]"
                key={icon}
              >
                <img src={icon} alt={icon} className=" p-2" />
              </div>
            ))}
          </div>
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
};

export default CardMeteors;
