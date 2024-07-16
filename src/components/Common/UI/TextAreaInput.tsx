import { TextArea } from "@/types";
import React from "react";

const elevation = {
  1: "bg-field-1 border-b-strong-1",
  2: "bg-field-2 border-b-strong-2",
  3: "bg-field-3 border-b-strong-3",
};

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextArea>(
  ({ id, label, placeholder, layer = 1, children, ...props }, ref) => {
    const isLabel = label
      ? " placeholder:text-transparent"
      : "placeholder:text-neutral-400";
    return (
      <div className="field group relative w-full  px-0 py-4   ">
        <textarea
          type="input"
          className={`peer w-full border-0 border-b ${elevation[layer]}  p-4 outline-0 transition-colors ${isLabel}`}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
        />
        {label && (
          <label
            htmlFor={id}
            className=" pointer-events-none absolute left-2 top-0 text-base  text-neutral-500 transition-all duration-200 hover:cursor-text peer-placeholder-shown:top-6  peer-placeholder-shown:text-xl peer-focus:-top-2 peer-focus:left-0 peer-focus:text-base peer-focus:transition-all peer-focus:duration-200"
          >
            {label}
          </label>
        )}
        {children}
      </div>
    );
  },
);
TextAreaInput.displayName = "TextArea";
export default TextAreaInput;
