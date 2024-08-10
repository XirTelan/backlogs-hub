import React from "react";
import { createPortal } from "react-dom";
import ButtonBase, { ButtonColorVariants } from "./UI/ButtonBase";
import { ButtonBaseProps } from "@/types";

const DEFAULTS: ModalProps["actionOptions"] = {
  position: "inherit",
  align: "bottom",
};

const Modal = ({
  action,
  confirmOptions,
  showActions,
  actionOptions = DEFAULTS,
  setClose,
  children,
}: ModalProps) => {
  const positions = {
    inherit: "",
    absolute: "absolute top-0 z-50",
  };
  const ActionsBlock = () => (
    <div
      className={`flex w-full ${positions[actionOptions.position ?? DEFAULTS.position!]}`}
    >
      <ButtonBase
        style={{ width: "100%" }}
        variant={actionOptions.cancelBtn?.clrVariant ?? "secondary"}
        text={actionOptions.cancelBtn?.text ?? "Cancel"}
        onClick={setClose}
      />
      {action && (
        <ButtonBase
          style={{ width: "100%" }}
          variant={actionOptions.confirmBtn?.clrVariant ?? "primary"}
          text={actionOptions.confirmBtn?.text ?? "confirm"}
          {...confirmOptions}
          onClick={async () => {
            if (!action) return;
            action();
            setClose();
          }}
        />
      )}
    </div>
  );

  return createPortal(
    <div
      onClick={setClose}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 "
    >
      <div
        className="absolute  flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {showActions && (actionOptions.align ?? DEFAULTS.align) == "top" && (
          <ActionsBlock />
        )}
        <>{children}</>
        {showActions &&
          (actionOptions.align ?? DEFAULTS.align) === "bottom" && (
            <ActionsBlock />
          )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

type ModalProps = {
  confirmOptions?: ButtonBaseProps;
  action?: () => unknown;
  showActions?: boolean;
  actionOptions?: {
    position?: "inherit" | "absolute";
    align?: "top" | "bottom";
    confirmBtn?: {
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
