import Link from "next/link";
import React from "react";

import { btnStyleVariants } from "@/shared/constants/styles";
import classNames from "classnames";
import { ButtonBaseProps } from "../types";

export const LinkWithBtnStyle = ({
  href,
  children,
  icon,
  size = "large",
  variant = "primary",
  hideText = false,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      {...props}
      className={classNames(
        "flex  items-center text-nowrap     disabled:bg-layer-3 disabled:text-white/25 ",
        props.className,
        btnStyleVariants.colors[variant],
        btnStyleVariants.heights[size]
      )}
    >
      {children && (
        <div className={`${hideText && "hidden"}  px-2 md:block`}>
          {children}
        </div>
      )}
      <div
        className={classNames(
          btnStyleVariants.sizes[size],
          children ? "ms-auto md:m-0 md:ms-auto" : "m-auto",
          "flex min-h-8 items-center justify-center p-1"
        )}
      >
        {icon}
      </div>
    </Link>
  );
};

type LinkButtonProps = {
  href: string;
  children?: React.ReactNode;
  variant?: ButtonBaseProps["variant"];
  size?: ButtonBaseProps["size"];
  icon?: ButtonBaseProps["icon"];
  hideText?: boolean;
  target?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;
