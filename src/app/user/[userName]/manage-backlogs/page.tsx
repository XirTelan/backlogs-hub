import NavItem from "@/components/NavItem";
import { getBacklogsTitleByUserName } from "@/services/backlogs";
import { PageDefaultProps } from "@/types";``
import React from "react";

const ManageBacklogs = async ({ params: { userName } }: PageDefaultProps) => {
  const data = await getBacklogsTitleByUserName(userName);

  return (
    <div>
      {data.map((backlog) => (
        <li draggable key={backlog.backlogTitle}>
          <NavItem
            href={`/user/${userName}/backlogs/${backlog.backlogTitle}`}
            label={backlog.backlogTitle}
          />
        </li>
      ))}
    </div>
  );
};

export default ManageBacklogs;
