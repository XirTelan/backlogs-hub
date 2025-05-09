import React from "react";
import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { routesList } from "@/shared/constants/routesList";
import { Divider, LinkBase } from "@/shared/ui";

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
            <Divider layer={2} />
            <LinkBase href={`${routesList.backlogEdit}/${backlogId}`}>
              Edit backlog
            </LinkBase>
            <Divider layer={2} />
          </>
        )}
        <LinkBase href={href}>View</LinkBase>
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
