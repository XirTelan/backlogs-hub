import { InputField } from "@/types";
import React from "react";

const InputField = React.forwardRef<HTMLInputElement, InputField>(
  ({ label, children, ...props }, ref) => {
    return (
      <>
        {label && <label htmlFor="">{label}</label>}
        <input
          className=" rounded bg-slate-800  px-4 py-2"
          {...props}
          ref={ref}
        >
          {children}
        </input>
      </>
    );
  },
);
InputField.displayName = "InputField";
export default InputField;
