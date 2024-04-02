import { getBacklogsBaseInfoByUserName } from "@/services/backlogs";
import React from "react";
import BacklogCard from "@/components/Backlog/BacklogCard";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsBaseInfoByUserName(userName);
  const backlogItems = data.map((backlog) => (
    <BacklogCard
      href={`/user/${userName}/backlogs/${backlog.slug}`}
      key={backlog._id}
    >
      {backlog.backlogTitle}
    </BacklogCard>
  ));

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

  return (
    <>
      {data?.length > 0 ? (
        <div className="  flex w-full items-center justify-between rounded ">
          <div className="flex flex-wrap gap-4">{backlogItems}</div>
        </div>
      ) : (
        listIsEmpty
      )}
    </>
  );
};

export default UserBacklogs;
