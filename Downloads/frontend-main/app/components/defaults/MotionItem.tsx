"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const MotionItem = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
  whileInView,
  nohover,
  transition,
}: {
  nohover?: boolean;
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: any;
  animate?: any;
  exit?: any;
  whileInView?: any;
  transition?: any;
}) => {
  return (
    <motion.div
      whileHover={nohover ? {} : { y: -10 }}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={className}
      whileInView={whileInView}
      variants={animate ? undefined : variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
