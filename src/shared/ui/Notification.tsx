import React from "react";
import { BsSlashCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ButtonBase } from "./ButtonBase";
import { FaCircleInfo } from "react-icons/fa6";

type NotificationTypes = "info" | "success" | "error";

export const toastStyle = {
  info: {
    border: "border-s-support-info border-support-info/50",
    text: "text-support-info",
    icon: <FaCircleInfo />,
  },
  success: {
    border: " border-s-support-success border-support-success/50",
    text: "text-support-success",
    icon: <FaCheckCircle />,
  },
  error: {
    border: "border-s-support-error border-support-error/30",
    text: " text-support-error ",
    icon: <BsSlashCircleFill />,
  },
};

export const Notification = ({
  text,
  type,
  options = {
    showBtn: true,
  },
  action,
}: {
  text: React.ReactNode;
  type: NotificationTypes;
  options?: {
    showBtn: boolean;
  };
  action?: () => void;
}) => {
  return (
    <div
      className={`  flex min-h-12 items-center gap-4 border border-s-4 ${toastStyle[type].border}  bg-layer-1`}
    >
      <div className={`ms-4 ${toastStyle[type].text} `}>
        {toastStyle[type].icon}
      </div>
      <label
        aria-label={`notification. Type: ${type}`}
        className="flex w-full flex-wrap"
      >
        {text}
      </label>
      {options.showBtn && (
        <ButtonBase
          variant="ghost"
          className="p-4"
          onClick={action}
          icon={<IoMdClose />}
        />
      )}
    </div>
  );
};

export default Notification;
