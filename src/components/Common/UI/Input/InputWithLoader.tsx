"use client";
import React from "react";
import InputField from "./InputField";
import { InputFieldProps } from "@/types";

type InputWithLoaderProps = {
  isLoading: boolean;
  isAvailable: boolean;
  errorMsg?: string;
};

const InputWithLoader = React.forwardRef<
  HTMLInputElement,
  InputFieldProps & InputWithLoaderProps
>(({ isLoading, errorMsg, isAvailable, helperText, ...props }, ref) => {
  
  const getHelperText = (
    isLoading: boolean,
    isAvailable: boolean,
    helperText: InputFieldProps["helperText"],
    errorMsg?: string,
  ): InputFieldProps["helperText"] => {
    if (isLoading) return undefined;
    if (isAvailable) return helperText;
    return {
      type: "error",
      message: errorMsg ?? "This name is already taken",
    };
  };

  return (
    <InputField
      {...props}
      helperText={getHelperText(isLoading, isAvailable, helperText, errorMsg)}
      ref={ref}
    >
      {isLoading && (
        <div className="absolute bottom-0 right-0 top-0 flex   items-center    ">
          <div className=" h-6 w-6 animate-spin rounded-full border-4 border-neutral-500 border-t-cyan-500 "></div>
        </div>
      )}
    </InputField>
  );
});
InputWithLoader.displayName = "InputWithLoader";
export default InputWithLoader;
