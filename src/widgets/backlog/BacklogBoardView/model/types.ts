import { BacklogItemDTO } from "@/shared/model/";

export type FormattedData = {
  backlogId: string;
  categories: string[];
  items: BacklogItemDTO[];
};

export type Responce = {
  [k: string]: {
    order: number;
    items: BacklogItemDTO[];
  };
};
