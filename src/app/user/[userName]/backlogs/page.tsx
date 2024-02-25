import Feed from "@/containers/Feed";
import UserBacklogs from "@/containers/User/UserBacklogs";
import React from "react";

export default async function Backlogs({
  params,
}: {
  params: { userName: string };
}) {
  return (
    <>
      <div className="container flex w-full  flex-col items-center">
        <UserBacklogs userName={params.userName} />
        <Feed />
      </div>
    </>
  );
}
