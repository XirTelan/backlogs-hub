import { InputFieldProps as Props } from "@/types";
import React from "react";
import { inputStyleVariants } from "@/lib/styles";
import { FaCircleExclamation } from "react-icons/fa6";
import InputBase from "./InputBase";

const InputField = ({
  id,
  label,
  helperText,
  children,
  isSimple = false,
  ref,
  ...props
}: Props) => {
  const helperTextBlock = () => {
    if (!helperText) return <div className="h-5 pt-1" />;
    return (
      <div className="h-5 pt-1">
        <span
          className={`${inputStyleVariants.helperType[helperText?.type]} flex h-4 text-base leading-4 `}
        >
          {helperText.message}
        </span>
      </div>
    );
  };

  return (
    <div className="group relative flex  w-full flex-col  ">
      {!isSimple && (
        <label htmlFor={id} className="h-6 pb-2  text-text-secondary ">
          {label}
        </label>
      )}
      <InputBase
        layer={1}
        name={id}
        id={id}
        {...props}
        isError={helperText?.type === "error"}
        ref={ref}
      />
      {helperText?.type === "error" && (
        <div
          className="absolute bottom-0 right-4 top-0 flex items-center text-text-error  "
          title={helperText.message ?? "Error"}
        >
          <FaCircleExclamation />
        </div>
      )}
      {!isSimple && helperTextBlock()}
      {children}
    </div>
  );
};
export default InputField;
