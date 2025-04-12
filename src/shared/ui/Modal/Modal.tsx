"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ButtonBaseProps, ButtonColorVariants } from "@/types";
import { motion } from "framer-motion";
import classNames from "classnames";
import { ActionsBlock } from "./ActionsBlock";

const DEFAULTS: BaseModalProps["actionOptions"] = {
  position: "inherit",
  align: "bottom",
};

export const Modal = ({
  styleMain,
  action,
  actionOptions = DEFAULTS,
  setClose,
  children,
}: BaseModalProps) => {
  const positions = {
    inherit: "",
    absolute: "absolute top-10 z-50 left-10 right-10",
  };

  useEffect(() => {
    document.body.classList.toggle("modal");

    return () => {
      document.body.classList.toggle("modal");
    };
  });

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
        {actionOptions.showActions &&
          (actionOptions.align ?? DEFAULTS.align) == "top" && <ActionsBlock />}
        <>{children}</>
        {actionOptions.showActions &&
          (actionOptions.align ?? DEFAULTS.align) === "bottom" && (
            <ActionsBlock />
          )}
      </motion.div>
    </div>,
    document.body
  );
};

export type BaseModalProps = {
  styleMain?: string;
  action?: () => unknown;
  actionOptions?: {
    showActions?: boolean;
    position?: "inherit" | "absolute";
    align?: "top" | "bottom";
    confirmBtn?: {
      confirmOptions?: ButtonBaseProps;
      text?: string;
      clrVariant?: ButtonColorVariants;
    };
    cancelBtn?: {
      text?: string;
      clrVariant?: ButtonColorVariants;
    };
  };
  setClose: () => void;
  children: React.ReactElement | React.ReactElement[];
};
