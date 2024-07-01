import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";
import BacklogFolder from "../Backlogs/BacklogFolder";
import { BacklogDTO } from "@/zodTypes";
import { getConfigOptions } from "@/services/user";
import { FaRegFolderOpen } from "react-icons/fa6";

const listIsEmpty = (
  <>
    <div className="flex h-80 w-full flex-col justify-center     bg-layer-1 p-4">
      <FaRegFolderOpen className=" my-4 text-secondary-text" size={80} />
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
  const isListEmpty = data.every(([, backlogs]) => backlogs.length === 0);
  const config = await getConfigOptions();
  return (
    <>
      {isListEmpty ? (
        listIsEmpty
      ) : (
        <div className="  flex w-full items-center justify-between rounded ">
          <div className="flex grow flex-col flex-wrap">
            {data.map(([folderName, backlogs]) => {
              if (
                config.isSuccess &&
                !config.data.showEmptyFolders &&
                backlogs.length === 0
              )
                return;
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
      )}
    </>
  );
};

export default UserBacklogs;
