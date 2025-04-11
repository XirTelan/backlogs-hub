"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Accordion = ({
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
    <div className="border-border-subtle-1 w-full border-t  ">
      <button
        type="button"
        id={`accordionId_${id}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full"
      >
        <div className="flex w-full items-center justify-between px-4 py-2  hover:bg-field-hover-1">
          <span>{title}</span>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
      </button>
      <div
        role="region"
        className={`${isOpen ? " block" : " hidden"} mx-4 mb-6 flex`}
        aria-labelledby={`accordionId_${id}`}
      >
        {children}
      </div>
    </div>
  );
};

