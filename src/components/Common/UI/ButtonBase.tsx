import React from "react";

const ButtonBase = ({
  children,
  text = "Click",
  variant = "primary",
  ...props
}: ButtonBaseProps) => {
  const variants = {
    primary: "bg-primary-btn hover:bg-primary-btn-hover text-white ",
    secondary: "bg-secondary-btn hover:bg-secondary-btn-hover",
    tertiary:
      "outline text-white  hover:text-inverse outline-1 -outline-offset-2 outline-white hover:bg-tertiary-btn-hover",
    ghost: "",
    dangerPrimary: "",
    dangerTertiary: "",
    dangerGhost: "",
  };

  return (
    <>
      <button
        {...props}
        className={`${variants[variant]}   relative flex h-12 w-full   items-center pe-12 ps-4 `}
      >
        {text}
        <div className="absolute right-4 flex items-center justify-center bg-white bg-opacity-0 ">
          {children}
        </div>
      </button>
    </>
  );
};

export default ButtonBase;

type ButtonBaseProps = {
  children?: React.ReactElement;
  text?: string;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "dangerPrimary"
    | "dangerTertiary"
    | "dangerGhost";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
