import { getBacklogsBaseInfoByUserName } from "@/services/backlogs";
import React from "react";
import BacklogCard from "@/components/Backlog/BacklogCard";
import PanelItem from "@/components/Common/UI/PanelItem";

const UserBacklogs = async ({
  userName,
  activeBacklog = "",
  type = "link",
}: {
  activeBacklog?: string;
  userName: string;
  type?: "link" | "card";
}) => {
  const data = await getBacklogsBaseInfoByUserName(userName);
  const backlogs = data.map((backlog) => (
    <PanelItem
      key={backlog._id}
      href={`/user/${userName}/backlogs/`}
      backlogSlug={backlog.slug}
      activeBacklog={activeBacklog}
    >
      {backlog.backlogTitle}
    </PanelItem>
  ));

  const backlogList = (
    <div className="  flex w-full items-center justify-between rounded ">
      {type === "link" ? (
        <ul className="flex w-full flex-col flex-wrap">{backlogs}</ul>
      ) : (
        <BacklogCard />
      )}
    </div>
  );

  const listIsEmpty = (
    <>
      <div className="flex h-80 w-full flex-col justify-center     bg-layer-1 p-4">
        <p className="mb-4 text-xl">
          You don&apos;t have any backlogs here yet
        </p>
        <p className=" text-secondary-text">
          No backlogs? No problem! <br />
          Choose to create your own or pick from ready-made templates.
          <br />
          Click Create backlog to get started
        </p>
      </div>
    </>
  );

  return <>{data?.length > 0 ? backlogList : listIsEmpty}</>;
};

export default UserBacklogs;
