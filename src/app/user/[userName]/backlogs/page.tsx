import Title from "@/components/Common/Title";
import LinkButton from "@/components/Common/UI/LinkButton";
import Feed from "@/containers/Feed";
import UserBacklogs from "@/containers/User/UserBacklogs";
import React from "react";
import { MdOutlineManageSearch } from "react-icons/md";

import { IoAdd } from "react-icons/io5";
import { getCurrentUserInfo } from "@/auth/utils";
import { getUserVisibility } from "@/services/user";

export default async function Backlogs({
  params,
}: {
  params: { userName: string };
}) {
  const user = await getCurrentUserInfo();
  const profileVisibility = await getUserVisibility(params.userName);
  const isOwner = user ? user.username === params.userName : false;
  if (!isOwner && profileVisibility !== "public") {
    return <div>Access denied?</div>;
  }

  return (
    <>
      <main className="container flex w-full  flex-col items-center">
        {isOwner ? (
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
        ) : (
          <Title title={`${params.userName} backlogs`} />
        )}
        <UserBacklogs userName={params.userName} />

        <Feed />
      </main>
    </>
  );
}
