"use client";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import React, { useRef, useState } from "react";

const buttonPosStyles = {
  left: "border-e",
  none: "",
  right: "border-s",
};
const dropDownStyle = {
  left: "left-0 border-r",
  none: "right-0 border-r border-l",
  right: "right-0 border-l",
};

const bordersStyles = {
  open: "border-border-1 border-b border-b-background",
  close: "border-b border-border-1 border-s border-s-transparent",
};

const SidePanel = ({
  icon,
  position = "right",
  children,
  borders = true,
  keepOpen = false,
}: {
  position?: "left" | "right" | "none";
  icon: React.ReactNode;
  borders?: boolean;
  children: React.ReactNode | React.ReactNode[];
  keepOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClickReg(isOpen, ref, () => {
    setIsOpen(false);
  });
  const styleDropDownPos = dropDownStyle[position];
  const styleButtonPos = buttonPosStyles[position];
  const styleButton = borders
    ? isOpen
      ? ` ${styleButtonPos} ${bordersStyles.open} `
      : `${bordersStyles.close}`
    : "";

  const handleClosePanel = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (keepOpen) e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      className="relative"
    >
      <button
        className={`${styleButton} ${position === "none" ? "h-12" : "h-[49px]"}  w-12   p-[14px] hover:bg-subtle-3/15`}
      >
        {icon}
      </button>
      {isOpen && (
        <div
          className={`${styleDropDownPos} absolute top-full z-50 w-64  border-b  border-border-1 bg-background   `}
          onClick={handleClosePanel}
        >
          <>{children}</>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
