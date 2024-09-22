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
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: any;
  animate?: any;
  exit?: any;
  whileInView?: any;
  nohover?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ y: nohover ? 0 : -10 }}
      initial={initial || { opacity: 0, y: 10 }}
      animate={animate}
      viewport={{ once: true }}
      exit={exit}
      className={className}
      whileInView={whileInView || { opacity: 1, y: 0 }}
      variants={animate ? undefined : variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
