"use client";
import React, { useCallback, useState } from "react";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogDTO, DndData } from "@/zodTypes";
import DnDList from "./DnDList";
import DnDMultList from "./DnDMultList";
import InputField from "@/components/Common/UI/InputField";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const ManageWrapper = ({
  items,
  userName,
}: {
  items: DndData;
  userName: string;
}) => {
  const [isFolderMode, setIsFolderMode] = useState<boolean>(false);
  const [newFolder, setNewFolder] = useState("");
  const handleBacklogsSave = useCallback(
    async (data: { [key: string]: BacklogDTO[] }) => {
      const dataFormatted: BacklogDTO[] = [];
      Object.entries(data).forEach(([folder, backlogs]) => {
        if (backlogs.length === 0) return;
        backlogs.forEach((backlog, indx) => {
          backlog.folder = folder;
          backlog.order = indx;
          dataFormatted.push(backlog);
        });
      });
      try {
        const res = await fetch(`/api/backlogs/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFormatted),
        });
        if (res.ok) {
          toast.success("Saved");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  return (
    <>
      <section>
        <Title
          title={"Backlogs order"}
          variant={2}
          description="You can change the order of backlogs by moving them within their folder or moving them to another using a handler."
        >
          <div className="flex">
            <ButtonBase
              text="Save changes"
              onClick={(e) => {
                e.preventDefault();
                console.log("?");
                handleBacklogsSave(items);
              }}
            />
          </div>
        </Title>
        <ButtonBase variant="ghost" text="Test" size="small" />
        <div className="flex items-center">
          <InputField
            variant="small"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <div className="flex">
            <ButtonBase
              variant="ghost"
              onClick={() => {
                setItems((prev) => {
                  return { ...prev, [newFolder]: [] };
                });
              }}
              size="small"
            >
              <MdCheck size={24} />
            </ButtonBase>
            <ButtonBase variant="dangerGhost" size="small">
              <MdClose size={24} />
            </ButtonBase>
          </div>
        </div>
      </section>
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
        <DnDMultList data={items} setF={setIsFolderMode} />
      )}
    </>
  );
};

export default ManageWrapper;
