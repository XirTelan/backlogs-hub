"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

export function SortableItem({ children, ...props }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li className="flex" ref={setNodeRef} style={style}>
      <button
        className=" touch-none   items-center  border-y border-l border-neutral-700  bg-neutral-800 p-2  hover:cursor-grab"
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator className=" text-neutral-600 " size={24} />
      </button>
      {children}
      {/* <Item id={props.id} /> */}
    </li>
  );
}
