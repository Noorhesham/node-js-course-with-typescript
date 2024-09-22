"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Model3d from "./Model3d";
import AnimatedImage from "./AnimatedImage";
import { ChevronRight, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: i === 0 ? 100 : 200,
    x: i === 0 ? -100 : i === 1 ? 0 : 100,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 1,
      type: "spring",
      delay: 0.5,
    },
  },
};
export function ThreeDCardDemo({
  text,
  desc,
  img,
  position,
  scale,
  three,
  animation,
  btn,
  downDesc,
}: {
  text: string;
  desc?: string;
  img?: string;
  position?: [number, number, number] | any;
  scale?: [number, number, number] | any;
  three?: boolean;
  animation?: boolean;
  btn?: boolean;
  downDesc?: string;
}) {
  return (
    <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
      <CardContainer className="inter-var relative">
        <CardBody className=" bg-white rounded-[3rem] shadow-md relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-full max-w-[50rem] sm:w-[25rem] h-auto p-6 py-7">
          <CardItem translateZ="50" className="text-xl text-center mx-auto font-bold text-[#25333e] dark:text-white">
            {text}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-center mx-auto text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {desc}
          </CardItem>
          <CardItem className="w-full h-44 mt-4">
            {" "}
            {/* Adjust the height */}
            {three ? (
              <Model3d scale={scale} position={position} className="w-full h-full" model={img || ""} />
            ) : animation ? (
              <AnimatedImage className=" w-72 sm:w-full" />
            ) : (
              <Image src={img || ""} alt="image" className="w-full h-full object-cover" fill />
            )}
          </CardItem>
          {btn && (
            <div className="flex  mx-auto justify-center items-center mt-10">
              <button className="relative inline-flex h-14 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                  <span className="relative z-20 text-gray-400">
                    Get Started <span className=" text-white">For Free</span>
                  </span>
                  <HandCoins />
                </span>
              </button>
            </div>
          )}
          {downDesc && (
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500  cursor-pointer group  flex items-center gap-2 text-left mx-auto text-sm max-w-sm my-3 dark:text-neutral-300"
            >
              {downDesc}
              <span className="bg-slate-200  p-2 rounded-2xl">
                <ChevronRight className=" group-hover:translate-x-2 duration-200 text-gray-800" />
              </span>
            </CardItem>
          )}
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
