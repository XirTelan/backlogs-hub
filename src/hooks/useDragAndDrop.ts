import { DndData } from "@/zodTypes";
import {
  CollisionDetection,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";

const useDragAndDrop = (data: DndData) => {
  const [items, setItems] = useState<DndData>(data);
  const [clonedItems, setClonedItems] = useState<DndData | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[],
  );
  const [overlayTitle, setOverlayTitle] = useState("");
  const recentlyMovedToNewContainer = useRef(false);
  const lastOverId = useRef<UniqueIdentifier | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  useEffect(() => {
    setItems(data);
  }, [data]);
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
                  containerItems.some((item) => item._id === container.id),
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

  const handleDragStart = ({ active }: DragStartEvent) => {
    setOverlayTitle(active?.data?.current?.title || "");
    setActiveId(active.id);
    setClonedItems(items);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
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
        const overIndex = overItems.findIndex((items) => items._id === overId);
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
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
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
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in items && over?.id) {
      setContainers((containers) => {
        const activeIndex = containers.indexOf(active.id);
        const overIndex = containers.indexOf(over.id);
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
  const handleRemove = (containerId: UniqueIdentifier) => {
    const newContainers = containers.filter((id) => id !== containerId);
    setItems((prev) => {
      const { [containerId]: tmp, ...rest } = prev;
      return {
        ...rest,
        [newContainers[0]]: [...items[newContainers[0]], ...tmp],
      };
    });
    setContainers(newContainers);
  };
  const handleRename = (newValue: string, containerId: UniqueIdentifier) => {
    const indx = containers.indexOf(containerId);
    setContainers((containers) => {
      return arrayMove(
        [
          ...containers.filter((container) => container != containerId),
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
  };
  //#region utils
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
  //#endregion

  return {
    activeId,
    getIndex,
    setActiveId,
    containers,
    setContainers,
    items,
    setItems,
    overlayTitle,
    findContainer,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleRemove,
    handleRename,
    onDragCancel,
    collisionDetectionStrategy,
  };
};

export default useDragAndDrop;
