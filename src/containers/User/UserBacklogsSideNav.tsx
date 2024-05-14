import PanelItem from "@/components/Common/UI/PanelItem";
import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";

const UserBacklogsSideNav = async ({
  userName,
  activeBacklog = "",
}: {
  activeBacklog?: string;
  userName: string;
}) => {
  const data = await getBacklogsByFolder(userName);
  return (
    <nav>
      {Object.entries(data).map(([folder, backlogs]) => {
        if (backlogs.length == 0) return;
        return (
          <div key={folder}>
            <div className="ps-2 text-secondary-text">{folder}</div>
            <div className="ps-2">
              {backlogs.map((backlog) => (
                <PanelItem
                  key={backlog._id}
                  href={`/user/${userName}/backlogs/`}
                  backlogSlug={backlog.slug}
                  activeBacklog={activeBacklog}
                >
                  {backlog.backlogTitle}
                </PanelItem>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default UserBacklogsSideNav;
