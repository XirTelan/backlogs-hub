"use client";

import { useMountStatus } from "@/hooks/useMountStatus";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "./Item";
import { SortableItemProps } from "@/types";

const SortableItem = ({
  children,
  containerId,
  disabled,
  getIndex,
  id,
  index,
  handle,
  title,
  style,
}: SortableItemProps) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      title: title,
    },
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;
  // console.log("Sortable", id);
  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      title={title}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId,
      })}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    >
      {children}
    </Item>
  );
};

export default SortableItem;
