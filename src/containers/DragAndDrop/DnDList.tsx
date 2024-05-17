"use client";
import React, { useCallback, useState } from "react";

import toast from "react-hot-toast";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { SortableItem } from "@/components/dnd/SortableItem";
import FolderItem from "@/components/FolderItem";

const DnDList = ({ data, userName }: { data: DndItem[]; userName: string }) => {
  const [items, setItems] = useState(data);
  const [isEditMode, setIsEditMode] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleSave = useCallback(
    async (data: DndItem[]) => {
      const dataFormatted = data.map((folder) => folder.folderName);
      console.log(dataFormatted);
      try {
        const res = await fetch(`/api/users/${userName}`, {
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
    [userName],
  );

  return (
    <section>
      <Title
        title={"Folders order"}
        variant={2}
        description="Here you can create,edit,change order or delete your folders"
      >
        <div className="flex">
          <ButtonBase
            text="Create new"
            onClick={(e) => {
              e.preventDefault();
              setIsEditMode(true);
              // createNewFolder();
            }}
          />
          <ButtonBase
            text="Save changes"
            onClick={(e) => {
              e.preventDefault();
              handleSave(items);
            }}
          />
        </div>
      </Title>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.folderName)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2">
            {/* {createNew && <input></input>} */}
            {items.map((item) => (
              <SortableItem key={item.folderName} id={item.folderName}>
                <FolderItem folder={item} isEdit={isEditMode} />
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.folderName === active.id,
        );
        const newIndex = items.findIndex((item) => item.folderName === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default DnDList;

type DndItem = { folderName: string; count: number };
