import { motion } from "framer-motion";
import { RefObject } from "react";

type LandingBlockProps = {
  ref: RefObject<Element | null> | undefined;
  children: React.ReactNode;
};

export function LandingBlock({ ref, children }: LandingBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      viewport={{ root: ref, margin: "-50px" }}
      className="pointer-events-auto min-h-screen  inset-0 flex items-center justify-center bg-bg-main transition-all duration-1000 ease-in-out"
    >
      {children}
    </motion.div>
  );
}
