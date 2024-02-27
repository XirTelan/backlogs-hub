import BacklogHandler from "@/containers/Backlogs/BacklogHandler";
import React from "react";

export default async function Backlog({
  params: { userName, backlog },
  searchParams,
}: {
  params: { userName: string; backlog: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let query = "";
  if (Object.keys(searchParams).length != 0) {
    query += "?";
    for (const [key, value] of Object.entries(searchParams)) {
      query += `${key}=${value}&`;
    }
    query = query.slice(0, -1);
  }

  return (
    <>
      <main className="container w-full ">
        <BacklogHandler search={query} userName={userName} backlog={backlog} />
      </main>
    </>
  );
}
