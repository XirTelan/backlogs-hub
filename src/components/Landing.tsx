"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

import backlogImg_1 from "../../public/landing/backlog_1.png";
import manage_1 from "../../public/landing/manage_1.png";
import manage_2 from "../../public/landing/manage_2.png";
import template_1 from "../../public/landing/templates_1.png";
import LinkBase from "./Common/UI/LinkBase";
import Notification from "./Common/UI/Notification";
import Title from "./Common/Title";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";

const Landing = () => {
  return (
    <>
      <SectionAnimated
        dir={"left"}
        textBlock={`Create Custom Backlogs: Design your backlogs with any categories and fields that suit your
          needs`}
        contentBlock={
          <div className="p-4">
            <p className="mb-4 mt-2 px-2  text-base text-secondary-text ">
              You can create up to 10 categories and as many fields as you need.
              There are different types available for fields{" "}
              <LinkBase href={"/faq#backlogFields"}>
                About available types{" "}
              </LinkBase>
            </p>
            <Image src={backlogImg_1} alt={""} />
          </div>
        }
      />
      <SectionAnimated
        textBlock={
          <div>
            <p className=" font-semibold  ">Manage and Organize:</p>
            <p className=" text-secondary-text">
              Create folders and arrange your backlogs in the order that makes
              the most sense for you
            </p>
            <p className=" text-secondary-text">
              You can change both the order of the backlogs and the folders
              themselves.
            </p>
          </div>
        }
        contentBlock={
          <div className="p-4">
            <div className="flex flex-col items-center md:flex-row">
              <div className="p-4">
                <Image src={manage_1} alt={""} />
              </div>
              <FaArrowRight className="hidden md:block" size={32} />{" "}
              <FaArrowDown className="md:hidden" size={32} />
              <div className="p-4">
                <Image src={manage_2} alt={""} />
              </div>
            </div>
          </div>
        }
        dir={"right"}
      />
      <SectionAnimated
        textBlock={`Templates: From each backlog you can make a template that can be reused in the future or shared`}
        contentBlock={
          <div>
            <Image src={template_1} alt={""} />
          </div>
        }
        dir={"left"}
      />
      <div className="container min-h-screen p-4">
        <Title title="Modifications" variant={3}></Title>
        <p>
          Modifications - features that add unique actions to your backlog or
          change some existing ones.
        </p>
        <Notification
          options={{
            showBtn: false,
          }}
          text={`"Modifications" Currently under development and not available for use. Below are the planned modifications, but they are subject to change `}
          type={"info"}
        />
        <div className=" my-4 flex flex-col items-center justify-center gap-4 md:flex-row">
          <div className="h-80 w-60 bg-layer-1 p-4">
            <p className=" font-semibold">Steam import</p>
            <p>Allows you to import games from Steam into your backlog</p>
          </div>
          <div className="h-80 w-60 bg-layer-1 p-4">
            <p className=" font-semibold">GamesSearch</p>
            <p>Adds a game search on Steam or HowLongToBeat</p>
          </div>
          <div className="h-80 w-60 bg-layer-1 p-4">
            <p className=" font-semibold">To-Do List</p>
            <p>Превращает ваш беклог в доску задач</p>
          </div>
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
      className={`${dir === "left" ? " col-start-1 col-end-4" : " col-start-10 col-end-13 "} row-start-1  bg-primary-btn-hover`}
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
        <div className="container  bg-background">
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
        className={` absolute inset-0 z-10 ${dir === "left" ? "origin-left" : "origin-right"}  bg-primary-btn-hover`}
      ></motion.div>
    </motion.section>
  );
};

export default Landing;
