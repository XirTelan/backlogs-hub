import UserBacklogsSideNav from "@/containers/User/UserBacklogsSideNav";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: Promise<{ userName: string; backlog: string }>;
}) {
  const { userName } = await params;

  return (
    <div className=" grid   md:grid-cols-[auto_1fr]">
      <UserBacklogsSideNav userName={userName} />
      <>{children}</>
    </div>
  );
}
