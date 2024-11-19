"use client";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import useToggle from "@/hooks/useToggle";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

const buttonPosStyles = {
  left: "border-e",
  none: "",
  right: "border-s",
};

const dropDownStyle = {
  left: "left-0 border-r",
  none: "right-0 border",
  right: "right-0 border-l",
};

const bordersStyles = {
  open: "border-border-1 border-b border-b-background",
  close: "border-b border-border-1 border-s border-s-transparent",
};

const directionStyles = {
  side: "",
  bottom: "top-full",
};

const SidePanel = ({
  icon,
  position = "right",
  direction = "bottom",
  children,
  borders = true,
  keepOpen = false,
  onHover = false,
  renderCustomBtn,
}: {
  position?: "left" | "right" | "none";
  direction?: "side" | "bottom";
  icon: React.ReactNode;
  borders?: boolean;
  children: React.ReactNode | React.ReactNode[];
  keepOpen?: boolean;
  onHover?: boolean;
  renderCustomBtn?: (
    toggle: () => void,
    isOpen: boolean,
    ref: React.RefObject<HTMLDivElement>,
  ) => React.ReactNode;
}) => {
  const { isOpen, setOpen, setClose, toggle } = useToggle(false);

  const [offset, setOffset] = useState("-100%");
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClickReg(isOpen, ref, setClose);

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

  useEffect(() => {
    if (!onHover || !ref.current) return;

    ref.current.addEventListener("mouseenter", setOpen);
    ref.current.addEventListener("mouseleave", setClose);

    () => {
      ref.current?.removeEventListener("mouseenter", setOpen);
      ref.current?.removeEventListener("mouseleave", setClose);
    };
  }, [setClose, setOpen, onHover]);

  useEffect(() => {
    if (direction === "bottom" || !ref.current) return;
    const val = ref.current.getBoundingClientRect();

    const newOffset =
      val.right + val.left > window.innerWidth - 20 ? "100%" : "-100%";
    if (newOffset !== offset) setOffset(newOffset);
  }, [direction, offset]);

  const toggleBtn = renderCustomBtn ? (
    renderCustomBtn(toggle, isOpen, ref)
  ) : (
    <button
      aria-expanded={isOpen}
      onClick={toggle}
      className={classNames(
        styleButton,
        position === "none" ? "h-12" : "h-[49px]",
        " w-12   p-[14px]  hover:bg-subtle-3/15",
      )}
    >
      {icon}
    </button>
  );

  return (
    <div ref={ref} className={` relative`}>
      {toggleBtn}
      {isOpen && (
        <div
          className={classNames(
            styleDropDownPos,
            directionStyles[direction],
            "absolute  z-10 w-64 border-b  border-border-1  bg-background py-2",
          )}
          onClick={handleClosePanel}
          style={
            direction === "side"
              ? {
                  right: offset,
                  top: 0,
                }
              : undefined
          }
        >
          <>{children}</>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
