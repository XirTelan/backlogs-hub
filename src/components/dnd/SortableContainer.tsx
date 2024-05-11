"use client";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";
import BacklogDndCard from "@/containers/Backlogs/BacklogDndCard";
import Title from "../Common/Title";
import { Item } from "./Item";

const SortableContainer = ({
  id,
  items,
  sizes = { width: 100, heigth: 100 },
}: {
  id: string;
  items: { id: string | number; title: string }[];
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
        className=" m-2 flex flex-col "
        style={{ minHeight: sizes.heigth, minWidth: sizes.width }}
        ref={setNodeRef}
      >
        <Title title={id} variant={3} />
        <div className="  content-center text-center ">
          {items.length == 0 && (
            <div className=" m-auto content-center">Empty</div>
          )}
          {items.map((item) => (
            <SortableItem key={item._id} id={item._id}>
              <BacklogDndCard item={item} />
            </SortableItem>
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default SortableContainer;
