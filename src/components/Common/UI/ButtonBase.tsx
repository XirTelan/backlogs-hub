import { ButtonBaseProps } from "@/types";
import React from "react";

const ButtonBase = ({
  children,
  text,
  size = "large",
  variant = "primary",
  icon,
  ...props
}: ButtonBaseProps) => {
  const sizes = {
    small: "h-8  ",
    medium: "h-10  ",
    large: "h-12  ",
  };
  const variants = {
    primary: "bg-primary-btn hover:bg-primary-btn-hover text-white ",
    secondary:
      "bg-secondary-btn hover:bg-secondary-btn-hover text-secondary-text",
    tertiary:
      "outline text-white  hover:text-inverse outline-1 -outline-offset-2 outline-white hover:bg-tertiary-btn-hover",
    ghost: "text-primary-link hover:bg-subtle-3/15",
    dangerPrimary: "bg-danger-btn hover:bg-danger-btn-hover text-white",
    dangerTertiary: "  ",
    dangerGhost:
      "text-danger-text hover:bg-danger-btn-hover hover:text-white disabled:bg-transparent",
  };

  return (
    <>
      <button
        {...props}
        className={`${variants[variant]} ${sizes[size]}  relative flex  items-center  text-nowrap     disabled:bg-layer-3 disabled:text-white/25 `}
      >
        {text && <div className="px-2">{text}</div>}
        {icon && (
          <div className="ms-auto flex min-h-8 min-w-8 items-center justify-center p-1 ">
            {icon}
          </div>
        )}
      </button>
    </>
  );
};

export default ButtonBase;
