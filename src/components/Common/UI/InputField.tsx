import { InputField } from "@/types";
import React from "react";

const InputField = React.forwardRef<HTMLInputElement, InputField>(
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
    return (
      <div className="h-30 group relative flex  w-full flex-col  ">
        {!isSimple && (
          <label htmlFor={id} className="h-6 pb-2  text-secondary-text ">
            {label}
          </label>
        )}
        <input
          type="input"
          className={`${inputLayers[layer]} ${sizes[variant]}    border-b border-strong-1   text-secondary-text outline-none placeholder:text-strong-1 read-only:bg-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-white `}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
        />
        {!isSimple && (
          <div className="h-5 pt-1">
            <span className="flex h-4 text-base leading-4 text-subtle-3">
              {helperText}
            </span>
          </div>
        )}
        {children}
      </div>
    );
  },
);
InputField.displayName = "InputField";
export default InputField;
