import { DndData } from "@/zodTypes";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useState } from "react";
type DndProps<T> = {
  items: T;
  setItems: React.Dispatch<T>;
};

const useDragAndDrop = (data) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState<DndData>(data);

  function handleDragOver(event: DragOverEvent) {
    console.log("Active", event.active);
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
      recentlyMovedToNewContainer.current = true;
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

  function handleDragEnd(event: DragEndEvent) {
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

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    if (id in items) {
      setActiveId(id);
      return;
    }
    const containerId: string = active.data?.current?.sortable.containerId;
    console.log("ContainerId", containerId, id);
    setActiveId(
      containerId
        ? items[containerId].find((item) => item._id === id)?.backlogTitle || id
        : id,
    );
  }
  return {
    activeId,
    setActiveId,
    items,
    setItems,
    findContainer,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
  };
};

export default useDragAndDrop;
