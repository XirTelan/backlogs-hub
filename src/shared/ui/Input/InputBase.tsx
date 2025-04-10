import { inputStyleVariants } from "@/shared/lib/styles";
import { InputBaseProps } from "@/shared/types";
import classNames from "classnames";
import React from "react";

const InputBase = ({
  layer = 1,
  variant = "large",
  isError,
  children,
  ref,
  ...props
}: InputBaseProps) => {
  const inputClass = classNames(
    inputStyleVariants.layers[layer],
    inputStyleVariants.sizes[variant],
    {
      "outline-2 -outline-offset-2 outline-support-error": isError,
      "border-b border-border-strong-1": !isError,
    },
    "text-text-secondary outline-hidden placeholder:text-strong-1  read-only:bg-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-white "
  );
  return (
    <input type="text" className={inputClass} {...props} ref={ref}>
      {children}
    </input>
  );
};
export default InputBase;
