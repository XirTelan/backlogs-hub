import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";

const LinkBase = ({
  children,
  isExternal,
  ...props
}: LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { isExternal?: boolean }) => {
  return (
    <Link
      rel={isExternal ? "noopener nofollow noreferrer" : ""}
      {...props}
      className="  flex text-primary-link hover:text-primary-link-hover"
    >
      {children}
    </Link>
  );
};

export default LinkBase;
