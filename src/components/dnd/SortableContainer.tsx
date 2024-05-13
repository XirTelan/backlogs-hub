"use client";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";
import BacklogDndCard from "@/containers/Backlogs/BacklogDndCard";
import Title from "../Common/Title";
import { BacklogDTO } from "@/zodTypes";

const SortableContainer = ({
  id,
  items,
  sizes = { width: 100, heigth: 100 },
}: {
  id: string;
  items: BacklogDTO[];
  sizes?: { width: number; heigth: number };
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      strategy={verticalListSortingStrategy}
      id={id}
      items={items.map((item) => item._id)}
    >
      <div
        className=" m-2 flex  flex-col "
        style={{ minHeight: sizes.heigth, minWidth: sizes.width }}
        ref={setNodeRef}
      >
        <Title title={id} variant={3} />
        <ul className="  flex flex-col content-center gap-2 text-center ">
          {items.length == 0 && (
            <div className="  h-12 content-center bg-layer-1 text-secondary-text">
              This folder is empty
            </div>
          )}
          {items.map((item) => (
            <SortableItem key={item._id} id={item._id}>
              <BacklogDndCard backlog={item} />
            </SortableItem>
          ))}
        </ul>
      </div>
    </SortableContext>
  );
};

export default SortableContainer;
