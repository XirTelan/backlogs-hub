import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";
import BacklogFolder from "../Backlogs/BacklogFolder";
import { BacklogDTO } from "@/zodTypes";
import { getConfigOptions } from "@/services/user";

const listIsEmpty = (
  <>
    <div className="flex h-80 w-full flex-col justify-center     bg-layer-1 p-4">
      <p className="mb-4 text-xl">You don&apos;t have any backlogs here yet</p>
      <p className=" text-secondary-text">
        No backlogs? No problem! <br />
        Choose to create your own or pick from ready-made templates.
        <br />
        Click Create backlog to get started
      </p>
    </div>
  </>
);

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const data: [string, BacklogDTO[]][] = Object.entries(
    await getBacklogsByFolder(userName),
  );
  const { data: config } = await getConfigOptions();

  return (
    <>
      {data?.length > 0 ? (
        <div className="  flex w-full items-center justify-between rounded ">
          <div className="flex flex-col flex-wrap gap-4">
            {data.map(([folderName, backlogs]) => {
              if (!config?.showEmptyFolders && backlogs.length === 0) return;
              return (
                <BacklogFolder
                  key={folderName}
                  userName={userName}
                  folderName={folderName}
                  backlogs={backlogs}
                />
              );
            })}
          </div>
        </div>
      ) : (
        listIsEmpty
      )}
    </>
  );
};

export default UserBacklogs;
