"use client";
import React, { useCallback, useState } from "react";
import { Item } from "@/components/dnd/Item";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableContainer from "@/components/dnd/SortableContainer";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import toast from "react-hot-toast";
import { BacklogDTO, DndData } from "@/zodTypes";
import InputField from "@/components/Common/UI/InputField";
import { MdClose, MdCheck } from "react-icons/md";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { SortableItem } from "@/components/dnd/SortableItem";
import BacklogDndCard from "../Backlogs/BacklogDndCard";
import FolderItem from "@/components/FolderItem";

const DnDMultList = ({ data, setF }: { data: DndData }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const {
    activeId,
    items,
    setItems,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
  } = useDragAndDrop();


  return (
    <DndContext
      id="manageBacklog"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className=" flex w-full flex-col ">
        {Object.keys(items).map((key) => (
          <SortableContainer key={key} id={key} items={items[key]}>
            <div className="flex items-center">
              <Title title={key} variant={3} />{" "}
              <button
                className="flex h-4 w-full bg-red-800"
                onClick={() => {
                  setF(true);
                }}
              ></button>
            </div>
            <ul className="  flex flex-col content-center gap-2 text-center ">
              {items[key].length == 0 && (
                <div className="  h-12 content-center bg-layer-1 text-secondary-text">
                  This folder is empty
                </div>
              )}
              {items[key].map((item) => (
                <SortableItem key={item._id} id={item._id}>
                  <BacklogDndCard backlog={item} />
                </SortableItem>
              ))}
            </ul>
          </SortableContainer>
        ))}
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );
};

export default DnDMultList;
