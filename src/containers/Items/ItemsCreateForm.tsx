"use client";

import { BacklogItemCreationDTO } from "@/types";
import ItemsForm from "./ItemsForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ItemsCreateForm = ({
  backlogId,
  defaultValues,
}: {
  backlogId: string;
  defaultValues: BacklogItemCreationDTO;
}) => {
  const router = useRouter();
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
      
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ItemsForm
        backlogId={backlogId}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ItemsCreateForm;
