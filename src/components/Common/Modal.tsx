import React from "react";
import { createPortal } from "react-dom";

const Modal = ({
  setClose,
  children,
}: {
  setClose: () => void;
  children: React.ReactElement;
}) => {
  return createPortal(
    <div
      onClick={setClose}
      className="absolute inset-0 flex items-center justify-center bg-neutral-900/90"
    >
      <div className="flex" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
