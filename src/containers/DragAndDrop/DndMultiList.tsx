"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "@/components/dnd/Item";
import DroppableContainer from "../DragAndDrop/DroppableContainer";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import AddItem from "@/components/dnd/AddItem";
import { IoMdAdd } from "react-icons/io";

import useDragAndDrop from "@/hooks/useDragAndDrop";
import { DndData, DndListProps } from "@/types";

type BaseItem = {
  _id: string;
};

export default function DnDMultList<T extends BaseItem>({
  data,
  view = "full",
  adjustScale = false,
  cancelDrop,
  handle = true,
  containerStyle,
  modifiers,
  strategy = verticalListSortingStrategy,
  vertical = true,
  scrollable,
  actions,
  renderItem,
}: DndListProps<T>) {
  const [isAddNew, setIsAddNew] = useState(false);

  const backlogs = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(data)
          .sort((a, b) => a[1].order - b[1].order)
          .map((item) => {
            return [item[0], item[1].items];
          }),
      ),
    [data],
  );

  const defaultContainers = useMemo(() => {
    const res: string[] = [];
    Object.entries(data)
      .sort((a, b) => a[1].order - b[1].order)
      .forEach((item) => {
        res.push(item[0]);
      });
    return res;
  }, [data]);

  const {
    activeId,
    getIndex,
    items,
    setItems,
    containers,
    setContainers,
    overlayTitle,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleRemove,
    handleRename,
    onDragCancel,
    collisionDetectionStrategy,
  } = useDragAndDrop(backlogs, defaultContainers);

  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleSave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (actions.saveStrategy === "manual")
        actions.handleSave(containers as string[], items);
    },
    [actions, containers, items],
  );

  return (
    <>
      <section className={`my-4 ${!isAddNew && "ms-auto"} max-w-80`}>
        <ActionsBlock
          isAddNew={isAddNew}
          containers={containers}
          setContainers={setContainers}
          setIsAddNew={setIsAddNew}
          setItems={setItems}
          saveStrategy={actions.saveStrategy}
          handleSave={handleSave}
        />
      </section>
      <section>
        <DndContext
          id="manageBacklogs"
          sensors={sensors}
          collisionDetection={collisionDetectionStrategy}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          cancelDrop={cancelDrop}
          onDragCancel={onDragCancel}
          modifiers={modifiers}
        >
          <div className={`${vertical ? "flex-col" : "gap-4"} flex`}>
            <SortableContext
              id="container_context"
              items={containers}
              strategy={
                vertical
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            >
              <>
                {containers.map((containerId) => {
                  const currentItems = items[containerId] ?? [];
                  return (
                    <DroppableContainer
                      key={containerId}
                      id={containerId}
                      onRename={(value: string) =>
                        handleRename(value, containerId)
                      }
                      onRemove={() => {
                        handleRemove(containerId);
                      }}
                      containers={containers}
                      items={currentItems}
                      scrollable={scrollable}
                      style={containerStyle}
                      showActions={view === "compact"}
                    >
                      {view === "full" && (
                        <SortableContext
                          id={`${containerId}`}
                          items={currentItems.map((item) => item._id)}
                          strategy={strategy}
                        >
                          {currentItems.map((item, index) => {
                            if (!renderItem) return <div key={index}>well</div>;
                            return renderItem({
                              item,
                              containerId,
                              index,
                              handle,
                              getIndex,
                              isSortingContainer,
                            });
                          })}
                        </SortableContext>
                      )}
                    </DroppableContainer>
                  );
                })}
              </>
            </SortableContext>
          </div>
          <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
            {activeId
              ? containers.includes(activeId)
                ? renderContainerDragOverlay(activeId)
                : renderSortableItemDragOverlay()
              : null}
          </DragOverlay>
        </DndContext>
      </section>
    </>
  );

  function renderSortableItemDragOverlay() {
    return (
      <Item
        dragOverlay
        handle={handle}
        transform={{
          x: 0,
          y: 0,
          scaleX: 0,
          scaleY: 0,
        }}
      >
        <span>{overlayTitle}</span>
      </Item>
    );
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    return (
      <Item
        transform={{
          x: 0,
          y: 0,
          scaleX: 0,
          scaleY: 0,
        }}
      >
        <span>{containerId}</span>
      </Item>
    );
  }
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

function ActionsBlock<T>({
  containers,
  isAddNew,
  handleSave,
  saveStrategy,
  setIsAddNew,
  setContainers,
  setItems,
}: ActionsBlockProps<T>) {
  const containersSet = useMemo(() => new Set(containers), [containers]);

  const addNewContainer = (newFolder: string) => {
    setContainers((containers) => [...containers, newFolder]);
    setItems((prev) => {
      return { ...prev, [newFolder]: [] };
    });
  };

  if (isAddNew)
    return (
      <div>
        <AddItem
          action={addNewContainer}
          close={() => setIsAddNew(false)}
          disabled={(value) => containersSet.has(value)}
        />
      </div>
    );

  return (
    <div className="group flex h-8 items-center">
      <ButtonBase
        variant="secondary"
        size="medium"
        onClick={() => setIsAddNew(true)}
        icon={<IoMdAdd />}
      />
      {saveStrategy === "manual" && (
        <ButtonBase text="Save changes" size="medium" onClick={handleSave} />
      )}
    </div>
  );
}

type ActionsBlockProps<T> = {
  containers: UniqueIdentifier[];
  isAddNew: boolean;
  saveStrategy: "manual" | "onChange";
  handleSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setContainers: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>;
  setIsAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: React.Dispatch<React.SetStateAction<DndData<T>>>;
};
