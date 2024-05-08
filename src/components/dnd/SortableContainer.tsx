import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

const SortableContainer = ({
  id,
  items,
}: {
  id: string;
  items: { id: string | number; title: string }[];
}) => {
  const { setNodeRef } = useDroppable({ id });
//   console.log("id", id, "items:", items);
  return (
    <SortableContext
      strategy={verticalListSortingStrategy}
      id={id}
      items={items}
    >
      <div className=" m-2 w-20 border " ref={setNodeRef}>
        {items.map(({ id }) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
};

export default SortableContainer;
