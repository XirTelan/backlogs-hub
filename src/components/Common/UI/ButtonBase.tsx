import React from "react";

const ButtonBase = ({
  text = "Click",
  variant = "filled",
}: ButtonBaseProps) => {
  const variants = {
    filled: {
      btn: "bg-primary hover:bg-primary/90  disabled:bg-on-surface/10 ",
      text: "text-on-primary group-hovered:text-on-primary/10 group-disabled:text-on-surface/40",
    },
    outline: {
      btn: " border border-outline",
      text: "text-primary",
    },
  };

  return (
    <>
      <button
        className={`${variants[variant].btn} group inline-flex h-10 w-[83px] flex-col items-center justify-center rounded-full shadow `}
      >
        <div className="inline-flex items-center justify-center gap-2 self-stretch px-6 py-2.5">
          <div
            className={`${variants[variant].text} text-center  text-sm font-medium leading-tight tracking-tight `}
          >
            {text}
          </div>
        </div>
      </button>
    </>
  );
};

export default ButtonBase;

type ButtonBaseProps = {
  text?: string;
  variant?: "filled" | "outline";
};
