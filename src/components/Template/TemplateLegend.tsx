"use client";
import React, { useState } from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { TbWindowMinimize } from "react-icons/tb";

const TemplateLegend = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <>
      {isMinimized ? (
        <button
          className="absolute bottom-10 left-0 rounded-full bg-neutral-800 p-2 hover:bg-cyan-500"
          onClick={() => setIsMinimized(false)}
        >
          Show legend
        </button>
      ) : (
        <>
          <div className="  absolute bottom-10 left-0 z-30 max-w-80 rounded border border-neutral-700 bg-neutral-800 p-2">
            <div className="relative mb-2 flex items-center p-2">
              <h2 className="me-4 font-bold">Legend: Field Types</h2>
              <button
                className="absolute right-0 top-0 rounded-full bg-neutral-700 p-2 text-cyan-500 hover:bg-cyan-500 hover:text-white"
                onClick={() => setIsMinimized(true)}
              >
                <TbWindowMinimize size={20} />
              </button>
            </div>

            <div>
              <IconDescription title="Timer field" text={descriptions.timer}>
                <IoMdTimer />
              </IconDescription>
              <IconDescription title="Text field" text={descriptions.text}>
                <IoText />
              </IconDescription>
              <IconDescription title="Number field" text={descriptions.number}>
                <AiOutlineFieldNumber />
              </IconDescription>
              <IconDescription title="Date field" text={descriptions.date}>
                <FaCalendarCheck />
              </IconDescription>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const IconDescription = ({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: React.ReactElement;
}) => {
  return (
    <div className="mb-2">
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded bg-green-800 p-1">{children}</div>
        <h3 className=" font-bold">{title}</h3>
      </div>
      <p>{text}</p>
    </div>
  );
};
export default TemplateLegend;

const descriptions = {
  text: `One line text field`,
  timer: `Provides functionality for tracking and displaying elapsed time durations. Users can input a specific duration in hours and/or minutes. This field type include features such as start, pause, and reset`,
  date: `You can select date from DatePicker or type it itself.`,
  number: `Contains only numbers `,
};
