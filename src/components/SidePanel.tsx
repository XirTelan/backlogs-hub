"use client";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import React, { useRef, useState } from "react";

const SidePanel = ({
  icon,
  position = "right",
  children,
}: {
  position?: "left" | "right";
  icon: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickReg(isOpen, ref, () => {
    setIsOpen(false);
  });
  const styleDropDownPos =
    position === "left" ? "left-0 border-r" : "right-0 border-l";
  const styleButtonPos = position === "left" ? "border-e" : "border-s";
  const styleButton = isOpen
    ? ` ${styleButtonPos} border-border-1 border-b border-b-background`
    : "border-b border-border-1 border-s border-s-transparent";
  return (
    <div
      ref={ref}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      className="relative"
    >
      <button
        aria-label="User Panel"
        className={`${styleButton}  h-[49px] w-12   p-[14px] hover:bg-subtle-3/15`}
      >
        {icon}
      </button>
      {isOpen && (
        <div
          className={`${styleDropDownPos} absolute top-full z-50 w-64  border-b  border-border-1 bg-background   `}
        >
          <>{children}</>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
