import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import SkeletonTitle from "@/components/Common/Skeleton/SkeletonTitle";
import React from "react";

const loading = () => {
  return (
    <div className="container mt-10 flex w-full flex-col items-center justify-center px-4">
      <SkeletonTitle />
      <div className="my-8 flex gap-2 self-start">
        <div className="h-9 w-40 animate-pulse bg-layer-1" />
        <div className="h-9 w-40 animate-pulse bg-layer-1" />
        <div className="h-9 w-40 animate-pulse bg-layer-1" />
      </div>
      <SkeletonDataTable />
    </div>
  );
};

export default loading;
