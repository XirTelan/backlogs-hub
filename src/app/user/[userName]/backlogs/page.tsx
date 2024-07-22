import LinkButton from "@/components/Common/UI/LinkButton";
import UserBacklogs from "@/containers/User/UserBacklogs";
import React from "react";
import { MdOutlineManageSearch } from "react-icons/md";

import { IoAdd } from "react-icons/io5";
import { getCurrentUserInfo } from "@/auth/utils";
import { getUserData } from "@/services/user";
import TopTitle from "@/components/Common/UI/TopTitle";

export default async function Backlogs({
  params,
}: {
  params: { userName: string };
}) {
  const user = await getCurrentUserInfo();
  const { data } = await getUserData(params.userName, "config");
  const isOwner = user ? user.username === params.userName : false;
  if (!isOwner && data?.config?.profileVisibility !== "public") {
    return <div>Access denied?</div>;
  }

  return (
    <>
      {isOwner ? (
        <TopTitle title={"My backlogs"}>
          <div className="flex">
            <LinkButton
              href={`/manage-backlogs`}
              text={"Manage backlogs"}
              button={{ variant: "ghost", hideText: true }}
            >
              <MdOutlineManageSearch size={24} />
            </LinkButton>
            <LinkButton
              href={`/backlog/create`}
              text={"Create backlog"}
              button={{ hideText: true }}
            >
              <IoAdd />
            </LinkButton>
          </div>
        </TopTitle>
      ) : (
        <TopTitle title={`${params.userName} backlogs`} />
      )}

      <main className="container flex  w-full flex-col  self-center">
        <div className="w-full px-4">
          <UserBacklogs user={{ name: params.userName, isOwner }} />
        </div>
      </main>
    </>
  );
}
