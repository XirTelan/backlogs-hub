import { TextArea } from "@/types";
import React from "react";

const elevation = {
  1: "bg-field-1 border-b-strong-1",
  2: "bg-field-2 border-b-strong-2",
  3: "bg-field-3 border-b-strong-3",
};

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextArea>(
  ({ id, label, placeholder, layer = 1, children, ...props }, ref) => {
    return (
      <div className="field group relative w-full  px-0 py-4   ">
        {label && (
          <label htmlFor={id} className="h-6 pb-2  text-text-secondary ">
            {label}
          </label>
        )}
        <textarea
          type="input"
          className={`peer w-full border-0 border-b ${elevation[layer]}  p-4 outline-0 transition-colors `}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
        />

        {children}
      </div>
    );
  },
);
TextAreaInput.displayName = "TextArea";
export default TextAreaInput;
