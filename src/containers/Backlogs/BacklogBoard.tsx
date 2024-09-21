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
import Title from "@/components/Common/Title";

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

  const containerTitle = (id: string) => (
    <div className=" group mb-2 flex w-60 flex-1 justify-between border-b border-border-1 pb-2 text-primary-text  hover:cursor-grab">
      <Title title={id} variant={3} />
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="opacity-0 group-hover:opacity-100 "
      >
        <ItemFormModalOpen
          btnOptions={{
            variant: "ghost",
            hideText: true,
            text: "",
            title: "Create item",
          }}
        />
      </div>
    </div>
  );
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
              background: "rgb(0 0 0)",
              padding: "1rem",
            },
            customTitle: containerTitle,
          }}
          renderItem={({ item, isSortingContainer, ...rest }) => {
            return (
              <SortableItem
                key={item._id}
                disabled={isSortingContainer}
                id={item._id}
                title={item.title}
                style={{ minWidth: "240px", border: 0 }}
                {...rest}
                handle={false}
              >
                <div className="flex  h-12 flex-1 cursor-grab items-center justify-between border-border-interactive ps-2 text-sm hover:active:cursor-grabbing hover:active:border ">
                  <ItemFastRename item={item} color={""} />
                  <div onMouseDown={(e) => e.preventDefault()}>
                    <BacklogItemActions item={item} />
                  </div>
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
