import PanelItem from "@/components/Common/UI/PanelItem";
import { getBacklogsBaseInfoByUserName } from "@/services/backlogs";
import React from "react";

const UserBacklogsSideNav = async ({
  userName,
  activeBacklog = "",
}: {
  activeBacklog?: string;
  userName: string;
}) => {
  const data = await getBacklogsBaseInfoByUserName(userName);
  return (
    <nav>
      {data.map((backlog) => (
        <PanelItem
          key={backlog._id}
          href={`/user/${userName}/backlogs/`}
          backlogSlug={backlog.slug}
          activeBacklog={activeBacklog}
        >
          {backlog.backlogTitle}
        </PanelItem>
      ))}
    </nav>
  );
};

export default UserBacklogsSideNav;
