import { buttonColorVariants, buttonSize, sizes } from "@/lib/styles";
import { ButtonBaseProps } from "@/types";
import React from "react";

/**
 *Base UI button component
 * @param {boolean} hideText Text will be hidden with screen < 768px
 */
const ButtonBase = ({
  text,
  hideText = false,
  size = "large",
  variant = "primary",
  icon,
  ...props
}: ButtonBaseProps) => {
  return (
    <>
      <button
        {...props}
        className={`${buttonColorVariants[variant]} ${sizes[size]}  relative flex  w-full  items-center text-nowrap     disabled:bg-layer-3 disabled:text-white/25 `}
      >
        {text && (
          <div className={` px-2  ${hideText && "hidden md:block"}`}>
            {text}
          </div>
        )}
        {icon && (
          <div
            className={`${buttonSize[size]} ${text && "ms-auto"}  flex min-h-8 items-center justify-center p-1 `}
          >
            {icon}
          </div>
        )}
      </button>
    </>
  );
};

export default ButtonBase;
