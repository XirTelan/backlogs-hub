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
      rel={isExternal ? "noopener nofollow noreferrer" : undefined}
      {...props}
      className="  flex text-link-primary hover:text-link-primary-hover"
    >
      {children}
    </Link>
  );
};

export default LinkBase;
