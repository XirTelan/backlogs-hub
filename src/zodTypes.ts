import { z } from "zod";
import {
  AccountSchema,
  BacklogCategorySchema,
  BacklogCreationSchema,
  BacklogDTOSchema,
  BacklogFormSchema,
  BacklogItemCreationSchema,
  BacklogItemPopSchema,
  BacklogItemPopUserFieldSchema,
  BacklogItemSchema,
  BacklogItemUserFieldSchema,
  ConfigSchema,
  FieldSchema,
  LogDataDTOSchema,
  LogDataSchema,
  ModifiersSchema,
  NewsSchema,
  OauthSchema,
  StatsSchema,
  TemplateDTOSchema,
  UserBase,
  UserSchema,
} from "./zod";
import { Types } from "mongoose";
import { SteamApp } from "./types";

export type Field = z.infer<typeof FieldSchema>;

export type AccountType = { userId: Types.ObjectId } & z.infer<
  typeof AccountSchema
>;
export type ModifiersType = z.infer<typeof ModifiersSchema>;
export type BacklogDTO = z.infer<typeof BacklogDTOSchema>;
export type BacklogFormData = z.infer<typeof BacklogFormSchema>;
export type BacklogCreationDTO = z.infer<typeof BacklogCreationSchema>;
export type BacklogCategory = z.infer<typeof BacklogCategorySchema>;

export type BacklogItemDTO = z.infer<typeof BacklogItemSchema>;
export type BacklogItemPopUserField = z.infer<
  typeof BacklogItemPopUserFieldSchema
>;
export type BacklogItemPopulated = z.infer<typeof BacklogItemPopSchema>;
export type BacklogItemWithSteamInfo = {
  modifiersFields: {
    steamAppId: string;
  };
  steamData: SteamApp;
} & BacklogItemPopulated;
export type BacklogItemUserField = z.infer<typeof BacklogItemUserFieldSchema>;
export type BacklogItemCreationDTO = z.infer<typeof BacklogItemCreationSchema>;
export type OAuthProps = z.infer<typeof OauthSchema>;

export type TemplateDTO = z.infer<typeof TemplateDTOSchema>;

export type UserBase = z.infer<typeof UserBase>;
export type UserDB = z.infer<typeof UserSchema>;
export type UserDTO = Partial<Omit<UserDB, "_id"> & { _id: string }>;
export type ConfigType = z.infer<typeof ConfigSchema>;
export type StatsType = z.infer<typeof StatsSchema>;

export type Log = z.infer<typeof LogDataSchema>;
export type LogDTO = z.infer<typeof LogDataDTOSchema>;

export type NewsType = z.infer<typeof NewsSchema>;
