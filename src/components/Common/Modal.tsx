import React from "react";
import { createPortal } from "react-dom";
import ButtonBase from "./UI/ButtonBase";
import { ButtonBaseProps } from "@/types";

const Modal = ({
  action,
  actionType = "primary",
  confirmOptions,
  showActions,
  setClose,
  children,
}: {
  confirmOptions?: ButtonBaseProps;
  action?: () => unknown;
  actionType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "dangerPrimary"
    | "dangerTertiary"
    | "dangerGhost";
  showActions?: boolean;
  setClose: () => void;
  children: React.ReactElement | React.ReactElement[];
}) => {
  return createPortal(
    <div
      onClick={setClose}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        className="absolute   top-1/4 flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <>{children}</>
        {showActions && (
          <div className="flex w-full">
            <ButtonBase
              style={{ width: "100%" }}
              variant="secondary"
              text="Cancel"
              onClick={setClose}
            />
            <ButtonBase
              style={{ width: "100%" }}
              variant={actionType}
              text="Confirm"
              {...confirmOptions}
              onClick={async () => {
                if (!action) return;
                action();
                setClose();
              }}
            />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
