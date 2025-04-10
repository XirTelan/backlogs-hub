import { DndData } from "@/types";
import { BacklogItemDTO } from "@/zodTypes";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useCallback } from "react";
import { KeyedMutator } from "swr";
import { FormattedData } from "../types/types";
import { putBoard } from "../api/api";
import { toastCustom } from "@/lib/toast";

export function useSaveBacklogsOrder(
  backlogId: string,
  mutate: KeyedMutator<any>
) {
  async function saveBacklogs(
    containers: UniqueIdentifier[],
    data: DndData<BacklogItemDTO>
  ) {
    const dataFormatted: FormattedData = {
      backlogId: backlogId,
      categories: containers as string[],
      items: [],
    };
    Object.entries(data).forEach(([category, items]) => {
      if (items.length === 0) return;
      items.forEach((item, indx) => {
        item.category = category;
        item.modifiersFields = {
          ...item.modifiersFields,
          order: indx,
        };
        dataFormatted.items.push(item);
      });
    });

    try {
      const result = await putBoard(dataFormatted);
      if (result.success) {
        toastCustom.success("Saved");
        mutate();
      } else toastCustom.error(result.data ?? "Save error");
    } catch (error) {
      console.error(error);
    }
  }

  return useCallback(saveBacklogs, [backlogId, mutate]);
}
