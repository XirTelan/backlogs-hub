import React from "react";

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
    <button
      className={`rounded border border-neutral-700  bg-neutral-800 p-2 `}
      style={{ backgroundColor: isActive ? activeColor : "" }}
      {...props}
    >
      {title}
    </button>
  );
};

export default ToggleButton;
