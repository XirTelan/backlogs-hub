"use client";
import React, { useCallback, useState } from "react";
import { Item } from "@/components/dnd/Item";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragOverEvent,
  DragStartEvent,
  DndContext,
  DragOverlay,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import SortableContainer from "@/components/dnd/SortableContainer";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import toast from "react-hot-toast";
import { BacklogDTO, DndData } from "@/zodTypes";

const DnDMultList = ({ data }: { data: DndData }) => {
  const [activeId, setActiveId] = useState<unknown>(null);
  const [items, setItems] = useState<DndData>(data);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleBacklogsSave = useCallback(
    async (data: { [key: string]: BacklogDTO[] }) => {
      const dataFormatted: BacklogDTO[] = [];
      Object.entries(data).forEach(([folder, backlogs]) => {
        if (backlogs.length === 0) return;
        backlogs.forEach((backlog, indx) => {
          backlog.folder = folder;
          backlog.order = indx;
          dataFormatted.push(backlog);
        });
      });
      try {
        const res = await fetch(`/api/backlogs/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFormatted),
        });
        if (res.ok) {
          toast.success("Saved");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

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
  function findContainer(id: UniqueIdentifier) {
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
    const containerId: string = active.data?.current?.sortable.containerId;
    setActiveId(
      containerId
        ? items[containerId].find((item) => item._id === id)?.backlogTitle || id
        : id,
    );
  }
  return (
    <section>
      <Title
        title={"Backlogs order"}
        variant={2}
        description="You can change the order of backlogs by moving them within their folder or moving them to another using a handler."
      >
        <div className="flex">
          <ButtonBase
            text="Save changes"
            onClick={(e) => {
              e.preventDefault();
              console.log("?");
              handleBacklogsSave(items);
            }}
          />
        </div>
      </Title>
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
            <SortableContainer key={key} id={key} items={items[key]} />
          ))}
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </section>
  );
};

export default DnDMultList;
