import AsideNavWithBacklogs from "@/widgets/AsideNavWithBacklogs/AsideNavWithBacklogs";
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
      <AsideNavWithBacklogs userName={userName} />
      <>{children}</>
    </div>
  );
}
