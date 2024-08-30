"use client";
import React, { useState } from "react";
import Title from "@/components/Common/Title";
import DnDMultList from "./DnDMultList";
import Switcher from "@/components/Common/UI/Switcher";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { GrTree } from "react-icons/gr";
import { FaList } from "react-icons/fa";

import useSWR from "swr";
import { apiRoutesList } from "@/lib/routesList";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { fetcher } from "@/utils";

const ManageWrapper = () => {
  const [isFullView, setIsFullView] = useState<boolean>(true);

  const { data: items, isLoading } = useSWR(
    `${apiRoutesList.backlogs}?type=byFolder`,
    fetcher,
  );

  return (
    <>
      <Title
        title={"Backlogs order"}
        variant={2}
        description="You can change the order of backlogs by moving them within their folder or moving them to another using a handler."
      >
        <div className="flex">
          <Switcher
            options={{
              key: "view",
              callback: (value) => {
                setIsFullView(value === "full");
              },
              items: [
                {
                  title: <GrTree />,

                  value: "full",
                },
                {
                  title: <FaList />,
                  value: "compact",
                },
              ],
            }}
          />
        </div>
      </Title>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        items?.backlog && (
          <DnDMultList
            modifiers={[restrictToVerticalAxis]}
            view={isFullView ? "full" : "compact"}
            data={items.backlog}
          />
        )
      )}
    </>
  );
};

export default ManageWrapper;
