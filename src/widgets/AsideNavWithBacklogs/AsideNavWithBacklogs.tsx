import PanelItemsWrapper from "@/widgets/AsideNavWithBacklogs/ui/PanelItemsWrapper";
import { getBacklogsByFolder } from "@/services/backlogs";
import React from "react";
import { FaFolder } from "react-icons/fa6";

const AsideNavWithBacklogs = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsByFolder(userName);
  const entries = Object.entries(data).sort((a, b) => a[1].order - b[1].order);
  if (entries.length === 0) return;

  return (
    <aside className="hidden h-full  min-h-screen-1 w-64 border-e border-border-subtle-1 pt-4 md:block">
      <nav className="fixed w-64 max-w-64 flex flex-col">
        {entries.map(([folder, backlogs]) => {
          if (backlogs.items.length === 0) return;
          return (
            <div key={folder}>
              <div className="flex items-center">
                <FaFolder className="ms-2" size={12} />
                <div className="ps-2 text-text-secondary">{folder}</div>
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

export default AsideNavWithBacklogs;
