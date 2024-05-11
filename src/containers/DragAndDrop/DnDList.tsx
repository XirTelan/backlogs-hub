"use client";
import React, { useState } from "react";
import { Reorder } from "framer-motion";
import BacklogDndCard from "../Backlogs/BacklogDndCard";
import ActionButton from "@/components/ActionButton";
import { RiSave3Fill } from "react-icons/ri";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BacklogDTO } from "@/zodTypes";
import { Item } from "@/components/dnd/Item";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  closestCenter,
  pointerWithin,
  DragOverEvent,
  DragStartEvent,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import SortableContainer from "@/components/dnd/SortableContainer";

const DnDList = ({ data }: { data: unknown }) => {
  const [activeId, setActiveId] = useState<unknown>(null);
  const [items, setItems] = useState(data);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function customCollisionDetectionAlgorithm(args) {
    const closestCornersCollisions = closestCorners(args);
    const closestCenterCollisions = closestCenter(args);
    const pointerWithinCollisions = pointerWithin(args);

    if (
      closestCornersCollisions.length > 0 &&
      closestCenterCollisions.length > 0 &&
      pointerWithinCollisions.length > 0
    ) {
      return pointerWithinCollisions;
    }

    return [];
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    if (!over) return;
    const { id: overId } = over;
    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }
    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item._id == id);
      const overIndex = overItems.findIndex((item) => item._id == overId);

      const result = {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item._id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, overIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(overIndex, prev[overContainer].length),
        ],
      };
      return result;
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    if (!over) return;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item._id == active.id,
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item._id == overId,
    );
    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }
    setActiveId(null);
  }
  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].some((item) => item._id == id),
    );
  }
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    const containerId = active?.data?.current?.sortable.containerId;
    setActiveId(
      containerId
        ? items[containerId].find((item) => item._id === id).backlogTitle || id
        : id,
    );
  }
  return (
    <DndContext
      id="manageBacklog"
      sensors={sensors}
      collisionDetection={customCollisionDetectionAlgorithm}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className=" flex w-full flex-col  border p-4">
        {Object.keys(items).map((key) => (
          <SortableContainer key={key} id={key} items={items[key]} />
        ))}
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );
};

export default DnDList;
