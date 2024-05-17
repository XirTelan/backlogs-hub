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
  children,
}: {
  id: string;
  items: { _id: string; [key: string]: unknown }[];
  sizes?: { width: number; heigth: number };
  children?: React.ReactNode;
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
        {children}
      </div>
    </SortableContext>
  );
};

export default SortableContainer;
