"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  id,
  title,
  children,
  defaultState = false,
}: {
  id: string;
  title: React.ReactNode | string;
  defaultState?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultState);
  return (
    <div className="w-full ">
      <button
        type="button"
        id={`accordionId_${id}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full"
      >
        <div className="flex w-full items-center justify-between py-2 pe-4  hover:bg-field-hover-1">
          <span>{title}</span>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
      </button>
      <div
        role="region"
        className={`${isOpen ? " block" : " hidden"} flex max-w-[90vw] gap-4 overflow-auto text-secondary-text md:max-w-[calc(100vw-288px)] md:flex-wrap `}
        aria-labelledby={`accordionId_${id}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
