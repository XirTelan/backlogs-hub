"use client";

import { BacklogItemCreationDTO } from "@/types";
import ItemsForm from "./ItemsForm";

const ItemsEditForm = ({
  backlogItemId,
  defaultValues,
}: {
  backlogItemId: string;
  defaultValues: BacklogItemCreationDTO;
}) => {
  const onSubmit = async (data: BacklogItemCreationDTO) => {
    try {
      const res = await fetch(`/api/backlogs/${backlogId}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ItemsForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </div>
  );
};

export default ItemsEditForm;
