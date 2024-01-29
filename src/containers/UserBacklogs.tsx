import NavItem from "@/components/NavItem";
import { getBacklogsByUserId } from "@/services/backlogs";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const { userId }: { userId: string | null } = auth();
  const data = await getBacklogsByUserId(userId).then((data) => data.json());
  console.log("getBackloglist", data);

  const backlogList = () => {
    return data.map((backlog) => (
      <NavItem
        key={backlog.backlogTitle}
        href={`/user/${userName}/backlogs/${backlog.backlogTitle}`}
        label={backlog.backlogTitle}
      />
    ));
  };

  return (
    <div>
      {data?.length > 0 && backlogList()}
      <Link href={"/create/backlog"}>Create</Link>
    </div>
  );
};

export default UserBacklogs;
