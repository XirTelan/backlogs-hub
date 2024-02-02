import React  from "react";

type ToggleButtonProps = {
  title: string;
  isActive: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const ToggleButton = ({ title, isActive, ...props }: ToggleButtonProps) => {
  return (
    <button
      className={`rounded border border-neutral-700 ${isActive ? " bg-green-800" : " bg-neutral-800"} p-2 `}
      {...props}
    >
      {title}
    </button>
  );
};

export default ToggleButton;
