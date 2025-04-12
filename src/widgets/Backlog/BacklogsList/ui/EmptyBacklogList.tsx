import React from "react";
import { FaRegFolderOpen } from "react-icons/fa6";

export const EmptyBacklogList = async ({ isOwner }: { isOwner: boolean }) => {
  return (
    <>
      <div className="flex h-80 w-full flex-col justify-center     bg-layer-1 px-8 py-4">
        <FaRegFolderOpen className=" my-4 text-text-secondary" size={80} />
        <p className="mb-4 text-xl">There are no backlogs here yet</p>
        {isOwner && (
          <p className=" text-text-secondary">
            No backlogs? No problem! <br />
            Choose to create your own or pick from ready-made templates.
            <br />
            Click Create backlog to get started
          </p>
        )}
      </div>
    </>
  );
};

