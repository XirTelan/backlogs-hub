import UserBacklogsSideNav from "@/containers/User/UserBacklogsSideNav";
import React from "react";

export default async function Layout({
  children,
  params: { userName },
}: {
  children: React.ReactElement;
  params: { userName: string; backlog: string };
}) {
  return (
    <div className=" grid   grid-cols-[auto_1fr]">
      <aside className=" hidden h-full w-64 pt-4 md:block ">
        <UserBacklogsSideNav userName={userName} />
      </aside>
      <>{children}</>
    </div>
  );
}
