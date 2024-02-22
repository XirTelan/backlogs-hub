import React from "react";

const ButtonBase = ({
  children,
  text,
  size = "large",
  variant = "primary",
  ...props
}: ButtonBaseProps) => {
  const sizes = {
    small: "h-8 pe-8",
    medium: "h-10 pe-10",
    large: "h-12 pe-12 ",
  };
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
        className={`${variants[variant]} ${sizes[size]} relative flex w-full min-w-fit items-center text-nowrap  ${text && "ps-4"}  `}
      >
        {text}
        <div className="absolute inset-0  flex items-center justify-center bg-white bg-opacity-0 ">
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
  size?: "small" | "medium" | "large";
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
