"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Item } from "./Item";
import { SortableItemProps } from "@/types";

const SortableItem = ({
  children,
  disabled,
  id,
  index,
  handle,
  handpleProps,
  title,
  style,
}: SortableItemProps) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id,
    data: {
      title: title,
    },
  });
  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      dragging={isDragging}
      handle={handle}
      handleProps={
        handle ? { ...handpleProps, ref: setActivatorNodeRef } : undefined
      }
      index={index}
      style={style}
      transition={transition}
      transform={transform}
      listeners={listeners}
    >
      <>{children}</>
    </Item>
  );
};

export default SortableItem;
