import { getCurrentUserInfo } from "@/auth/utils";
import BacklogHandler from "@/containers/Backlogs/BacklogHandler";
import UserBacklogsSideNav from "@/containers/User/UserBacklogsSideNav";
import { getUserBacklogBySlug } from "@/services/backlogs";
import { redirect } from "next/navigation";
import React from "react";

export default async function Backlog({
  params: { userName, backlog },
  searchParams,
}: {
  params: { userName: string; backlog: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUserInfo();
  const data = await getUserBacklogBySlug(userName, backlog);
  if (!data) return <div>Try again later</div>;
  const isOwner = user?.username == userName;
  if (data.visibility !== "public" && !isOwner) redirect("/");

  let query = "";
  if (Object.keys(searchParams).length != 0) {
    query += "?";
    for (const [key, value] of Object.entries(searchParams)) {
      query += `${key}=${value}&`;
    }
    query = query.slice(0, -1);
  }

  return (
    <div
      className={`grid w-full  ${isOwner ? "md:grid-cols-[16rem_calc(100%-16rem)]" : ""} `}
    >
      {user && (
        <aside className=" hidden h-full w-64 pt-4 md:block ">
          <UserBacklogsSideNav activeBacklog={backlog[0]} userName={userName} />
        </aside>
      )}
      <main className="container px-4">
        {<BacklogHandler search={query} data={data} />}
      </main>
    </div>
  );
}
