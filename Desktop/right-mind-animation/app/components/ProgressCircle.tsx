import React from "react";

const ProgressCircle = ({ progress, reverseColors }: { progress: number; reverseColors?: boolean }) => {
  const RADIUS = 100; // Radius of the circle
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // Circumference of the circle

  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <svg className="slider-nav__outline md:block hidden" width="200" height="200" viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        className=" opacity-20"
        stroke={reverseColors ? "#171717" : "#e6e6e6"}
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        stroke={!reverseColors ? "white" : "black"}
        strokeWidth="1"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.1s ",
        }}
      />
    </svg>
  );
};

export default ProgressCircle;
