"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import classNames from "classnames";
import { ActionsBlock } from "./ActionsBlock";
import { BaseModalProps } from "./modal.types";

const DEFAULTS: BaseModalProps["actionOptions"] = {
  position: "inherit",
  align: "bottom",
};

export const Modal = ({
  styleMain,
  action,
  actionOptions,
  setClose,
  children,
}: BaseModalProps) => {
  useEffect(() => {
    document.body.classList.add("modal");

    return () => {
      document.body.classList.remove("modal");
    };
  }, []);

  const options = { ...DEFAULTS, ...actionOptions };

  const Actions = options.showActions ? (
    <ActionsBlock action={action} actionOptions={options} onClose={setClose} />
  ) : null;

  return createPortal(
    <div
      onClick={setClose}
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 "
    >
      <motion.div
        initial={{ opacity: 0.1, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.125 }}
        className={classNames(
          styleMain,
          { absolute: styleMain },
          " flex flex-col justify-center"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {options.showActions && options.align == "top" && Actions}
        <>{children}</>
        {options.showActions && options.align === "bottom" && Actions}
      </motion.div>
    </div>,
    document.body
  );
};
