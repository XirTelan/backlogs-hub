"use client";
import { getCurrentUserInfo } from "@/auth/utils";
import Title from "@/components/Common/Title";
import LinkButton from "@/components/Common/UI/LinkButton";
import { Item } from "@/components/dnd/Item";
import SortableContainer from "@/components/dnd/SortableContainer";
import { SortableItem } from "@/components/dnd/SortableItem";
import DnDList from "@/containers/DragAndDrop/DnDList";
import { getBacklogsByFolder } from "@/services/backlogs";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  Over,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";

const ManageBacklogs = () => {
  const [activeId, setActiveId] = useState<unknown>(null);
  const [items, setItems] = useState<{
    [key: string]: { id: number; title: string }[];
  }>({
    default: [
      { id: 1, title: "1" },
      { id: 2, title: "2" },
      { id: 3, title: "3" },
    ],
    games: [
      { id: 4, title: "4" },
      { id: 5, title: "5" },
      { id: 6, title: "6" },
    ],
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const defaultAnnouncements = {
    onDragStart({active}) {
      console.log(`Picked up draggable item ${active.id}.`);
    },
    onDragOver({ active, over }) {
      // console.log("OndragOver", over);
      if (over) {
        console.log(
          `Draggable item ${active.id} was moved over droppable area ${over.id}.`,
        );
        return;
      }

      console.log(
        `Draggable item ${active} is no longer over a droppable area.`,
      );
    },
    onDragEnd({ active, over }) {
      if (over) {
        console.log(
          `Draggable item ${active.id} was dropped over droppable area ${over.id}`,
        );
        return;
      }

      console.log(`Draggable item ${active.id} was dropped.`);
    },
    onDragCancel({active}) {
      console.log(
        `Dragging was cancelled. Draggable item ${active.id} was dropped.`,
      );
    },
  };
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    if (!over) return;
    const { id: overId } = over;
    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    console.log(" Find the containers", activeContainer, overContainer);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      console.log("exit");
      return;
    }
    console.log("setItems?");
    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.id == id);
      const overIndex = overItems.findIndex((item) => item.id == overId);
      console.log("Find the indexes for the items", activeIndex, overIndex);
      let newIndex;
      console.log("OverID", overId);
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      console.log("update");
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
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
      (item) => item.id == active.id,
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id == overId,
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
      items[key].some((item) => item.id == id),
    );
  }
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    console.log("dragStart", active, id);
    setActiveId(id);
  }
  return (
    <>
      <div className="mb-10">Test</div>
      <div className="flex ">
        <DndContext
          id="manageBacklog"
          sensors={sensors}
          accessibility={{ announcements: defaultAnnouncements }}
          // collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex w-full  border p-4">
            {/* {Object.keys(items).map((key) => (
              <SortableContainer key={key} id={key} items={items[key]} />
            ))} */}

            <SortableContainer
              key={"default"}
              id={"default"}
              items={items["default"]}
            />
            <SortableContainer
              key={"games"}
              id={"games"}
              items={items["games"]}
            />
          </div>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default ManageBacklogs;
