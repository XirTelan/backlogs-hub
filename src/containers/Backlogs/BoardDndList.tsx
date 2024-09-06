"use client";
import React from "react";
import { BacklogItemDTO } from "@/zodTypes";

import { DndData } from "@/types";
import DnDMultList from "../DragAndDrop/DndMultiList";
import SortableItem from "@/components/dnd/SortableItem";
const BoardDndList = ({ data }: { data: DndData<BacklogItemDTO> }) => {
  return (
    <>
      <DnDMultList
        vertical={false}
        data={data}
        actions={{
          addMode: "inner",
          addAction: () => {},
          saveStrategy: "onChange",
        }}
        renderItem={({ item, isSortingContainer, getItemStyles, ...rest }) => {
          return (
            <SortableItem
              key={item._id}
              disabled={isSortingContainer}
              id={item._id}
              title={item.title}
              style={getItemStyles}
              {...rest}
            >
              <div className="flex h-8 items-center">
                <span className="ms-2">{item.title}</span>
              </div>
            </SortableItem>
          );
        }}
      />
    </>
  );
};

export default BoardDndList;
