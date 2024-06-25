import { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import { FaArrowRight } from "react-icons/fa";
const BacklogCard = ({
  children,
  ...props
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      className="flex h-52 w-40 flex-shrink-0 flex-col  bg-layer-1 p-4 hover:bg-field-hover-1"
    >
      <>{children}</>
      <FaArrowRight className="mt-auto self-end text-primary-link" />
    </a>
  );
};

export default BacklogCard;
