import Title from "@/components/Common/Title";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LandingBlockItem } from "../config/types";
import TextBlock from "./TextBlock";
import { ContentBlock } from "./ContentBlock";

type SectionAnimatedProps = {
  block: LandingBlockItem;
};

export function SectionAnimated({
  block: { textBlock, dir, contentBlock },
}: SectionAnimatedProps) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    margin: "-100px",
    once: true,
  });
  return (
    <motion.section
      ref={ref}
      className={`relative my-8 flex w-full justify-center `}
    >
      <motion.div
        className={` container  flex w-full  justify-center  text-2xl   `}
      >
        <div className="container  bg-bg-main">
          <Title variant={2} title={"Test"} />

          <div className="grid-rows-1  md:grid md:grid-cols-12 ">
            <TextBlock dir={dir}>{textBlock}</TextBlock>
            <ContentBlock dir={dir === "left" ? "right" : "left"}>
              {contentBlock}{" "}
            </ContentBlock>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{
          scaleX: inView ? 0 : 1,
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.3,
        }}
        className={` absolute inset-0 z-10 ${dir === "left" ? "origin-left" : "origin-right"}  bg-btn-primary-hover`}
      ></motion.div>
    </motion.section>
  );
}
