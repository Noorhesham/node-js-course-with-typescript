"use client";
import { motion } from "framer-motion";

const ArrowDrawingAnimation = () => {
  return (
    <svg className=" z-30" width="227" height="53" viewBox="0 0 227 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4" filter="url(#filter0_d_283_15789)">
        <motion.path
          initial={{ pathLength: 0, stroke: "#0A65CC" }}
          whileInView={{ pathLength: 1, stroke: ["#0A65CC", "#00CFFF", "#0A65CC"] }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.5,
          }}
          d="M5 40.8082C5 40.8082 47.9587 1.00001 112.877 1.00001C177.795 1.00001 220.754 40.8083 220.754 40.8083"
          stroke="#0A65CC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="12 8"
        />
        <motion.path
          initial={{ scale: 0 }}
          whileInView={{ scale: 1.2 }}
          transition={{
            delay: 1,
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
          d="M219.551 28.6099L221.502 41.5913L208.555 43.4273"
          stroke="#0A65CC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_283_15789"
          x="0.25"
          y="0.25"
          width="226"
          height="51.9287"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_283_15789" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_283_15789" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default ArrowDrawingAnimation;
