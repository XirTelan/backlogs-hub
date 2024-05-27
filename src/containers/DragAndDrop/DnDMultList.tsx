import React, { useCallback, useState } from "react";
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
import DroppableContainer from "./DroppableContainer";
import { BacklogDTO, DndData } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import AddItem from "@/components/dnd/AddItem";
import { IoMdAddCircleOutline } from "react-icons/io";
import Modal from "@/components/Common/Modal";
import Title from "@/components/Common/Title";
import toast from "react-hot-toast";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import BacklogDndItem from "../Backlogs/BacklogDndItem";
import { DndListProps } from "@/types";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const DnDMultList = ({
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
}: DndListProps) => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [modalData, setModalData] = useState<
    | {
        isShow: boolean;
        caption: string;
        text: string;
        action: () => void | undefined;
      }
    | undefined
  >();

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
  const containersSet = new Set(containers);

  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const handleBacklogsSave = useCallback(
    async (containers: string[], data: DndData) => {
      const dataFormatted: { folders: string[]; backlogs: BacklogDTO[] } = {
        folders: containers as string[],
        backlogs: [],
      };
      Object.entries(data).forEach(([folder, backlogs]) => {
        if (backlogs.length === 0) return;
        backlogs.forEach((backlog, indx) => {
          backlog.folder = folder;
          backlog.order = indx;
          dataFormatted.backlogs.push(backlog);
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
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/backlogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) toast.success("Deleted");
    } catch (error) {
      console.error(error);
    }
  };
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const showModal = () => {
    if (!modalData) return;
    return (
      <Modal
        showActions
        setClose={function (): void {
          setModalData(undefined);
        }}
        action={modalData.action}
      >
        <div className=" bg-layer-1 p-4 text-white">
          <Title title={modalData.caption} variant={2} />
          <div className=" text-secondary-text  ">{modalData.text}</div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <section className={`my-4 ${!isAddNew && "ms-auto"}`}>
        {isAddNew ? (
          <AddItem
            action={(newFolder) => {
              setContainers((containers) => [...containers, newFolder]);
              setItems((prev) => {
                return { ...prev, [newFolder]: [] };
              });
            }}
            close={() => setIsAddNew(false)}
            disabled={(value) => containersSet.has(value)}
          />
        ) : (
          <div className="group flex h-8 items-center">
            <ButtonBase
              variant="ghost"
              text="Add new folder"
              onClick={() => setIsAddNew(true)}
              icon={<IoMdAddCircleOutline />}
            />
            <ButtonBase
              text="Save changes"
              onClick={(e) => {
                e.preventDefault();
                handleBacklogsSave(containers as string[], items);
              }}
            />
          </div>
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
          onDragEnd={handleDragEnd}
          cancelDrop={cancelDrop}
          onDragCancel={onDragCancel}
          modifiers={modifiers}
        >
          <div className="flex flex-col">
            <SortableContext
              id="container_context"
              items={containers}
              strategy={
                vertical
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            >
              {containers.map((containerId) => (
                <DroppableContainer
                  key={containerId}
                  id={containerId}
                  onRename={(value: string) => handleRename(value, containerId)}
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
                      {items[containerId].map((value, index) => {
                        return (
                          <BacklogDndItem
                            disabled={isSortingContainer}
                            key={value._id}
                            id={value._id}
                            title={value.backlogTitle}
                            index={index}
                            handle={handle}
                            style={getItemStyles}
                            containerId={containerId}
                            getIndex={getIndex}
                            backlog={value}
                            action={() => {
                              setModalData({
                                isShow: true,
                                caption: `Delete backlog "${value.backlogTitle}"`,
                                text: "Are you sure you want to delete the backlog?",
                                action: () => {
                                  handleDelete(value._id);
                                },
                              });
                            }}
                          />
                        );
                      })}
                    </SortableContext>
                  )}
                </DroppableContainer>
              ))}
            </SortableContext>
          </div>
          {modalData?.isShow && showModal()}
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
        title={overlayTitle}
        handle={handle}
        transform={{
          x: 0,
          y: 0,
          scaleX: 0,
          scaleY: 0,
        }}
      />
    );
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    return (
      <Item
        title={containerId as string}
        transform={{
          x: 0,
          y: 0,
          scaleX: 0,
          scaleY: 0,
        }}
      />
    );
  }
};

export default DnDMultList;
