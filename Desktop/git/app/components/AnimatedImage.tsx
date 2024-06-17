"use client";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const AnimatedImage = ({ data, className }: { data?: any; className?: string }) => {
  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    import(`../data/animate.json`).then(setAnimationData);
  }, []);
  if (!animationData) return <Image width={2000} height={2000} alt="animation"  src={"/placehoder.png"} />;
  return (
    <div className={`${className || "max-w-[50%]"}`}>
      <Lottie animationData={data || animationData} />
    </div>
  );
};

export default AnimatedImage;
