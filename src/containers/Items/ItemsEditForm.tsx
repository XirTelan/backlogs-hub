"use client";

import { BacklogItemDTO } from "@/types";
import ItemsForm from "./ItemsForm";
import { toastCustom } from "@/lib/toast";
import { BacklogCategory, Field } from "@/zodTypes";
import { useRouter } from "next/navigation";

const ItemsEditForm = ({
  backlog,
  defaultValues,
}: {
  backlog: { fields: Field[]; categories: BacklogCategory[] };
  defaultValues: BacklogItemDTO;
}) => {
  const router = useRouter();
  const onSubmit = async (data: BacklogItemDTO) => {
    try {
      const res = await fetch(`/api/items/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toastCustom.success("Saved");
        router.back();
      } else {
        toastCustom.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ItemsForm
        categories={backlog.categories}
        fields={backlog.fields}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ItemsEditForm;
