"use client";
import React from "react";
import { motion, Variants, AnimationControls, MotionProps } from "framer-motion";

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: string | boolean | number | any;
  animate?: string | AnimationControls | any;
  exit?: string | any;
  whileInView?: MotionProps["whileInView"];
  nohover?: boolean;
  viewport?: {
    once: boolean;
  };
}

const MotionItem: React.FC<MotionItemProps> = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
  whileInView,
  nohover,
  viewport,
}) => {
  return (
    <motion.div
      whileHover={{ y: nohover ? 0 : -10 }}
      initial={initial}
      animate={animate}
      exit={exit}
      viewport={viewport}
      className={className}
      whileInView={whileInView}
      variants={animate ? undefined : variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
