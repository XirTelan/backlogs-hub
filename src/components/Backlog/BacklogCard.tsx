import React from "react";
import { FaArrowRight } from "react-icons/fa";
import LinkWithBtnStyle from "../Common/UI/LinkWithBtnStyle";
import { IoAdd } from "react-icons/io5";
import { getCurrentUserInfo } from "@/auth/utils";
import LinkBase from "../Common/UI/LinkBase";

const BacklogCard = async ({
  children,
  href,
  createLink,
}: BacklogCardProps) => {
  const user = await getCurrentUserInfo();

  return (
    <div className="group relative flex h-52 w-40 p-4 flex-shrink-0 flex-col  bg-layer-1  hover:bg-field-hover-1 ">
      <>{children}</>
      {user?.username && (
        <LinkBase href={createLink} icon={<IoAdd size={16} />}>
          Add item
        </LinkBase>
      )}
      <div className="mt-auto w-full flex  flex-col content-end flex-wrap ">
        <div>
          <LinkWithBtnStyle
            size="small"
            variant="ghost"
            href={href}
            hideText
            icon={<FaArrowRight />}
          ></LinkWithBtnStyle>
        </div>
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
