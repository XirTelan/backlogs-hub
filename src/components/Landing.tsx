"use client";
import { motion, useInView } from "framer-motion";
import React, {
  ReactNode,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonBase from "./Common/UI/ButtonBase";
import LinkBase from "./Common/UI/LinkBase";
import Image from "next/image";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import Title from "./Common/Title";

const BLOCKS: {
  textBlock: React.ReactNode;
  contentBlock: React.ReactNode;
  dir: "left" | "right";
}[] = [
  {
    dir: "left",
    contentBlock: `Create Custom Backlogs: Design your backlogs with any categories and fields that suit your
  needs`,
    textBlock: (
      <div className="p-4">
        <p className="mb-4 mt-2 px-2  text-base text-text-secondary ">
          You can create up to 10 categories and as many fields as you need.
          There are different types available for fields{" "}
          <LinkBase href={"/faq#backlogFields"}>
            About available types{" "}
          </LinkBase>
        </p>
        {/* <Image src={backlogImg_1} alt={""} /> */}
      </div>
    ),
  },
  {
    dir: "right",
    contentBlock: (
      <div className="p-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="p-4">{/* <Image src={manage_1} alt={""} /> */}</div>
          <FaArrowRight className="hidden md:block" size={32} />{" "}
          <FaArrowDown className="md:hidden" size={32} />
          <div className="p-4">{/* <Image src={manage_2} alt={""} /> */}</div>
        </div>
      </div>
    ),
    textBlock: (
      <div>
        <p className=" font-semibold  ">Manage and Organize:</p>
        <p className=" text-text-secondary">
          Create folders and arrange your backlogs in the order that makes the
          most sense for you
        </p>
        <p className=" text-text-secondary">
          You can change both the order of the backlogs and the folders
          themselves.
        </p>
      </div>
    ),
  },
  {
    dir: "left",
    contentBlock: <div>{/* <Image src={template_1} alt={""} /> */}</div>,
    textBlock:
      "Templates: From each backlog you can make a template that can be reused in the future or shared",
  },
];

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
      e.preventDefault();
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
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {BLOCKS.map((item, indx) => {
          return (
            <LandingBlock
              key={indx}
              indx={indx + 1}
              selectedIndx={counter}
              ref={ref}
            >
              <SectionAnimated
                textBlock={item.textBlock}
                contentBlock={item.contentBlock}
                dir={item.dir}
              />
            </LandingBlock>
          );
        })}
      </div>
      <div className="absolute z-50 right-0 top-1/2 h-40 w-20 border-e border-cyan-500 bg-green-600">
        Controls
        <div>
          <ButtonBase onClick={decrease} text="-" />
          <ButtonBase onClick={increase} text="+" />
          <div>{counter}</div>
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

const LandingBlock = ({
  indx,
  selectedIndx,
  ref,
  children,
}: {
  indx: number;
  selectedIndx: number;
  ref: RefObject<Element | null> | undefined;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      viewport={{ root: ref, margin: "-50px" }}
      key={indx}
      className="absolute pointer-events-auto  inset-0 flex items-center justify-center bg-bg-main transition-all duration-1000 ease-in-out"
      style={{
        transform: `translateY( ${(indx < selectedIndx ? 0 : indx - selectedIndx) * 100}%)`,
      }}
    >
      {children}
    </motion.div>
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
};

export default Landing;
