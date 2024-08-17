import React from "react";
import { FaArrowRight } from "react-icons/fa";
import LinkWithBtnStyle from "../Common/UI/LinkWithBtnStyle";
import { IoAdd } from "react-icons/io5";

const BacklogCard = ({ children, href, createLink }: BacklogCardProps) => {
  return (
    <div className="group relative flex h-52 w-40 flex-shrink-0 flex-col  bg-layer-1  hover:bg-field-hover-1 ">
      <div className="p-4">
        <>{children}</>
      </div>
      <div className="mt-auto flex opacity-100 transition-all duration-300 ease-in-out *:w-full md:absolute md:inset-0 md:m-0 md:flex-col-reverse  md:flex-wrap md:bg-layer-1 md:opacity-0 md:group-hover:opacity-100 ">
        <LinkWithBtnStyle
          size="small"
          variant="ghostAccent"
          href={createLink}
          className="md:h-1/4"
          hideText
          icon={<IoAdd size={24} />}
        >
          Add Item
        </LinkWithBtnStyle>
        <LinkWithBtnStyle
          size="small"
          variant="tertiary"
          href={href}
          className="md:h-3/4"
          hideText
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
