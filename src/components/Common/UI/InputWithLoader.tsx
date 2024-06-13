"use client";
import React from "react";
import InputField from "./InputField";
import { InputFieldProps } from "@/types";

type InputWithLoaderProps = {
  isLoading: boolean;
  isAvailable: boolean;
};

const InputWithLoader = React.forwardRef<
  HTMLInputElement,
  InputFieldProps & InputWithLoaderProps
>(({ isLoading, isAvailable, helperText, ...props }, ref) => {
  return (
    <InputField
      {...props}
      helperText={
        isLoading
          ? undefined
          : isAvailable
            ? helperText
            : {
                type: "error",
                message: "This name is already taken",
              }
      }
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
