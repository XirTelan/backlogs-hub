import BacklogHandler from "@/containers/Backlogs/BacklogHandler";
import React from "react";

export default async function Backlog({
  params: { userName, backlog },
}: {
  params: { userName: string; backlog: string };
}) {
  return (
    <>
      <main className="container w-full ">
        <BacklogHandler userName={userName} backlog={backlog} />
      </main>
    </>
  );
}
