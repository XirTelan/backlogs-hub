"use client";

import { BacklogItemCreationDTO } from "@/types";
import ItemsForm from "./ItemsForm";
import toast from "react-hot-toast";

const ItemsCreateForm = ({
  backlogId,
  defaultValues,
}: {
  backlogId: string;
  defaultValues: BacklogItemCreationDTO;
}) => {
  const onSubmit = async (data: BacklogItemCreationDTO) => {
    try {
      const res = await fetch(`/api/backlogs/${backlogId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("Created");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ItemsForm
        backlogId={backlogId}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ItemsCreateForm;
