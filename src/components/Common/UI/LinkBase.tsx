import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";

const sizes = {
  small: "h-4 text-xs",
  medium: "h-[1.125rem] text-sm",
  large: "h-[1.375rem] text-base",
};

const iconSizes = {
  small: "h-4 w-4",
  medium: "h-4 w-4",
  large: "h-[20px] w-[20px]",
};

type LinkBaseProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    size?: keyof typeof sizes;
    isExternal?: boolean;
    icon?: React.ReactElement;
  };

const LinkBase = ({
  children,
  size = "medium",
  isExternal,
  icon,
  ...props
}: LinkBaseProps) => {
  return (
    <Link
      rel={isExternal ? "noopener nofollow noreferrer" : undefined}
      {...props}
      className={classNames(
        "flex text-link-primary hover:text-link-primary-hover font-normal hover:underline leading-[18px] ",
        sizes[size],
      )}
    >
      <>
        {children}
        {icon && (
          <div
            className={classNames(
              iconSizes[size],
              "ms-1 inline-flex items-center justify-center  self-center",
            )}
          >
            {icon}
          </div>
        )}
      </>
    </Link>
  );
};

export default LinkBase;
