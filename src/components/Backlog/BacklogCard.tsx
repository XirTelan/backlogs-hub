import { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import { FaArrowRight } from "react-icons/fa";
import LinkWithBtnStyle from "../Common/UI/LinkWithBtnStyle";
import { IoAdd } from "react-icons/io5";

const BacklogCard = ({
  children,
  href,
  createLink,
  ...props
}: BacklogCardProps) => {
  return (
    <div className="group flex h-52 w-40 flex-shrink-0 flex-col  bg-layer-1  hover:bg-field-hover-1 ">
      <div className="p-4">
        <>{children}</>
      </div>
      <div className="mt-auto flex opacity-100 transition-all duration-300 ease-in-out *:w-full md:flex-wrap md:opacity-0 md:group-hover:opacity-100 ">
        <LinkWithBtnStyle
          size="small"
          variant="ghostAccent"
          href={href}
          icon={<IoAdd size={24} />}
        >
          Add Item
        </LinkWithBtnStyle>
        <LinkWithBtnStyle
          size="small"
          variant="tertiary"
          href={createLink}
          icon={<FaArrowRight />}
        >
          View
        </LinkWithBtnStyle>
      </div>
    </div>
  );
};

export default BacklogCard;

type BacklogCardProps = {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  createLink: string;
};
