import NavLink from "@/components/NavLink";
import { getBacklogsBaseInfoByUserName } from "@/services/backlogs";
import Link from "next/link";
import React from "react";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { FaPlus } from "react-icons/fa";
import Title from "@/components/Common/Title";

const UserBacklogs = async ({ userName }: { userName: string }) => {
  const data = await getBacklogsBaseInfoByUserName(userName);
  const backlogList = () => {
    return (
      <div className=" mb-4 flex w-full items-center justify-between rounded  p-4">
        <ul className="flex flex-col flex-wrap md:flex-row">
          {data.map((backlog) => {
            return (
              <NavLink
                key={backlog._id}
                href={`/user/${userName}/backlogs/${backlog.slug}`}
                label={backlog.backlogTitle}
              />
            );
          })}
        </ul>

      </div>
    );
  };

  return (
    <>
      {data?.length > 0 ? (
        backlogList()
      ) : (
        <>
          <Title title={"Backlogs"}>
            <Link href={"/backlog/create"}>
              <ButtonBase text="Create Backlog">
                <FaPlus />
              </ButtonBase>
            </Link>
          </Title>
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
      )}
    </>
  );
};

export default UserBacklogs;
