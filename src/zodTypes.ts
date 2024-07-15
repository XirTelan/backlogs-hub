import { z } from "zod";
import {
  AccountSchema,
  BacklogCategorySchema,
  BacklogCreationSchema,
  BacklogDTOSchema,
  BacklogFormSchema,
  BacklogItemCreationSchema,
  BacklogItemSchema,
  BacklogItemUserFieldSchema,
  ConfigSchema,
  DndDataSchema,
  FieldSchema,
  OauthSchema,
  StatsSchema,
  TemplateDTOSchema,
  UserBase,
  UserSchema,
} from "./zod";
import { Types } from "mongoose";

export type Field = z.infer<typeof FieldSchema>;

export type AccountType = { userId: Types.ObjectId } & z.infer<
  typeof AccountSchema
>;
export type BacklogDTO = z.infer<typeof BacklogDTOSchema>;
export type BacklogFormData = z.infer<typeof BacklogFormSchema>;
export type BacklogCreationDTO = z.infer<typeof BacklogCreationSchema>;
export type BacklogCategory = z.infer<typeof BacklogCategorySchema>;

export type BacklogItemDTO = z.infer<typeof BacklogItemSchema>;
export type BacklogItemUserField = z.infer<typeof BacklogItemUserFieldSchema>;
export type BacklogItemCreationDTO = z.infer<typeof BacklogItemCreationSchema>;

export type OAuthProps = z.infer<typeof OauthSchema>;

export type TemplateDTO = z.infer<typeof TemplateDTOSchema>;

export type DndData = z.infer<typeof DndDataSchema>;
export type UserBase = z.infer<typeof UserBase>;
export type UserDTO = z.infer<typeof UserSchema>;
export type ConfigType = z.infer<typeof ConfigSchema>;
export type StatsType = z.infer<typeof StatsSchema>;
