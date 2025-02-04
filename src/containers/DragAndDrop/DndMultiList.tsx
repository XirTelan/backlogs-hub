"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "@/components/dnd/Item";
import DroppableContainer from "../DragAndDrop/DroppableContainer";

import useDragAndDrop from "@/hooks/useDragAndDrop";
import { DndListProps } from "@/types";
import ActionsBlock from "./ActionsBlock";

type BaseItem = {
  _id: string;
};

export default function DnDMultList<T extends BaseItem>({
  data,
  view = "full",
  adjustScale = false,
  cancelDrop,
  handle = true,
  containersOptions,
  modifiers,
  strategy = verticalListSortingStrategy,
  vertical = true,
  scrollable,
  actions,
  renderItem,
}: DndListProps<T>) {
  const backlogs = useMemo(() => {
    return Object.fromEntries(
      Object.entries(data)
        .sort((a, b) => a[1].order - b[1].order)
        .map((item) => {
          return [item[0], item[1].items];
        }),
    );
  }, [data]);

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
  const containersSet = useMemo(() => new Set(containers), [containers]);

  const addNewContainer = (newFolder: string) => {
    setContainers((containers) => [...containers, newFolder]);
    setItems((prev) => {
      return { ...prev, [newFolder]: [] };
    });
  };

  const [isDirty, setIsDirty] = useState(false);

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

  const autoSave = useCallback(
    (e: DragEndEvent) => {
      handleDragEnd(e);
      if (actions.saveStrategy === "onChange") setIsDirty(true);
    },
    [actions.saveStrategy, handleDragEnd],
  );
  useEffect(() => {
    if (actions.saveStrategy === "manual" || !isDirty || !actions.handleSave)
      return;
    actions.handleSave(containers, items);
    setIsDirty(false);
  }, [containers, items, isDirty, actions]);

  return (
    <>
      <section className={`my-4 max-w-80`}>
        {actions.saveStrategy === "manual" && (
          <ActionsBlock
            saveStrategy={actions.saveStrategy}
            handleSave={handleSave}
            disabled={(value) => containersSet.has(value)}
            addNewItem={addNewContainer}
          />
        )}
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
          onDragEnd={autoSave}
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
                      {...containersOptions}
                      showActions={view === "compact"}
                    >
                      <>
                        {view === "full" && (
                          <SortableContext
                            id={`${containerId}`}
                            items={currentItems.map((item) => item._id)}
                            strategy={strategy}
                          >
                            {currentItems.map((item, index) => {
                              if (!renderItem)
                                return <div key={index}>{item._id}</div>;
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
                      </>
                    </DroppableContainer>
                  );
                })}
                {actions.saveStrategy === "onChange" && (
                  <ActionsBlock
                    saveStrategy={actions.saveStrategy}
                    handleSave={handleSave}
                    disabled={(value) => containersSet.has(value)}
                    addNewItem={addNewContainer}
                  />
                )}
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
        transform={{
          x: 0,
          y: 0,
          scaleX: 0,
          scaleY: 0,
        }}
        style={{ height: "48px" }}
      >
        <span className="ms-2">{overlayTitle}</span>
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
        handle={false}
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
