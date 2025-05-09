import { LinkWithBtnStyle } from "@/shared/ui";
import BacklogsList from "@/widgets/backlog/BacklogsList/ui/BacklogsList";
import React from "react";
import { MdOutlineManageSearch } from "react-icons/md";

import { IoAdd } from "react-icons/io5";
import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { getUserData } from "@/shared/api/user";
import { TopTitle } from "@/shared/ui";

export default async function Backlogs(props: {
  params: Promise<{ userName: string }>;
}) {
  const params = await props.params;
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
            <LinkWithBtnStyle
              hideText
              title="Manage backlogs"
              href={`/manage-backlogs`}
              icon={<MdOutlineManageSearch size={24} />}
              variant="ghost"
            >
              Manage backlogs
            </LinkWithBtnStyle>
            <LinkWithBtnStyle
              hideText
              title="Create backlog"
              href={`/backlog/create`}
              icon={<IoAdd />}
            >
              Create backlog
            </LinkWithBtnStyle>
          </div>
        </TopTitle>
      ) : (
        <TopTitle title={`${params.userName} backlogs`} />
      )}

      <main
        id="maincontent"
        className="container flex  w-full flex-col  self-center"
      >
        <div className="w-full px-4">
          <BacklogsList user={{ name: params.userName, isOwner }} />
        </div>
      </main>
    </>
  );
}
