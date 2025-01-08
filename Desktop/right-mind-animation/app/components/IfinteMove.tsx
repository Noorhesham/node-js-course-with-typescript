"use client";
import React, { useEffect } from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import gsap from "gsap";
import GridContainer from "./defaults/GridContainer";
import Paragraph from "./Paragraph";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const IfinteMove = () => {
  const firstText = React.useRef<HTMLParagraphElement>(null);
  const secondText = React.useRef<HTMLParagraphElement>(null);
  const all = React.useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;
  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);
  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };
  return (
    <footer className="bg-[#222222] relative overflow-hidden h-screen">
      <div className=" h-full">
        <div className={"  absolute top-0 "}>
          <div className={"whitespace-nowrap relative  "}>
            <p className="text-[15vw]" ref={firstText}>
              RIGHT MIND .RIGHT MIND .
            </p>
            <p className=" absolute text-[15vw] top-0  left-full" ref={secondText}>
              RIGHT MIND .RIGHT MIND .
            </p>
          </div>
        </div>
        <div className=" pt-[13vh] lg:pt-[35vh] h-full py-5  ">
          <MaxWidthWrapper className=" h-full items-start grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-5">
            <div className="flex h-full px-5 flex-col">
              <div className="flex   items-center  justify-between">
                <div className="  max-w-sm text-3xl">OBRUCHEVA STR. 23KZ 13TH FLOOR</div>
                <button className="  py-1 px-10 border border-white rounded-full">MAP</button>
              </div>
              <div className=" mt-auto flex justify-between">
                <div className=" uppercase  flex flex-col ">
                  <p>Sales office</p>
                  <span>Every day from 09:00 - 21:00</span>
                </div>
                <div className="flex gap-3">
                  <Link href="https://www.facebook.com/rightmind.md/">
                    <FaFacebook className="w-5 h-5" />
                  </Link>{" "}
                  <Link href="https://www.facebook.com/rightmind.md/">
                    <FaXTwitter className="w-5 h-5" />
                  </Link>{" "}
                  <Link href="https://www.facebook.com/rightmind.md/">
                    <FaInstagram className="w-5 h-5" />
                  </Link>{" "}
                  <Link href="https://www.facebook.com/rightmind.md/">
                    <FaLinkedin className="w-5 h-5" />
                  </Link>{" "}
                  <Link href="https://www.facebook.com/rightmind.md/">
                    <FaYoutube className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-5   flex  border-l pl-4 h-full flex-col">
              <Paragraph
                height="h-8"
                className="text-white border-gray-50 opacity-100"
                text="Right Mind is a leading company in the real estate development sector, providing innovative and effective solutions to meet the demands of the modern real estate market. We focus on quality, modern designs, and sustainability, striving to balance luxury with functionality across all our projects."
              />
              <div className=" mt-auto flex flex-col ">
                <p className="uppercase ">©Team Group</p>
                <span>Right Mind © All Rights Reserved - 2024</span>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
    </footer>
  );
};

export default IfinteMove;
// "use client";
// import React, { useEffect, useRef } from "react";
// import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
// import gsap from "gsap";
// import styles from "../page.module.css";
// import { ScrollTrigger } from "gsap/all";

// const IfinteMove = () => {
//   const firstText = useRef(null);
//   const secondText = useRef(null);
//   const slider = useRef(null);
//   let xPercent = 0;
//   let direction = -1;

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     gsap.to(slider.current, {
//       scrollTrigger: {
//         trigger: document.documentElement,
//         scrub: 0.25,
//         start: 0,
//         end: window.innerHeight,
//         onUpdate: (e) => (direction = e.direction * -1),
//       },
//       x: "-500px",
//     });
//     requestAnimationFrame(animate);
//   }, []);

//   const animate = () => {
//     if (xPercent < -100) {
//       xPercent = 0;
//     } else if (xPercent > 0) {
//       xPercent = -100;
//     }
//     gsap.set(firstText.current, { xPercent: xPercent });
//     gsap.set(secondText.current, { xPercent: xPercent });
//     requestAnimationFrame(animate);
//     xPercent += 0.25 * direction;
//   };
//   return (
//     <main className={styles.main}>
//       <div className={styles.sliderContainer}>
//         <div ref={slider} className={styles.slider}>
//           <p ref={firstText}>RIGHT MIND .</p>
//           <p ref={secondText}>RIGHT MIND .</p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default IfinteMove;
