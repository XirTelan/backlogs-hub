import { BacklogItemDTO } from "@/zodTypes";

export type FormattedData = {
  backlogId: string;
  categories: string[];
  items: BacklogItemDTO[];
};
