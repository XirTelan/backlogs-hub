import { z } from "zod";
import {
  BacklogCategorySchema,
  BacklogCreationSchema,
  BacklogDTOSchema,
  BacklogFormSchema,
  BacklogItemCreationSchema,
  BacklogItemSchema,
  ConfigSchema,
  DndDataSchema,
  FieldSchema,
  TemplateDTOSchema,
  UserSchema,
} from "./zod";

export type Field = z.infer<typeof FieldSchema>;

export type BacklogDTO = z.infer<typeof BacklogDTOSchema>;
export type BacklogFormData = z.infer<typeof BacklogFormSchema>;
export type BacklogCreationDTO = z.infer<typeof BacklogCreationSchema>;
export type BacklogCategory = z.infer<typeof BacklogCategorySchema>;

export type BacklogItemDTO = z.infer<typeof BacklogItemSchema>;
export type BacklogItemCreationDTO = z.infer<typeof BacklogItemCreationSchema>;

export type TemplateDTO = z.infer<typeof TemplateDTOSchema>;

export type DndData = z.infer<typeof DndDataSchema>;

export type UserDTO = z.infer<typeof UserSchema>;
export type ConfigType = z.infer<typeof ConfigSchema>;
