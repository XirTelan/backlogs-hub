"use client";

import { ButtonBase } from "../ButtonBase";
import { BaseModalProps } from "./modal.types";

const POSITIONS = {
  inherit: "",
  absolute: "absolute top-10 z-50 left-10 right-10",
};

export const ActionsBlock = ({
  action,
  actionOptions,
  onClose,
}: {
  action?: () => void;
  actionOptions: Required<BaseModalProps>["actionOptions"];
  onClose: () => void;
}) => {
  const { cancelBtn, confirmBtn } = actionOptions;

  return (
    <div
      className={`flex ${POSITIONS[actionOptions.position as keyof typeof POSITIONS]}`}
    >
      <ButtonBase
        style={{ width: "100%" }}
        variant={cancelBtn?.clrVariant ?? "secondary"}
        text={cancelBtn?.text ?? "Cancel"}
        onClick={onClose}
      />
      {action && (
        <ButtonBase
          style={{ width: "100%" }}
          variant={confirmBtn?.clrVariant ?? "primary"}
          text={confirmBtn?.text ?? "Confirm"}
          onClick={async () => {
            await action();
            onClose();
          }}
          {...confirmBtn?.confirmOptions}
        />
      )}
    </div>
  );
};
