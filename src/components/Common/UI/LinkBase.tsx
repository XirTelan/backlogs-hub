import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";

const LinkBase = ({
  children,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      {...props}
      className="  text-primary-link hover:text-primary-link-hover"
    >
      {children}
    </Link>
  );
};

export default LinkBase;
