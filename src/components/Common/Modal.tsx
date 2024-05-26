import React from "react";
import { createPortal } from "react-dom";
import ButtonBase from "./UI/ButtonBase";

const Modal = ({
  action,
  showActions = false,
  setClose,
  children,
}: {
  action?: () => void;
  showActions?: boolean;
  setClose: () => void;
  children: React.ReactElement;
}) => {
  return createPortal(
    <div
      onClick={setClose}
      className="absolute inset-0 flex items-center justify-center bg-neutral-900/90"
    >
      <div
        className="flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
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
              variant="dangerPrimary"
              text="Confirm"
              onClick={action}
            />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
