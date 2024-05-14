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
      className="flex h-40 w-28 flex-col justify-between bg-layer-1 p-4 hover:bg-field-hover-1"
    >
      <>{children}</>
      <FaArrowRight className=" self-end text-primary-link" />
    </a>
  );
};

export default BacklogCard;
