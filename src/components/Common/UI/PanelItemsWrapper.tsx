"use client";
import React from "react";
import PanelItem from "./PanelItem";
import { usePathname } from "next/navigation";
import { BacklogDTO } from "@/zodTypes";

const PanelItemsWrapper = ({
  userName,
  backlogs,
}: {
  userName: string;
  backlogs: BacklogDTO[];
}) => {
  const pathname = usePathname();
  const activeBacklog = pathname.split("/").at(-1);

  return (
    <>
      {backlogs.map((backlog) => (
        <PanelItem
          key={backlog._id}
          href={`/user/${userName}/backlogs/`}
          backlogSlug={backlog.slug}
          activeBacklog={activeBacklog === backlog.slug}
        >
          {backlog.backlogTitle}
        </PanelItem>
      ))}
    </>
  );
};

export default PanelItemsWrapper;
