"use client";
import { motion, Variants } from "framer-motion";
import React, { ReactNode, Children, cloneElement, ReactElement } from "react";

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
}

const MotionContainer = ({ children, className }: MotionContainerProps) => {
  const childrenArray = Children.toArray(children) as ReactElement[];
  const childCount = childrenArray.length;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

    },
  };

  const staggerEffect = (index: number): Variants => ({
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * (index >= 4 ? 0.1 : 0.2), // Decreasing delay for each child
      },
    },
  });

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="visible">
      {childrenArray.map((child, index) =>
        cloneElement(child, {
          variants: staggerEffect(index),
        })
      )}
    </motion.div>
  );
};

export default MotionContainer;
