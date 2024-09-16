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
      <UserBacklogsSideNav userName={userName} />
      <>{children}</>
    </div>
  );
}
