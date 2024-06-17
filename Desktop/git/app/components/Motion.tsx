"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
const container ={
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
const Motion = ({ children ,list=false,className}: { children: ReactNode,list?:boolean ,className?:string}) => {
    return list ? (
        <motion.div className={className} initial="hidden" animate="visible" variants={container}>
          {children}
        </motion.div>
      ) : (
        <motion.div className={className}
          viewport={{ once: true }}
       variants={item}
        >
          {children}
        </motion.div>
      );
    };

export default Motion;
