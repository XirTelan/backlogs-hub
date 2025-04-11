import { btnStyleVariants } from "@/shared/lib/styles";
import { ButtonBaseProps } from "@/types";
import classNames from "classnames";
import React from "react";

/**
 *Base UI button component
 * @param {boolean} hideText Text will be hidden with screen < 768px
 */
export const ButtonBase = ({
  text,
  hideText = false,
  size = "large",
  variant = "primary",
  icon,
  children,
  ...props
}: ButtonBaseProps) => {
  return (
    <>
      <button
        {...props}
        className={classNames(
          "relative flex not-disabled:cursor-pointer  w-full  items-center text-nowrap disabled:bg-button-disabled disabled:text-text-on-color-disabled",
          btnStyleVariants.colors[variant],
          btnStyleVariants.heights[size]
        )}
      >
        {children}
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
                "text-icon-primary": !text && variant === "ghost",
              }
            )}
          >
            {icon}
          </div>
        )}
      </button>
    </>
  );
};

