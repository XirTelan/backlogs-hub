import React from "react";
import { getCurrentUserInfo } from "@/auth/utils";
import LinkBase from "../Common/UI/LinkBase";
import { routesList } from "@/lib/routesList";

const BacklogCard = async ({ children, href, backlogId }: BacklogCardProps) => {
  const user = await getCurrentUserInfo();

  return (
    <div className="group relative flex h-52 w-40 p-4 flex-shrink-0 flex-col  bg-layer-2 border border-border-tile-2  ">
      <>{children}</>

      <div className="mt-auto w-full flex  flex-col flex-wrap ">
        {user?.username && (
          <>
            <LinkBase href={`${routesList.itemsCreate}/?backlog=${backlogId}`}>
              Add item
            </LinkBase>
            <LinkBase href={`${routesList.backlogEdit}/${backlogId}`}>
              Edit backlog
            </LinkBase>
            <LinkBase href={href}>View</LinkBase>
          </>
        )}
      </div>
    </div>
  );
};

export default BacklogCard;

type BacklogCardProps = {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  backlogId: string;
};
