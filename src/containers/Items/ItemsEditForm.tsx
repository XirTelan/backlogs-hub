"use client";

import { BacklogItemDTO } from "@/types";
import ItemsForm from "./ItemsForm";
import { toastCustom } from "@/lib/toast";

const ItemsEditForm = ({
  defaultValues,
}: {
  defaultValues: BacklogItemDTO;
}) => {
  const onSubmit = async (data: BacklogItemDTO) => {
    try {
      const res = await fetch(
        `/api/backlogs/${defaultValues.backlogId}/items/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (res.ok) {
        toastCustom.success("Saved");
      } else {
        toastCustom.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ItemsForm
      backlogId={defaultValues.backlogId}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default ItemsEditForm;
