"use client";
import Backloglist from "@/containers/BacklogList";
import Feed from "@/containers/Feed";
import GameBacklog from "@/containers/GameBacklog";
import { useParams } from "next/navigation";
import React from "react";
import { backlogs } from "../../../../../../mock/data";
import NavItem from "@/components/NavItem";

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
      <div className="flex w-full max-w-5xl flex-col p-4">
        <div className=" flex w-full justify-between">
          <div className="flex">
            {backlogs.map((backlog) => (
              <NavItem
                key={backlog.title}
                href={`/user/${params.userName}/backlogs/${backlog.title}`}
                label={backlog.title}
              />
            ))}
          </div>
          <button>Create Backlog</button>
        </div>
        {isActiveBacklog ? renderBacklog(params.list[0]) : <Feed />}
      </div>
    </main>
  );
}
