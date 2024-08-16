import { BacklogDTO, BacklogItemCreationDTO } from "@/zodTypes";
import React from "react";
import ItemsForm from "./ItemsForm";
import { ItemsFormProps } from "@/types";

export const CreateItemForm = ({
  backlogInfo,
  options,
}: {
  backlogInfo: BacklogDTO;
  options?: Partial<ItemsFormProps<BacklogItemCreationDTO>>;
}) => {
  const defaultValues: BacklogItemCreationDTO = {
    backlogId: backlogInfo._id,
    title: "",
    category: backlogInfo.categories[0].name || "",
    userFields: !backlogInfo.fields
      ? []
      : backlogInfo.fields.map((field) => ({
          backlogFieldId: field._id || "",
          value: field.type === "select" ? field.data[0] : "",
        })),
    modifiersFields: {},
  };

  return (
    <ItemsForm
      backlog={{
        backlogFields: backlogInfo.fields || [],
        categories: backlogInfo.categories,
        modifiers: backlogInfo.modifiers,
      }}
      defaultValues={defaultValues}
      type="create"
      view="modal"
      {...options}
    />
  );
};
