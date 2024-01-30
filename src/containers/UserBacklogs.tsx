import NavItem from "@/components/NavItem";
import {
  getBacklogsByUserId,
  getBacklogsTitleByUserName,
} from "@/services/backlogs";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsTitleByUserName(userName).then((data) =>
    data.json(),
  );
  console.log("getBackloglist", data);

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
    <div className=" flex w-full justify-between">
      <ul className="flex">{data?.length > 0 && backlogList()}</ul>
      <Link href={"/create/backlog"}>Create</Link>
    </div>
  );
};

export default UserBacklogs;
