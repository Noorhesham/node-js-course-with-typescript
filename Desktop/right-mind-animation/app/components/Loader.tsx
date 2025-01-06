"use client";
import React, { useEffect } from "react";
import Logo from "../Logo";
import gsap from "gsap";
import { useLoading } from "../context/LoadingContext";

const Loader = () => {
  const [width, setWidth] = React.useState(0);
  const { setIsLoading } = useLoading();
  useEffect(() => {
    setWidth(window.innerWidth / 6);
    const ctx = gsap.context(() => {
      gsap.set(".loader", { autoAlpha: 0 });
      const tl = gsap.timeline();
      const paths = gsap.utils.toArray(".preloader__top");
      const groups = gsap.utils.toArray(".preloader__bottom");
      const firstGroups: SVGPathElement[] = [];
      const secondGroups: SVGPathElement[] = [];
      const firstPaths: SVGPathElement[] = [];
      const secondPaths: SVGPathElement[] = [];
      const lines = gsap.utils.toArray(".preloader__line");
      paths.forEach((group: any) => {
        const paths = group.querySelectorAll("path");
        if (paths.length > 0) {
          firstPaths.push(paths[0]);
        }
        if (paths.length > 1) {
          secondPaths.push(paths[1]);
        }
      });

      groups.forEach((group: any) => {
        const paths = group.querySelectorAll("path");
        if (groups.length > 0) {
          firstGroups.push(paths[0]);
        }
        if (groups.length > 1) {
          secondGroups.push(paths[1]);
        }
      });

      [firstPaths, firstGroups].forEach((group) => gsap.set(group, { y: 70 }));
      [secondPaths, secondGroups].forEach((group) => gsap.set(group, { y: 100 }));
      gsap.set(".loader", { autoAlpha: 1 });
      tl.to(firstPaths, {
        y: -30,
        stagger: { amount: 1.1 },
        ease: "none",
      })
        .to(
          secondPaths,
          {
            y: 0,
            stagger: { amount: 1 },
            ease: "none",
          },
          "-=1.7"
        )
        .to(firstGroups, { y: 0, stagger: { amount: 0.7 }, ease: "none" }, "-=100%")
        .fromTo(lines, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: { amount: 0.7 } }, "<")
        .to(secondGroups, { y: 0, stagger: { amount: 0.7 }, ease: "none" }, "<")
        .to(".piece", {
          yPercent: -100,
          stagger: { amount: 0.7 },
          onStart: () => setIsLoading(false),
        })
        .to(".logo", { autoAlpha: 0 }, "<0.5")
        .to(".loader", { autoAlpha: 0 });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className=" h-screen absolute inset-0 z-50 loader flex items-center   justify-center w-full ">
      <div className="logo relative z-30">
        <Logo />
      </div>
      <div className=" w-full h-full absolute inset-0 flex items-center ">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="piece h-full bg-[#222]  " style={{ width: width }}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
