import { getBacklogsByFolder } from "@/shared/api/backlogs";
import React from "react";
import BacklogFolder from "./BacklogFolder";
import { getConfigOptions } from "@/shared/api/user";
import dynamic from "next/dynamic";
import { BacklogDTO } from "@/shared/types";

const EmptyBacklogList = dynamic(() =>
  import("./EmptyBacklogList").then((mod) => mod.EmptyBacklogList)
);
const BacklogsList = async ({
  user,
}: {
  user: { name: string; isOwner: boolean };
}) => {
  const data: [string, { order: number; items: BacklogDTO[] }][] =
    Object.entries(await getBacklogsByFolder(user.name)).sort(
      (a, b) => a[1].order - b[1].order
    );
  const isHaveData = data.some(([, backlogs]) => backlogs.items.length !== 0);
  const config = await getConfigOptions();
  return (
    <>
      {isHaveData ? (
        <div className="  flex w-full items-center justify-between  ">
          <div className="flex grow flex-col flex-wrap">
            {data.map(([folderName, backlogs]) => {
              if (
                config.success &&
                !config.data.showEmptyFolders &&
                backlogs.items.length === 0
              )
                return;
              return (
                <BacklogFolder
                  key={folderName}
                  userName={user.name}
                  folderName={folderName}
                  backlogs={backlogs.items}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyBacklogList isOwner={user.isOwner} />
      )}
    </>
  );
};

export default BacklogsList;
