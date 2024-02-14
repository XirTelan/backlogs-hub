import BacklogHandler from "@/containers/Backlogs/BacklogHandler";
import Feed from "@/containers/Feed";
import UserBacklogs from "@/containers/User/UserBacklogs";
import { PageDefaultProps } from "@/types";
import React from "react";

export default async function Backlog({ params }: PageDefaultProps) {
  const isActiveBacklog = params.backlog;

  return (
    <>
      <div className="container flex w-full  flex-col items-center">
        <UserBacklogs userName={params.userName} />
      </div>
      <main className="container w-full ">
        {isActiveBacklog ? <BacklogHandler /> : <Feed />}
      </main>
    </>
  );
}
