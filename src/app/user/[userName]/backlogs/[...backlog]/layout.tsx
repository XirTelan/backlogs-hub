import UserBacklogs from "@/containers/User/UserBacklogs";
import React from "react";

// export const metadata: Metadata = {
//   title: "BacklogsHub",
//   description: "All backlogs in one place",
// };

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { userName: string; backlog: string[] };
}) {
  return (
    <div className="grid w-full md:grid-cols-[16rem_calc(100%-16rem)] ">
      <aside className=" hidden h-full w-64 pt-4 md:block ">
        <nav>
          <UserBacklogs
            activeBacklog={params.backlog[0]}
            userName={params.userName}
          />
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
