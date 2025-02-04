"use client";
import React from "react";
import InputField from "./InputField";
import { InputFieldProps } from "@/types";
import { FaCheck } from "react-icons/fa6";

type InputWithLoaderProps = {
  isLoading: boolean;
  isAvailable: boolean;
  errorMsg?: string;
};

const InputWithLoader = ({
  isLoading,
  errorMsg,
  isAvailable,
  helperText,
  ref,
  ...props
}: InputFieldProps & InputWithLoaderProps) => {
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
      <div className="absolute bottom-0 right-0 top-0 me-4 flex   items-center    ">
        {isLoading && (
          <div className=" h-6 w-6 animate-spin rounded-full border-4 border-neutral-500 border-t-cyan-500 "></div>
        )}
        {!isLoading &&
          isAvailable &&
          (props?.value?.toString() ?? "").length > 4 && (
            <FaCheck color="green" />
          )}
      </div>
    </InputField>
  );
};
export default InputWithLoader;
