"use client";

import ItemsForm from "./ItemsForm";
import { useRouter } from "next/navigation";
import { toastCustom } from "@/lib/toast";
import { BacklogCategory, BacklogItemCreationDTO, Field } from "@/zodTypes";

const ItemsCreateForm = ({
  backlog,
  defaultValues,
}: {
  backlog: { fields: Field[]; categories: BacklogCategory[] };
  defaultValues: BacklogItemCreationDTO;
}) => {
  const router = useRouter();
  const onSubmit = async (data: BacklogItemCreationDTO) => {
    try {
      const res = await fetch(`/api/items`, {
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

      <ItemsForm
        categories={backlog.categories}
        fields={backlog.fields}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ItemsCreateForm;
