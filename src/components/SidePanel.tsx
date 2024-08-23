"use client";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import React, { useRef, useState } from "react";

const buttonPosStyles = {
  left: "border-e",
  none: "",
  right: "border-s",
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
}: {
  position?: "left" | "right" | "none";
  icon: React.ReactNode;
  borders?: boolean;
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClickReg(isOpen, ref, () => {
    setIsOpen(false);
  });

  const styleDropDownPos =
    position === "left" ? "left-0 border-r" : "right-0 border-l";
  const styleButtonPos = buttonPosStyles[position];
  const styleButton = borders
    ? isOpen
      ? ` ${styleButtonPos} ${bordersStyles.open} `
      : `${bordersStyles.close}`
    : "";

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
          onClick={(e) => e.stopPropagation()}
        >
          <>{children}</>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
