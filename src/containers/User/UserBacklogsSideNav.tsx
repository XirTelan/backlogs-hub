import PanelItemsWrapper from "@/components/Common/UI/PanelItemsWrapper";
import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";
import { FaFolder } from "react-icons/fa6";

const UserBacklogsSideNav = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsByFolder(userName);
  const entries = Object.entries(data).sort((a, b) => a[1].order - b[1].order);
  if (entries.length === 0) return;

  return (
    <aside className=" hidden h-full min-h-screen-bh w-64 border-e border-border-1 pt-4 md:block">
      <nav>
        {entries.map(([folder, backlogs]) => {
          if (backlogs.items.length === 0) return;
          return (
            <div key={folder}>
              <div className="flex items-center">
                <FaFolder className="ms-2" size={12} />
                <div className="ps-2 text-secondary-text">{folder}</div>
              </div>
              <div className="ps-2">
                <PanelItemsWrapper
                  baseUrl={`/user/${userName}/backlogs`}
                  data={backlogs.items.map((item) => {
                    return { id: item.slug, content: item.backlogTitle };
                  })}
                />
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default UserBacklogsSideNav;
