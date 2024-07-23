"use client";
import { motion } from "framer-motion";
import React from "react";

const LoadingMotion = ({ maxH, indx }: { maxH: number; indx: number }) => {
  return (
    <motion.div
      initial={{ height: maxH, background: "#0050e6" }}
      animate={{
        height: [maxH, 20, maxH],
        background: ["#0050e6", "#262626", "#0050e6"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: 0.3 * indx,
      }}
      className="h-4 w-4 bg-neutral-600"
    ></motion.div>
  );
};

export default LoadingMotion;
