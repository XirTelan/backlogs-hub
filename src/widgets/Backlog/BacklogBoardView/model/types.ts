import { BacklogItemDTO } from "@/shared/model";

export type FormattedData = {
  backlogId: string;
  categories: string[];
  items: BacklogItemDTO[];
};
