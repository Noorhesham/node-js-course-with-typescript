"use client";
import { motion, Variants } from "framer-motion";
import React, { ReactNode, Children, cloneElement, ReactElement } from "react";

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  variantsCustom?: Variants;
  easing?: string;
  customstaggerEffect?: any;
}

const MotionContainer = ({
  children,
  className,
  variantsCustom,
  easing = "easeOut",
  customstaggerEffect,
}: MotionContainerProps) => {
  const childrenArray = Children.toArray(children) as ReactElement[];
  const totalItems = childrenArray.length;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };
  const maxDelay = 1; // Maximum delay in seconds
  const delayStep = maxDelay / totalItems; // Decrease step for each item

  const viisble = customstaggerEffect?.visible;
  console.log(
    {
      ...customstaggerEffect,
      visible: {
        ...viisble,
        transition: {
          delay: 1, // Ensure delay does not go below 0
          duration: 0.3, // Animation duration
          ease: easing,
        },
      },
    },
    {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: Math.max(1 * delayStep, 0), // Ensure delay does not go below 0
          duration: 0.3, // Animation duration
          ease: easing,
        },
      },
    }
  );
  const staggerEffect = (index: number): Variants => {
    return customstaggerEffect
      ? {
          ...customstaggerEffect,
          visible: {
            ...viisble,
            transition: {
              delay: Math.max(index * delayStep, 0), // Ensure delay does not go below 0
              duration: 0.3, // Animation duration
              ease: easing,
            },
          },
        }
      : {
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: Math.max(index * delayStep, 0), // Ensure delay does not go below 0
              duration: 0.3, // Animation duration
              ease: easing,
            },
          },
        };
  };

  return (
    <motion.div
      className={className}
      variants={container || variantsCustom}
      initial="hidden"
      viewport={{ once: true }}
      whileInView="visible"
    >
      {childrenArray.map((child, index) =>
        cloneElement(child, {
          variants: staggerEffect(index),
        })
      )}
    </motion.div>
  );
};

export default MotionContainer;
