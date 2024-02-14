import { InputField } from "@/types";
import React from "react";

const InputField = React.forwardRef<HTMLInputElement, InputField>(
  ({ id, label, placeholder, children, ...props }, ref) => {
    const isLabel = label
      ? " placeholder:text-transparent"
      : "placeholder:text-neutral-400";
    return (
      <div className="field group relative w-full  px-0 py-4  ">
        <input
          type="input"
          className={`peer w-full border-0 border-b border-b-neutral-600 bg-transparent px-0 py-2 outline-0 transition-colors ${isLabel}`}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
        />
        {label && (
          <label
            htmlFor={id}
            className=" pointer-events-none absolute left-0 top-0 text-base  text-neutral-500 transition-all duration-200 hover:cursor-text peer-placeholder-shown:top-6  peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-base peer-focus:transition-all peer-focus:duration-200"
          >
            {label}
          </label>
        )}
        {children}
      </div>
    );
  },
);
InputField.displayName = "InputField";
export default InputField;
