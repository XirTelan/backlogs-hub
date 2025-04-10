"use client";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { apiRoutesList } from "@/shared/lib/routesList";
import useSWR from "swr";
import { fetcher } from "@/utils";
import DnDMultList from "../../features/dragAndDrop/ui/DndMultiList";

import { useSaveBacklogsOrder } from "./hooks/useSaveBacklogsOrder";
import { ContainerTitle } from "./ui/ContainerTitle";
import { BacklogDndItem } from "./ui/BacklogDndItem";

const BacklogBoard = ({ backlogId }: { backlogId: string }) => {
  const { data, isLoading, mutate } = useSWR(
    `${apiRoutesList.items}?backlog=${backlogId}`,
    fetcher
  );

  const handleBacklogsSave = useSaveBacklogsOrder(backlogId, mutate);

  if (isLoading) return <LoadingAnimation />;

  if (!data) return <div> Backlog doesnt exist or you dont have access </div>;

  return (
    <div className="px-4">
      <div className=" min-h-[calc(98vh-210px)] overflow-auto md:max-w-[calc(98vw-288px)]">
        <DnDMultList
          vertical={false}
          data={data}
          actions={{
            saveStrategy: "onChange",
            handleSave: handleBacklogsSave,
          }}
          containersOptions={{
            handle: false,
            style: {
              background: "black",
              color: "var(--color-text-on-color)",
              padding: "1rem",
            },
            customTitle: ContainerTitle,
          }}
          renderItem={BacklogDndItem}
        />
      </div>
    </div>
  );
};

export default BacklogBoard;
