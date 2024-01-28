import NavItem from "@/components/NavItem";
import { getBacklogsByUserId } from "@/services/backlogs";
import { auth } from "@clerk/nextjs";
import React from "react";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const { userId }: { userId: string | null } = auth();
  const data = await getBacklogsByUserId(userId);
  console.log("getBackloglist", data);

  const backlogList = () => {
    return data.map((backlog) => (
      <NavItem
        key={backlog.title}
        href={`/user/${userName}/backlogs/${backlog.title}`}
        label={backlog.title}
      />
    ));
  };

  return (
    <div> {data?.length > 0 ? backlogList() : <button>Create</button>}</div>
  );
};

export default UserBacklogs;
