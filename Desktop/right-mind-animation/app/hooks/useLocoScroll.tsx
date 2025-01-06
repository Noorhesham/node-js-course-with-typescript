import React, { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";

const useLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [locoScroll, setLocoScroll] = useState(null);
  const [progress, setProgress] = useState(0);

  const pathname = usePathname();
  console.log(pathname);
  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof global.document === "undefined") return;
    const isMobile = window.innerWidth <= 768;

    const LocomotiveScroll = require("locomotive-scroll").default;
    const scrollEl = global?.window?.document?.querySelector(".main-container");
    if (!scrollEl) return;

    const locoScrollInstance = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.5,
      // smartphone: {
      //   smooth: true, // Enable smooth scrolling on phones
      //   direction: "vertical", // Ensure it's vertical scrolling
      // },
      // tablet: {
      //   smooth: true, // Enable smooth scrolling on tablets
      //   direction: "vertical",
      // },
    });

    locoScrollInstance.on("scroll", () => {
      ScrollTrigger.update(); // Sync GSAP ScrollTrigger
    });
    locoScrollInstance.on("scroll", (args) => setProgress(args.scroll.y));

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? locoScrollInstance.scrollTo(value, 0, 0)
          : locoScrollInstance.scroll.instance.scroll.y;
      },
      scrollLeft(value) {
        return arguments.length
          ? locoScrollInstance.scrollTo(value, 0, 0)
          : locoScrollInstance.scroll.instance.scroll.x;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    const lsUpdate = () => locoScrollInstance.update();
    if (window.innerWidth < 768) ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.addEventListener("refresh", () => locoScrollInstance.update());

    ScrollTrigger.refresh();
    setLocoScroll(locoScrollInstance);
    window.addEventListener("resize", () => {
      locoScroll?.update();
      ScrollTrigger.refresh();
    });
    // Cleanup on component unmount
    return () => {
      if (locoScrollInstance) {
        locoScrollInstance.destroy();

        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        ScrollTrigger.removeEventListener("refresh", () => locoScrollInstance.update());
      }
    };
  }, [pathname]);

  return { locoScroll, progress };
};

export default useLocoScroll;
