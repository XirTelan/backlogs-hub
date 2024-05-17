import router from "next/router";
import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import ButtonBase from "./Common/UI/ButtonBase";

const FolderItem = ({
  folder,
  isEdit,
}: {
  folder: { folderName: string; count: number };
  isEdit: boolean;
}) => {
  const { folderName, count } = folder;
  return (
    <div className=" flex h-12 w-full items-center  border border-neutral-700 bg-neutral-800  p-2">
      <div className="col-start-1 ">{folderName}</div>
      {isEdit && (
        <div className="me-auto ps-2 text-primary-link "> ({count})</div>
      )}
      <div className=" flex">
        {isEdit && (
          <>
            <ButtonBase
              onClick={() => router.push(`/backlog/edit/${backlog._id}`)}
              size="small"
              variant="ghost"
            >
              <MdEdit size={20} />
            </ButtonBase>
            <ButtonBase
              size="small"
              variant="dangerGhost"
              onClick={() => onDelete(backlog._id)}
              disabled={count != 0}
              title={
                count != 0
                  ? "The folder must not contain backlogs"
                  : " Delete folder"
              }
            >
              <MdDeleteForever size={20} />
            </ButtonBase>
          </>
        )}
      </div>
    </div>
  );
};

export default FolderItem;
