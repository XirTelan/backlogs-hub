"use client";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import React, { useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";

const UserPanel = ({ children }: { children: React.ReactElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickReg(isOpen, ref, () => setIsOpen(false));
  const style = isOpen
    ? " bg-layer-1 border-s border-subtle-1 border-b border-b-layer-1 "
    : "border-b border-subtle-1 border-s border-s-transparent";

  return (
    <>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={`${style} h-12 w-12  p-[14px] hover:bg-subtle-3/15`}
      >
        <VscAccount />
      </button>
      {isOpen && (
        <div
          ref={ref}
          className=" absolute right-0 top-[calc(100%+1px)] z-10 h-20 w-64 border-b border-l border-subtle-1 bg-layer-1 p-4"
        >
          <ul>{children}</ul>
        </div>
      )}
    </>
  );
};

export default UserPanel;
