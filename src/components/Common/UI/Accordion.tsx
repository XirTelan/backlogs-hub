"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  title,
  children,
  defaultState = false,
}: {
  title: React.ReactNode | string;
  defaultState?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultState);
  return (
    <div className="w-full ">
      <button
        type="button"
        id={`accordionId_${title}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full"
      >
        <div className="pe-4 flex w-full items-center justify-between py-2  hover:bg-field-hover-1">
          <span>{title}</span>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
      </button>
      <div
        role="region"
        className={`${isOpen ? " block" : " hidden"} sm: max-w-[90vw] overflow-auto  `}
        aria-labelledby={`accordionId_${title}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
