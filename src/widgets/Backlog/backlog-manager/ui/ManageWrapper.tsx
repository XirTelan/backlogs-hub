"use client";
import React, { useState } from "react";
import { Title } from "@/shared/ui";
import BacklogDnDMultList from "./BacklogManageDnD";
import { Switcher } from "@/shared/ui";
import { GrTree } from "react-icons/gr";
import { FaList } from "react-icons/fa";

import useSWR from "swr";
import { apiRoutesList } from "@/shared/constants/routesList";
import { LoadingAnimation } from "@/shared/ui";
import { fetcher } from "@/shared/lib/utils";

export const ManageWrapper = () => {
  const [isFullView, setIsFullView] = useState<boolean>(true);

  const { data: items, isLoading } = useSWR(
    `${apiRoutesList.backlogs}?type=byFolder`,
    fetcher
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
          <BacklogDnDMultList
            view={isFullView ? "full" : "compact"}
            data={items.backlog}
          />
        )
      )}
    </>
  );
};
