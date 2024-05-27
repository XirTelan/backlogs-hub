import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  MouseSensor,
  TouchSensor,
  Modifiers,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "@/components/dnd/Item";
import DroppableContainer from "./DroppableContainer";
import Switcher from "@/components/Common/UI/Switcher";
import SortableItem from "@/components/dnd/SortableItem";
import { BacklogDTO, DndData } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/InputField";
import { MdCheck, MdClose, MdDeleteForever, MdEdit } from "react-icons/md";
import AddItem from "@/components/dnd/AddItem";
import { IoMdAddCircleOutline } from "react-icons/io";
import Modal from "@/components/Common/Modal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Title from "@/components/Common/Title";
import toast from "react-hot-toast";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  itemCount?: number;
  items?: Items;
  view?: "full" | "compact";
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

const DnDMultList = ({
  data,
  view = "full",
  adjustScale = false,
  cancelDrop,
  columns,
  handle = true,
  containerStyle,
  getItemStyles = () => ({}),
  modifiers,
  strategy = verticalListSortingStrategy,
  vertical = true,
  scrollable,
}: Props) => {
  const [items, setItems] = useState<DndData>(data);
  const [isAddNew, setIsAddNew] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState("");
  const [modalData, setModalData] = useState<
    | {
        isShow: boolean;
        caption: string;
        text: string;
        action: () => void | undefined;
      }
    | undefined
  >();
  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[],
  );
  const containersSet = new Set(containers);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
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
      console.log("dataFormatted", dataFormatted);
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

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items,
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id),
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items],
  );
  const [clonedItems, setClonedItems] = useState<DndData | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].some((item) => item._id == id),
    );
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].findIndex((item) => item._id == id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const showModal = () => {
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

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

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
              // size="small"
              onClick={() => setIsAddNew(true)}
              icon={<IoMdAddCircleOutline />}
            />
            <ButtonBase
              text="Save changes"
              onClick={(e) => {
                e.preventDefault();
                console.log("?");
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
          onDragStart={({ active }) => {
            setOverlayTitle(active?.data?.current?.title || "");
            setActiveId(active.id);
            setClonedItems(items);
          }}
          onDragOver={({ active, over }) => {
            const overId = over?.id;

            if (overId == null || active.id in items) {
              return;
            }

            const overContainer = findContainer(overId);
            const activeContainer = findContainer(active.id);

            if (!overContainer || !activeContainer) {
              return;
            }

            if (activeContainer !== overContainer) {
              setItems((items) => {
                const activeItems = items[activeContainer];
                const overItems = items[overContainer];
                const overIndex = overItems.findIndex(
                  (items) => items._id === overId,
                );
                const activeIndex = activeItems.findIndex(
                  (item) => item._id === active.id,
                );

                let newIndex: number;

                if (overId in items) {
                  newIndex = overItems.length + 1;
                } else {
                  const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                      over.rect.top + over.rect.height;

                  const modifier = isBelowOverItem ? 1 : 0;

                  newIndex =
                    overIndex >= 0
                      ? overIndex + modifier
                      : overItems.length + 1;
                }

                recentlyMovedToNewContainer.current = true;

                return {
                  ...items,
                  [activeContainer]: items[activeContainer].filter(
                    (item) => item._id !== active.id,
                  ),
                  [overContainer]: [
                    ...items[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...items[overContainer].slice(
                      newIndex,
                      items[overContainer].length,
                    ),
                  ],
                };
              });
            }
          }}
          onDragEnd={({ active, over }) => {
            console.log("end", active.id, over?.id);
            if (active.id in items && over?.id) {
              setContainers((containers) => {
                const activeIndex = containers.indexOf(active.id);
                const overIndex = containers.indexOf(over.id);
                console.log("end", activeIndex, overIndex);
                console.log("before", containers);
                return arrayMove(containers, activeIndex, overIndex);
              });
            }

            const activeContainer = findContainer(active.id);

            if (!activeContainer) {
              setActiveId(null);
              return;
            }

            const overId = over?.id;

            if (overId == null) {
              setActiveId(null);
              return;
            }

            const overContainer = findContainer(overId);

            if (overContainer) {
              const activeIndex = items[activeContainer].findIndex(
                (item) => item._id === active.id,
              );
              const overIndex = items[overContainer].findIndex(
                (item) => item._id === overId,
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
            }

            setActiveId(null);
          }}
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
                  columns={columns}
                  onRename={(newValue: string) => {
                    console.log(containers, containerId);
                    const indx = containers.indexOf(containerId);
                    console.log("new indx", indx);
                    setContainers((containers) => {
                      return arrayMove(
                        [
                          ...containers.filter(
                            (container) => container != containerId,
                          ),
                          newValue,
                        ],
                        containers.length - 1,
                        indx,
                      );
                    });
                    setItems((prev) => {
                      const { [containerId]: items, ...rest } = prev;
                      return { ...rest, [newValue]: items };
                    });
                  }}
                  onRemove={() => {
                    const newContainers = containers.filter(
                      (id) => id !== containerId,
                    );
                    setItems((prev) => {
                      const { [containerId]: tmp, ...rest } = prev;
                      return {
                        ...rest,
                        [newContainers[0]]: [
                          ...items[newContainers[0]],
                          ...tmp,
                        ],
                      };
                    });
                    // setItems()
                    setContainers(newContainers);
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
                          <SortableItem
                            disabled={isSortingContainer}
                            key={value._id}
                            id={value._id}
                            title={value.backlogTitle}
                            index={index}
                            handle={handle}
                            style={getItemStyles}
                            containerId={containerId}
                            getIndex={getIndex}
                          >
                            <div className=" ms-auto flex ">
                              <Link href={`/backlog/edit/${value._id}`}>
                                <ButtonBase
                                  size="small"
                                  variant="ghost"
                                  icon={<MdEdit size={20} />}
                                />
                              </Link>
                              <ButtonBase
                                title="Delete"
                                size="small"
                                variant="dangerGhost"
                                icon={<MdDeleteForever size={20} />}
                                onClick={() => {
                                  setModalData({
                                    isShow: true,
                                    caption: `Delete backlog "${value.backlogTitle}"`,
                                    text: "Are you sure you want to delete the backlog?",
                                    action: () => {
                                      console.log("Hey");
                                    },
                                  });
                                  // console.log(isShowModal);
                                }}
                              ></ButtonBase>
                            </div>
                          </SortableItem>
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
        title={containerId}
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
