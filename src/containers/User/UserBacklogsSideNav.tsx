import PanelItemsWrapper from "@/components/Common/UI/PanelItemsWrapper";
import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";

const UserBacklogsSideNav = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsByFolder(userName);
  return (
    <nav>
      {Object.entries(data).map(([folder, backlogs]) => {
        if (backlogs.length == 0) return;
        return (
          <div key={folder}>
            <div className="ps-2 text-secondary-text">{folder}</div>
            <div className="ps-2">
              <PanelItemsWrapper userName={userName} backlogs={backlogs} />
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default UserBacklogsSideNav;
