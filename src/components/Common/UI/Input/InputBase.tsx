import { inputStyleVariants } from "@/lib/styles";
import { InputFielBasedProps } from "@/types";
import classNames from "classnames";
import React from "react";

const InputBase = React.forwardRef<HTMLInputElement, InputFielBasedProps>(
  ({ layer = 1, variant = "large", helperText, children, ...props }, ref) => {
    const inputClass = classNames(
      inputStyleVariants.layers[layer],
      inputStyleVariants.sizes[variant],
      helperText?.type === "error"
        ? "outline-2 -outline-offset-2 outline-error-support"
        : "border-b border-strong-1",
      "text-secondary-text outline-none placeholder:text-strong-1 read-only:bg-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-white ",
    );
    return (
      <input type="text" className={inputClass} {...props} ref={ref}>
        {children}
      </input>
    );
  },
);
InputBase.displayName = "InputBase";
export default InputBase;
