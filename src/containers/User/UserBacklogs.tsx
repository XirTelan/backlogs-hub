import NavItem from "@/components/NavItem";
import { getBacklogsTitleByUserName } from "@/services/backlogs";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoMdOptions } from "react-icons/io";
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
    <div className=" mb-4 mt-2 flex w-full items-center justify-between rounded border border-neutral-800 bg-neutral-900 p-4">
      <ul className="flex">{data?.length > 0 && backlogList()}</ul>
      <div className="flex">
        <Link
          title="Create backlog"
          className=" rounded-bl-xl rounded-tl-xl border border-neutral-700 bg-neutral-800  p-2 hover:bg-green-500  "
          href={"/backlog/create"}
        >
          <RiPlayListAddLine />
        </Link>
        <Link
          title="Manage backlogs"
          className=" rounded-br-xl rounded-tr-xl border border-neutral-700 bg-neutral-800 p-2 hover:bg-neutral-500 "
          href={`/user/${userName}/manage-backlogs`}
        >
          <IoMdOptions />
        </Link>
      </div>
    </div>
  );
};

export default UserBacklogs;
