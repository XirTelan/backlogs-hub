import { Session } from "@/providers/sessionProvider";
import { getCurrentUserData } from "@/services/user";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BacklogsHub | My Backlogs",
};

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  const user = await getCurrentUserData("config");
  return (
    <>
      <Session
        userData={{
          user: user.data ?? null,
        }}
      >
        {children}
      </Session>
    </>
  );
}
