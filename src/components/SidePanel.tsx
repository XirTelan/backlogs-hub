"use client";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import React, { useRef, useState } from "react";

const SidePanel = ({
  icon,
  position = "right",
  children,
}: {
  position?: "left" | "right";
  icon: React.ReactElement;
  children: React.ReactElement;
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
    ? ` ${styleButtonPos} bg-layer-1 border-subtle-1 border-b border-b-layer-1`
    : "border-b border-subtle-1 border-s border-s-transparent";
  return (
    <div
      ref={ref}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      className="relative"
    >
      <button
        className={`${styleButton}  h-12 w-12  p-[14px] hover:bg-subtle-3/15`}
      >
        {icon}
      </button>
      {isOpen && (
        <div
          className={`${styleDropDownPos} absolute top-full z-50 w-64  border-b border-subtle-1 bg-layer-1  p-4 `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SidePanel;
