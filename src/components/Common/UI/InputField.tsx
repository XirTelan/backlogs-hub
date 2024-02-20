import { InputField } from "@/types";
import React from "react";

const InputField = React.forwardRef<HTMLInputElement, InputField>(
  (
    { id, label, layer = 1, helperText, placeholder, children, ...props },
    ref,
  ) => {
    const isLabel = label
      ? " placeholder:text-transparent"
      : "placeholder:text-neutral-400";

    const inputLayers = {
      1: "bg-field-1 border-strong-1 ",
      2: "bg-field-2 border-strong-2",
      3: "bg-field-3 border-strong-3",
    };
    return (
      <div className="h-30 group relative flex h-[92px] w-full flex-col  ">
        <label htmlFor={id} className="h-6 pb-2  text-secondary-text ">
          {label}
        </label>
        <input
          type="input"
          className={`${inputLayers[layer]}  h-12  border-b border-strong-1  p-4 text-secondary-text outline-none placeholder:text-strong-1 read-only:bg-transparent focus:border-2 focus:border-white `}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
        />
        <div className="h-5 pt-1">
          <span className="flex h-4 text-base leading-4 text-subtle-3">
            {helperText}
          </span>
        </div>
        {children}
      </div>
    );
  },
);
InputField.displayName = "InputField";
export default InputField;
