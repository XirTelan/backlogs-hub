"use client";

import { BacklogItemCreationDTO } from "@/types";
import ItemsForm from "./ItemsForm";
import { useRouter } from "next/navigation";
import Title from "@/components/Common/Title";
import { toastCustom } from "@/lib/toast";

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
      if (res.ok) {
        toastCustom.success("Created");
        router.back();
      } else {
        const error = await res.json();
        toastCustom.error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Title style={{ marginLeft: "1rem" }} title={"Add new item to "} />
      <ItemsForm
        backlogId={backlogId}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ItemsCreateForm;
