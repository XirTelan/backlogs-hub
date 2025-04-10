import Title from "@/components/Common/Title";
import { UserDB } from "@/zodTypes";
import React from "react";

const UserProfile = ({ data }: { data: UserDB }) => {
  return (
    <div className="ml-10 mt-10 ">
      <div className=" bg-layer-1 p-4">
        <p className=" text-3xl ">{data.displayName}</p>
        <p className=" text-sm text-text-secondary">{`/${data.username}`}</p>
      </div>
      <div className=" grid grid-cols-[80%_20%]   ">
        <div></div>
        <div className=" mt-4 bg-layer-1 p-4">
          <Title variant={3} title={"Statistic"} />
          <div className=" flex flex-col gap-4">
            <div className="">{data.folders.length}</div>
            <div className="">{data.stats.totalBacklogs}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
