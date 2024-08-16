import React from "react";
import ButtonBase from "./ButtonBase";

type ToggleButtonProps = {
  title: string;
  activeColor?: string;
  isActive: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const ToggleButton = ({
  title,
  isActive,
  activeColor = "#000000",
  ...props
}: ToggleButtonProps) => {
  return (
    <ButtonBase
      className={`rounded border border-neutral-700  bg-neutral-800 p-2 `}
      variant="tertiary"
      {...props}
      style={{ backgroundColor: isActive ? activeColor : "" }}
      text={title}
      icon={
        <div className="h-4 w-4" style={{ backgroundColor: activeColor }}></div>
      }
    />
  );
};

export default ToggleButton;
