import Title from "@/components/Common/Title";
import Feed from "@/containers/Feed";
import UserBacklogs from "@/containers/User/UserBacklogs";
import Link from "next/link";
import React from "react";
import { IoMdOptions } from "react-icons/io";
import { RiPlayListAddLine } from "react-icons/ri";

export default async function Backlogs({
  params,
}: {
  params: { userName: string };
}) {
  return (
    <>
      <main className="container flex w-full  flex-col items-center">
        <Title title={"My backlogs"}>
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
              href={`/user/${params.userName}/manage-backlogs`}
            >
              <IoMdOptions />
            </Link>
          </div>
        </Title>
        <UserBacklogs type="card" userName={params.userName} />

        <Feed />
      </main>
    </>
  );
}
