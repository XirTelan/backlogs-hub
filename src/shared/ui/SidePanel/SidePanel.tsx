"use client";
import { useOutsideClickReg, useToggle } from "@/shared/hooks";
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
  open: "border-border-subtle-1 border-b border-b-bg-main",
  close: "border-b border-border-subtle-1 border-s  border-s-transparent",
};

const directionStyles = {
  side: "",
  bottom: "top-full",
};

export const SidePanel = ({
  icon,
  position = "right",
  direction = "bottom",
  children,
  borders = true,
  keepOpen = false,
  onHover = false,
  renderCustomBtn,
  buttonProps,
}: SidePanelProps) => {
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
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (keepOpen) e.stopPropagation();
  };

  useEffect(() => {
    if (!onHover || !ref.current) return;
    const refSave = ref.current;

    refSave.addEventListener("mouseenter", setOpen);
    refSave.addEventListener("mouseleave", setClose);

    return () => {
      refSave.removeEventListener("mouseenter", setOpen);
      refSave.removeEventListener("mouseleave", setClose);
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
        " w-12 cursor-pointer   p-[14px]  hover:bg-layer-1-hover "
      )}
      {...buttonProps}
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
            "absolute  z-10 w-64 border-b  border-border-subtle-1 bg-bg-main py-2"
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

type SidePanelProps = {
  position?: "left" | "right" | "none";
  direction?: "side" | "bottom";
  icon: React.ReactNode;
  borders?: boolean;
  children: React.ReactNode | React.ReactNode[];
  keepOpen?: boolean;
  onHover?: boolean;
  buttonProps?: React.ComponentProps<"button">;
  renderCustomBtn?: (
    toggle: () => void,
    isOpen: boolean,
    ref: React.RefObject<HTMLDivElement | null>
  ) => React.ReactNode;
};
