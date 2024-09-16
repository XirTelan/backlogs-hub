"use client";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { apiRoutesList } from "@/lib/routesList";
import { BacklogItemDTO } from "@/zodTypes";
import React, { useCallback } from "react";
import useSWR from "swr";
import { DndData } from "@/types";
import { fetcher } from "@/utils";
import { ItemFormModalOpen } from "../Items/ItemFormModal";
import SortableItem from "@/components/dnd/SortableItem";
12;
import DnDMultList from "../DragAndDrop/DndMultiList";
import ItemFastRename from "../Items/ItemsFastRename";
import BacklogItemActions from "./BacklogList/BacklogItemActions";
import { UniqueIdentifier } from "@dnd-kit/core";
import { toastCustom } from "@/lib/toast";

const BacklogBoard = ({ backlogId }: { backlogId: string }) => {
  const { data, isLoading, mutate } = useSWR(
    `${apiRoutesList.items}?backlog=${backlogId}`,
    fetcher,
  );

  const handleBacklogsSave = useCallback(
    async (containers: UniqueIdentifier[], data: DndData<BacklogItemDTO>) => {
      const dataFormatted: {
        backlogId: string;
        categories: string[];
        items: BacklogItemDTO[];
      } = {
        backlogId: backlogId,
        categories: containers as string[],
        items: [],
      };
      Object.entries(data).forEach(([category, items]) => {
        if (items.length === 0) return;
        items.forEach((item, indx) => {
          item.category = category;
          item.modifiersFields = {
            ...item.modifiersFields,
            order: indx,
          };
          dataFormatted.items.push(item);
        });
      });

      try {
        const res = await fetch(`/api/items/board`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFormatted),
        });
        if (res.ok) {
          toastCustom.success("Saved");
          mutate();
        } else {
          toastCustom.error(await res.json());
        }
      } catch (error) {
        console.error(error);
      }
    },
    [backlogId, mutate],
  );

  if (isLoading) return <LoadingAnimation />;

  if (!data) return <div> Backlog doesnt exist or you dont have access </div>;
  return (
    <div className="px-4">
      <ItemFormModalOpen btnOptions={{ variant: "ghost" }} />
      <div className=" min-h-[calc(98vh-210px)] overflow-auto md:max-w-[calc(98vw-288px)]">
        <DnDMultList
          vertical={false}
          data={data}
          actions={{
            addAction: () => {},
            saveStrategy: "manual",
            handleSave: handleBacklogsSave,
          }}
          renderItem={({ item, isSortingContainer, ...rest }) => {
            return (
              <SortableItem
                key={item._id}
                disabled={isSortingContainer}
                id={item._id}
                title={item.title}
                style={{ minWidth: "240px" }}
                {...rest}
              >
                <div className="ms-2 flex h-12 flex-1 items-center justify-between text-sm">
                  <ItemFastRename item={item} color={""} />
                  <BacklogItemActions item={item} />
                </div>
              </SortableItem>
            );
          }}
        />
      </div>
    </div>
  );
};

export default BacklogBoard;
