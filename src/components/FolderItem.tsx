import React from "react";

const FolderItem = ({
  folder,
}: {
  folder: { folderName: string; count: number };
}) => {
  const { folderName, count } = folder;
  return (
    <div className=" flex h-12 w-full items-center  border border-neutral-700 bg-neutral-800  p-2">
      {folderName}
    </div>
  );
};

export default FolderItem;
