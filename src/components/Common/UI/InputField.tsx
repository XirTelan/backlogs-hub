import { InputFieldProps as Props } from "@/types";
import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const InputField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      variant = "large",
      layer = 1,
      helperText,
      placeholder,
      children,
      isSimple = false,
      ...props
    },
    ref,
  ) => {
    const helperType = {
      text: " text-subtle-3",
      error: " text-error-text",
    };
    const sizes = {
      small: "h-8 px-4 py-[7px] ",
      medium: "h-10 px-4 py-[11px] ",
      large: "h-12 p-4",
    };
    const inputLayers = {
      1: "bg-field-1 border-strong-1 ",
      2: "bg-field-2 border-strong-2",
      3: "bg-field-3 border-strong-3",
    };

    const helperTextBlock = () => {
      if (!helperText) return <div className="h-5 pt-1" />;
      return (
        <div className="h-5 pt-1">
          <span
            className={`${helperType[helperText?.type]} flex h-4 text-base leading-4 `}
          >
            {helperText.message}
          </span>
        </div>
      );
    };

    return (
      <div className="group relative flex  w-full flex-col  ">
        {!isSimple && (
          <label htmlFor={id} className="h-6 pb-2  text-secondary-text ">
            {label}
          </label>
        )}
        <input
          type="input"
          className={`${inputLayers[layer]} ${sizes[variant]} ${helperText?.type === "error" ? "outline-2 -outline-offset-2 outline-error-support" : "border-b border-strong-1"}     text-secondary-text outline-none placeholder:text-strong-1 read-only:bg-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-white `}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
        />
        {helperText?.type === "error" && (
          <div
            className="absolute bottom-0 right-4 top-0 flex items-center text-error-text  "
            title={"Error"}
          >
            <FaCircleExclamation />
          </div>
        )}
        {!isSimple && helperTextBlock()}
        {children}
      </div>
    );
  },
);
InputField.displayName = "InputField";
export default InputField;
