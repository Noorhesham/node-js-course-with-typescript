"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef } from "react";

const InfiniteMoveSection = ({ list, className, height }: { list: string[]; className?: string; height?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstTextWidth = firstTextRef.current?.offsetWidth || 0;

    if (containerRef.current && firstTextWidth > 0) {
      // i will set the second text ref to be after the first text
      gsap.set(secondTextRef.current, { x: firstTextWidth + 10 }); // Set the second text to appear right after the first
      // i will move both of them the same direction with the x set as the value
      gsap.to([firstTextRef.current, secondTextRef.current], {
        x: `-=${firstTextWidth}`, // Move left by the width of the first text
        duration: 10, // Adjust speed
        ease: "none",
        repeat: -1, // Loop infinitely
        modifiers: {
          x: (x) => {
            return `${parseFloat(x) % firstTextWidth}px`;
          },
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={`${className || ""} ${height || "h-20"} relative w-full overflow-hidden`}>
      <div ref={firstTextRef} className="absolute gap-3 whitespace-nowrap flex">
        {list.map((t, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg w-20  ${
              height || "h-20"
            } aspect-square relative flex gap-3 items-center justify-center`}
          >
            <Image priority={i < 3} src={t} alt="" fill className="object-contain" />
          </div>
        ))}
      </div>
      <div ref={secondTextRef} className="absolute whitespace-nowrap flex gap-3">
        {list.map((t, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg  w-20 ${
              height || "h-20"
            }  aspect-square relative flex  items-center justify-center`}
          >
            <Image priority={i < 3} src={t} alt="" fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMoveSection;
