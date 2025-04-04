"use client";
import { BacklogDTO, BacklogItemCreationDTO, BacklogItemDTO } from "@/zodTypes";
import React from "react";
import ItemsForm from "./ItemsForm";
import { ItemsFormProps } from "@/types";
import useSWR from "swr";
import { apiRoutesList } from "@/lib/routesList";
import { fetcher } from "@/utils";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";

export const EditItemForm = ({
  backlogInfo,
  itemId,
  options,
}: {
  backlogInfo: BacklogDTO;
  itemId: string;
  options?: Partial<ItemsFormProps<BacklogItemCreationDTO>>;
}) => {
  const url = `${apiRoutesList.items}/${itemId}`;
  const { data, isLoading } = useSWR<{
    status?: "success";
    data: BacklogItemDTO;
  }>(url, fetcher);

  if (isLoading) return <LoadingAnimation />;

  if (!data?.status) return;

  const { data: itemData } = data;

  const seen = new Set();
  itemData.userFields.forEach((field) => {
    seen.add(field.backlogFieldId);
  });

  const defaultValues = {
    ...itemData,
    backlogId: backlogInfo._id,
    userFields: [
      ...itemData.userFields,
      ...(backlogInfo.fields
        ?.filter((field) => !seen.has(field._id))
        .map((field) => ({
          backlogFieldId: field._id || "",
          value: field.type === "select" ? field.data[0] : "",
        })) ?? []),
    ],
  };

  return (
    <ItemsForm
      backlog={{
        backlogFields: backlogInfo.fields || [],
        categories: backlogInfo.categories,
        modifiers: backlogInfo.modifiers,
        tags: backlogInfo.tags,
      }}
      defaultValues={defaultValues}
      view="modal"
      type="edit"
      {...options}
    />
  );
};
