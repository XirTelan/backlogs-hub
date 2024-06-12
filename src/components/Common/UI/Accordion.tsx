import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <button
        type="button"
        id={`accordionId_${title}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full"
      >
        <div className="flex w-full items-center justify-between py-2">
          <span>{title}</span>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
      </button>
      <div
        role="region"
        className={`${isOpen ? " block" : " hidden"} `}
        aria-labelledby={`accordionId_${title}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
