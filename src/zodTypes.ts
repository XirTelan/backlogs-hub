import { z } from "zod";
import {
  BacklogCategorySchema,
  BacklogDTOSchema,
  BacklogFormSchema,
  FieldSchema,
} from "./zod";

export type BacklogFormData = z.infer<typeof BacklogFormSchema>;

export type Field = z.infer<typeof FieldSchema>;

export type BacklogCategory = z.infer<typeof BacklogCategorySchema>;

export type BacklogDTO = z.infer<typeof BacklogDTOSchema>;
