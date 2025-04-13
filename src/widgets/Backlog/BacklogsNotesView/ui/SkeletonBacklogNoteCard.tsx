import { Divider } from "@/shared/ui";
import React from "react";

const SkeletonBacklogNoteCard = () => {
  return (
    <div className="bg-layer-1 w-60 p-4">
      <div className="flex justify-between">
        <div className="h-10 w-30 animate-pulse bg-layer-2"></div>
        <div className="h-10 w-10 animate-pulse bg-layer-2"></div>
      </div>
      <Divider />
      <div className="h-20 w-full animate-pulse bg-layer-2"></div>
    </div>
  );
};

export default SkeletonBacklogNoteCard;
