"use client";

import { BacklogItemDTO } from "@/types";
import ItemsForm from "./ItemsForm";
import toast from "react-hot-toast";

const ItemsEditForm = ({
  backlogId,
  defaultValues,
}: {
  backlogId: string;
  defaultValues: BacklogItemDTO;
}) => {
  const onSubmit = async (data: BacklogItemDTO) => {
    try {
      const res = await fetch(`/api/backlogs/${backlogId}/items/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Saved");
      } else {
        toast.error(res.statusText);
      }
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

export default ItemsEditForm;
