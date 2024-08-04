"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const MotionItem = ({
  children,
  className,
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) => {
  return (
    <motion.div whileHover={{ y: -10 }} className={className} variants={variants}>
      {children}
    </motion.div>
  );
};

export default MotionItem;
