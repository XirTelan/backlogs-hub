"use client";
import React, { useState } from "react";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { DndData } from "@/zodTypes";
import DnDList from "./DnDList";
import DnDMultList from "./DnDMultList";

const ManageWrapper = ({
  items,
  userName,
}: {
  items: DndData;
  userName: string;
}) => {
  const [isFolderMode, setIsFolderMode] = useState<boolean>(false);

  return (
    <>
      <Title title={"Manage"} variant={1}>
        <div className="flex">
          <ButtonBase
            variant="tertiary"
            text={isFolderMode ? "Manage backlogs" : "Manage Folders"}
            onClick={() => setIsFolderMode((prev) => !prev)}
          />
        </div>
      </Title>
      {isFolderMode ? (
        <DnDList
          userName={userName}
          data={Object.keys(items).map((folder) => {
            return {
              folderName: folder,
              count: items[folder].length || 0,
            };
          })}
        />
      ) : (
        <DnDMultList data={items} />
      )}
    </>
  );
};

export default ManageWrapper;
