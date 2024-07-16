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
    <div className=" grid   md:grid-cols-[auto_1fr]">
      <aside className=" border-border-1 hidden h-full w-64 border-e pt-4 md:block">
        <UserBacklogsSideNav userName={userName} />
      </aside>
      <>{children}</>
    </div>
  );
}
