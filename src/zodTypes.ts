import { z } from "zod";
import {
  BacklogCategorySchema,
  BacklogCreationSchema,
  BacklogDTOSchema,
  BacklogFormSchema,
  ConfigSchema,
  DndDataSchema,
  FieldSchema,
  TemplateDTOSchema,
  UserSchema,
} from "./zod";

export type BacklogFormData = z.infer<typeof BacklogFormSchema>;

export type Field = z.infer<typeof FieldSchema>;

export type BacklogCategory = z.infer<typeof BacklogCategorySchema>;

export type BacklogDTO = z.infer<typeof BacklogDTOSchema>;
export type TemplateDTO = z.infer<typeof TemplateDTOSchema>;
export type DndData = z.infer<typeof DndDataSchema>;
export type ConfigType = z.infer<typeof ConfigSchema>;
export type UserDTO = z.infer<typeof UserSchema>;
export type BacklogCreationDTO = z.infer<typeof BacklogCreationSchema>;
