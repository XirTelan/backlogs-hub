import { getCurrentUserInfo } from "@/auth/utils";
import { Session } from "@/providers/sessionProvider";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  const user = await getCurrentUserInfo();
  if (!user) redirect("/");

  return <Session userData={{ user: user }}>{children}</Session>;
}
