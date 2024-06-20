import React from "react";

const SkeletonTitle = () => {
  return (
    <div className={` my-2 flex w-full items-center`}>
      <div>
        <div className="h-9 w-40 animate-pulse bg-layer-1" />
        <div className="mt-2 h-4 w-80 animate-pulse bg-layer-1" />
      </div>
      <div className="ms-auto h-12 w-40 animate-pulse bg-layer-1" />
    </div>
  );
};

export default SkeletonTitle;
