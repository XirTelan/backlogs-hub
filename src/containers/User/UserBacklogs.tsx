import NavItem from "@/components/NavItem";
import { getBacklogsBaseInfoByUserName } from "@/services/backlogs";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoMdOptions } from "react-icons/io";
import Link from "next/link";
import React from "react";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsBaseInfoByUserName(userName);
  const backlogList = () => {
    return (
      <div className=" mb-4 flex w-full items-center justify-between rounded  p-4">
        <ul className="flex flex-col flex-wrap md:flex-row">
          {data.map((backlog) => {
            return (
              <li key={backlog._id}>
                <NavItem
                  href={`/user/${userName}/backlogs/${backlog.slug}`}
                  label={backlog.backlogTitle}
                />
              </li>
            );
          })}
        </ul>
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

  return data?.length > 0 ? (
    backlogList()
  ) : (
    <div className="flex flex-col justify-center rounded  border border-neutral-800 bg-neutral-900 p-4">
      <p className="p-2">
        No backlogs? No problem! <br />
        Choose to create your own or pick from ready-made templates.
        <br />
        Click below to get started
      </p>

      <Link
        title="Create backlog"
        className="mt-2  rounded border border-neutral-700 bg-neutral-800 p-2 text-center  hover:bg-green-500  "
        href={"/backlog/create"}
      >
        <div className="flex items-center justify-center">
          <RiPlayListAddLine />
          <p className="ms-2">Create backlog</p>
        </div>
      </Link>
    </div>
  );
};

export default UserBacklogs;
