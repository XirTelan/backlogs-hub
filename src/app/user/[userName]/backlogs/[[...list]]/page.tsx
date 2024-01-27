"use client";
import Backloglist from "@/containers/BacklogList";
import Feed from "@/containers/Feed";
import GameBacklog from "@/containers/GameBacklog";
import { useParams } from "next/navigation";
import React from "react";

export default function Lists() {
  const params = useParams();
  const isActiveBacklog = params.list?.length > 0;

  const renderBacklog = (backlog: string) => {
    switch (backlog) {
      case "Games":
        return <GameBacklog />;
        break;
      default:
        return (
          <Backloglist addItem={() => console.log("add")} backlogId={backlog} />
        );
        break;
    }
  };
  return (
    <main className="flex w-full  flex-col items-center">
      {JSON.stringify(params)}
      {isActiveBacklog ? renderBacklog(params.list[0]) : <Feed />}
    </main>
  );
}
