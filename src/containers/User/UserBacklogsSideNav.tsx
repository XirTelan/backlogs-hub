import PanelItemsWrapper from "@/components/Common/UI/PanelItemsWrapper";
import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";
import { FaFolder } from "react-icons/fa6";

const UserBacklogsSideNav = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsByFolder(userName);

  return (
    <nav>
      {Object.entries(data).map(([folder, backlogs]) => {
        if (backlogs.length == 0) return;
        return (
          <div key={folder}>
            <div className="flex items-center">
              <FaFolder className="ms-2" size={12} />
              <div className="ps-2 text-secondary-text">{folder}</div>
            </div>
            <div className="ps-2">
              <PanelItemsWrapper
                baseUrl={`/user/${userName}/backlogs`}
                data={backlogs.map((item) => {
                  return { id: item.slug, content: item.backlogTitle };
                })}
              />
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default UserBacklogsSideNav;
