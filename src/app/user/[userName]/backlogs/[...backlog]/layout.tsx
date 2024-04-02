import { getCurrentUserInfo } from "@/auth/utils";
import UserBacklogsSideNav from "@/containers/User/UserBacklogsSideNav";
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
  const user = await getCurrentUserInfo();
  const isOwner = user?.username == params.userName;
  return (
    <div
      className={`grid w-full  ${isOwner ? "md:grid-cols-[16rem_calc(100%-16rem)]" : ""} `}
    >
      {user && (
        <aside className=" hidden h-full w-64 pt-4 md:block ">
          <UserBacklogsSideNav
            activeBacklog={params.backlog[0]}
            userName={params.userName}
          />
        </aside>
      )}
      <main>{children}</main>
    </div>
  );
}
