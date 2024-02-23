import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";

const LinkBase = ({
  children,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link {...props} className="  text-primary-link">
      {children}
    </Link>
  );
};

export default LinkBase;
