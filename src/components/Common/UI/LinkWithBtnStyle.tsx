import Link from "next/link";
import React from "react";

import { ButtonBaseProps } from "@/types";
import { buttonColorVariants, buttonSize, sizes } from "@/data";

const LinkWithBtnStyle = ({
  href,
  children,
  icon,
  size = "large",
  variant = "primary",
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      {...props}
      href={href}
      className={`${buttonColorVariants[variant]}  ${sizes[size]} flex  w-full  items-center text-nowrap     disabled:bg-layer-3 disabled:text-white/25 `}
    >
      {children && <div className={` hidden  px-2 md:block`}>{children}</div>}
      <div
        className={`${buttonSize[size]} ${children && "ms-auto"}  flex min-h-8 items-center justify-center p-1 `}
      >
        {icon}
      </div>
    </Link>
  );
};

export default LinkWithBtnStyle;
type LinkButtonProps = {
  href: string;
  children?: React.ReactNode;
  variant?: ButtonBaseProps["variant"];
  size?: ButtonBaseProps["size"];
  icon?: ButtonBaseProps["icon"];
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
