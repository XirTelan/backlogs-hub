"use client";
import Backloglist from "@/containers/BacklogList";
import Feed from "@/containers/Feed";
import GameBacklog from "@/containers/GameBacklog";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { backlogs } from "../../../../../../../mock/data";

export default function Lists() {
  const [activeBacklog, setActiveBacklog] = useState<string | null>();
  const params = useParams();
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
    <div>
      {JSON.stringify(params)}
      <div className=" flex justify-between w-full">
        <div className="flex gap-1">
          {backlogs.map((backlog) => (
            <button
              key={backlog.title}
              onClick={() => setActiveBacklog(backlog.title)}
            >
              {backlog.title}
            </button>
          ))}
        </div>
        <button>Create Backlog</button>
      </div>
      {activeBacklog ? renderBacklog(activeBacklog) : <Feed />}
    </div>
  );
}
