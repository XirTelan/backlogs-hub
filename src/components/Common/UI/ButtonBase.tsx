import { ButtonBaseProps } from "@/types";
import React from "react";

const ButtonBase = ({
  children,
  text,
  size = "large",
  variant = "primary",
  ...props
}: ButtonBaseProps) => {
  const sizes = {
    small: "h-8  lg:pe-8",
    medium: "h-10  lg:pe-10",
    large: "h-12 lg:pe-12 ",
  };
  const variants = {
    primary: "bg-primary-btn hover:bg-primary-btn-hover text-white ",
    secondary: "bg-secondary-btn hover:bg-secondary-btn-hover",
    tertiary:
      "outline text-white  hover:text-inverse outline-1 -outline-offset-2 outline-white hover:bg-tertiary-btn-hover",
    ghost: "text-primary-link hover:bg-subtle-3/15",
    dangerPrimary: "",
    dangerTertiary: "",
    dangerGhost:
      "text-danger-btn hover:bg-danger-btn-hover hover:text-white disabled:bg-transparent",
  };

  return (
    <>
      <button
        {...props}
        className={`${variants[variant]} ${sizes[size]} ${text ? "min-w-fit" : "min-w-10" } relative  flex w-full  items-center pe-6 text-nowrap   ${text && "md:ps-4"} disabled:bg-layer-3 disabled:text-white/25 `}
      >
        {text}
        <div
          className={`${text ? "right-[calc(0%+1rem)]" : "inset-0"} absolute   flex items-center justify-center bg-white bg-opacity-0 `}
        >
          {children}
        </div>
      </button>
    </>
  );
};

export default ButtonBase;
