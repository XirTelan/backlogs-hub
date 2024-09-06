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
import { DndListProps } from "@/types";

type BaseItem = {
  _id: string;
};

const DnDMultList = <T extends BaseItem>({
  data,
  view = "full",
  adjustScale = false,
  cancelDrop,
  handle = true,
  containerStyle,
  getItemStyles = () => ({}),
  modifiers,
  strategy = verticalListSortingStrategy,
  vertical = true,
  scrollable,
  actions = {
    addMode: "top",
    saveStrategy: "manual",
  },
  renderItem,
}: DndListProps<T>) => {
  const [isAddNew, setIsAddNew] = useState(false);

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
  } = useDragAndDrop(data);

  const containersSet = useMemo(() => new Set(containers), [containers]);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const AddNewCat = useCallback(
    () => (
      <AddItem
        action={(newFolder) => {
          setContainers((containers) => [...containers, newFolder]);
          setItems((prev: typeof data) => {
            return { ...prev, [newFolder]: [] };
          });
        }}
        close={() => setIsAddNew(false)}
        disabled={(value) => containersSet.has(value)}
      />
    ),
    [containersSet, setContainers, setItems],
  );

  const ActionsBlock = ({ isAddNew }: { isAddNew: boolean }) => {
    if (isAddNew)
      return (
        <div>
          <AddNewCat />
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
        {actions.saveStrategy === "manual" && (
          <ButtonBase
            text="Save changes"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              if (actions.saveManaul)
                actions.saveManaul(containers as string[], items);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <section className={`my-4 ${!isAddNew && "ms-auto"}`}>
        {actions.addMode === "top" && <ActionsBlock isAddNew={isAddNew} />}
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
                {containers.map((containerId) => (
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
                    items={items[containerId]}
                    scrollable={scrollable}
                    style={containerStyle}
                    showActions={view === "compact"}
                  >
                    {view === "full" && (
                      <SortableContext
                        id={`${containerId}`}
                        items={items[containerId].map((item) => item._id)}
                        strategy={strategy}
                      >
                        {items[containerId].map((item, index) => {
                          if (!renderItem) return <div key={index}>well</div>;
                          return renderItem({
                            item,
                            containerId,
                            index,
                            handle,
                            getItemStyles,
                            getIndex,
                            isSortingContainer,
                          });
                        })}
                      </SortableContext>
                    )}
                  </DroppableContainer>
                ))}
                {actions.addMode === "inner" && (
                  <ActionsBlock isAddNew={isAddNew} />
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
};

export default DnDMultList;

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};
