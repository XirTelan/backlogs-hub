import NavItem from "@/components/NavItem";
import { getBacklogsTitleByUserName } from "@/services/backlogs";
import Link from "next/link";
import React from "react";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsTitleByUserName(userName);

  const backlogList = () => {
    return data.map((backlog) => (
      <li key={backlog.backlogTitle}>
        <NavItem
          href={`/user/${userName}/backlogs/${backlog.backlogTitle}`}
          label={backlog.backlogTitle}
        />
      </li>
    ));
  };

  return (
    <div className=" mb-4 mt-2 flex w-full justify-between rounded border border-neutral-800 bg-neutral-900 p-4">
      <ul className="flex">{data?.length > 0 && backlogList()}</ul>
      <Link href={"/backlog/create"}>Create</Link>
    </div>
  );
};

export default UserBacklogs;
