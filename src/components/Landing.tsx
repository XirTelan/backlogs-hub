"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const colors = ["#00000000", "#ff0000", "#00ff00", "#0000ff"];
const Landing = () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);

  const increase = () => {
    setCounter((prev) => ++prev);
  };
  const decrease = () => {
    setCounter((prev) => --prev);
  };

  useEffect(() => {
    const handleWheel = (e: Event) => {
      console.log(e);
    };
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("scroll", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleWheel);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {[1, 2, 3, 4, 5].map((item, indx) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 2 }}
              viewport={{ root: ref, margin: "-50px" }}
              key={indx}
              className="pointer-events-none absolute  inset-0 flex items-center justify-center bg-red-700 transition-all duration-1000 ease-in-out"
              style={{
                transform: `translateY( ${(indx < counter ? 0 : indx - counter) * 100}%)`,
                background: `${colors[indx]}`,
              }}
            >
              <div>{item}</div>
            </motion.div>
          );
        })}
        <div className="absolute right-0 top-1/2 z-20 h-40 w-20 border-e border-cyan-500 bg-green-600">
          Controls
          <button onClick={increase}>-</button>
          <button onClick={decrease}>+</button>
        </div>
      </div>
    </>
  );
};

const TextBlock = ({
  children,
  dir,
}: {
  dir: "left" | "right";
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${dir === "left" ? " col-start-1 col-end-4" : " col-start-10 col-end-13 "} row-start-1  bg-btn-primary-hover`}
    >
      <div className="p-4">{children}</div>
    </div>
  );
};

const ContentBlock = ({
  dir,
  children,
}: {
  dir: "left" | "right";
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${dir === "left" ? " col-start-1 col-end-10" : " col-start-4 col-end-13 "} row-start-1 flex  items-center  justify-center   border-primary-btn-hover `}
    >
      <>{children}</>
    </div>
  );
};

const SectionAnimated = ({
  dir,
  textBlock,
  contentBlock,
}: {
  textBlock: React.ReactNode;
  contentBlock: React.ReactNode;
  dir: "left" | "right";
}) => {
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
        className={` container top-0 flex w-full  justify-center  text-2xl   `}
        // style={{ position: pos }}
      >
        <div className="container  bg-bg-main">
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
          duration: 1,
        }}
        className={` absolute inset-0 z-10 ${dir === "left" ? "origin-left" : "origin-right"}  bg-btn-primary-hover`}
      ></motion.div>
    </motion.section>
  );
};

export default Landing;
