import { BacklogItemDTO } from "@/shared/types";

export type FormattedData = {
  backlogId: string;
  categories: string[];
  items: BacklogItemDTO[];
};
