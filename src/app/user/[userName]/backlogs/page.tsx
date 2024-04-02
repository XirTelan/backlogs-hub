import Title from "@/components/Common/Title";
import LinkButton from "@/components/Common/UI/LinkButton";
import Feed from "@/containers/Feed";
import UserBacklogs from "@/containers/User/UserBacklogs";
import React from "react";
import { MdOutlineManageSearch } from "react-icons/md";

import { IoAdd } from "react-icons/io5";
import { getCurrentUserInfo } from "@/auth/utils";
import { redirect } from "next/navigation";

export default async function Backlogs({
  params,
}: {
  params: { userName: string };
}) {
  const user = await getCurrentUserInfo();
  if (!user || user.username != params.userName) return redirect("/");

  return (
    <>
      <main className="container flex w-full  flex-col items-center">
        <Title title={"My backlogs"}>
          <div className="flex">
            <LinkButton
              href={`/manage-backlogs`}
              text="Manage backlogs"
              button={{ variant: "ghost" }}
            >
              <MdOutlineManageSearch size={24} />
            </LinkButton>
            <LinkButton href={`/backlog/create`} text="Create new backlog">
              <IoAdd />
            </LinkButton>
          </div>
        </Title>
        <UserBacklogs userName={params.userName} />

        <Feed />
      </main>
    </>
  );
}
