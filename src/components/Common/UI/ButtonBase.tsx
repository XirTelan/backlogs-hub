import { btnStyleVariants } from "@/lib/styles";
import { ButtonBaseProps } from "@/types";
import classNames from "classnames";
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
        className={classNames(
          "relative flex  w-full  items-center text-nowrap cursor-pointer disabled:bg-layer-3 disabled:text-white/25",
          btnStyleVariants.colors[variant],
          btnStyleVariants.heights[size],
        )}
      >
        {text && (
          <div
            className={classNames({
              "px-2": true,
              "hidden md:block": hideText,
            })}
          >
            {text}
          </div>
        )}
        {icon && (
          <div
            className={classNames(
              `pointer-events-none flex min-h-8 items-center justify-center p-1 `,
              btnStyleVariants.sizes[size],
              {
                "ms-auto": text,
              },
            )}
          >
            {icon}
          </div>
        )}
      </button>
    </>
  );
};

export default ButtonBase;
