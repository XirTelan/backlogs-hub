import BacklogHandler from "@/containers/Backlogs/BacklogHandler";
import Backloglist from "@/containers/Backlogs/BacklogList";
import Feed from "@/containers/Feed";
import GameBacklog from "@/containers/GameBacklog";
import { getBacklogsByUserId } from "@/services/backlogs";
import React from "react";

export default async function Lists({
  params: { userName, list },
}: {
  params: {
    userName: string;
    list: string[];
  };
}) {
  const isActiveBacklog = list?.length > 0;

  return (
    <div className="flex w-full  flex-col items-center">
      <p>Page: backlogs/[[...list]] : {JSON.stringify(list)}</p>
      {isActiveBacklog ? <BacklogHandler /> : <Feed />}
    </div>
  );
}
