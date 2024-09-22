"use client";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Create a static map for the animations (require paths to avoid dynamic import issues)
const animationMap: { [key: string]: any } = {
  "animate1.json": require("../data/animate1.json"),
  "animate2.json": require("../data/animate5.json"),
  "animate3.json": require("../data/animate3.json"),
  "animate4.json": require("../data/animate4.json"),
  "animate5.json": require("../data/animate2.json"),
};

const AnimatedImage = ({ data = "animate1.json", className }: { data?: string; className?: string }) => {
  const animationData = animationMap[data]; // directly pull from static map

  if (!animationData) {
    return <Image width={2000} height={2000} alt="animation" src="/placeholder.png" />;
  }

  return (
    <div className={`${className || "max-w-[50%]"}`}>
      <Lottie animationData={animationData} />
    </div>
  );
};

export default AnimatedImage;
