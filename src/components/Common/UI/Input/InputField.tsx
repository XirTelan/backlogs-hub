import { InputFieldProps as Props } from "@/types";
import React from "react";
import { inputStyleVariants } from "@/lib/styles";
import { FaCircleExclamation } from "react-icons/fa6";
import InputBase from "./InputBase";

const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, helperText, children, isSimple = false, ...props }, ref) => {
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
          variant={"large"}
          layer={1}
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
