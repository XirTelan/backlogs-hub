import { UserDTO } from "@/zodTypes";
import React from "react";

const UserProfile = ({ data }: { data: UserDTO }) => {
  return (
    <div className="ml-10 mt-10 ">
      <div className=" bg-layer-1 p-4">
        <p className=" text-3xl ">{data.displayName}</p>
        <p className=" text-sm text-secondary-text">{`/${data.username}`}</p>
      </div>
      <div className="mt-4 bg-layer-1">{data.folders.length}</div>
    </div>
  );
};

export default UserProfile;
