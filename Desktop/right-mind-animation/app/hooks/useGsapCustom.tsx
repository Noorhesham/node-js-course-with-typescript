"use client";
import { useEffect } from "react";
import gsap from "gsap";

const useGsapCustom = (animationFn: (ctx: gsap.Context) => void) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn();
    });

    return () => ctx.revert();
  }, [animationFn]);
};

export default useGsapCustom;
