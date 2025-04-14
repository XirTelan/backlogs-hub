import React, { ComponentType, Dispatch, SetStateAction } from "react";
import {
  CancelDrop,
  KeyboardCoordinateGetter,
  Modifiers,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortingStrategy } from "@dnd-kit/sortable";

import { z } from "zod";

import { Types } from "mongoose";
import { btnStyleVariants } from "../constants/styles";
import {
  FieldSchema,
  AccountSchema,
  ModifiersSchema,
  BacklogDTOSchema,
  BacklogFormSchema,
  BacklogCreationSchema,
  BacklogCategorySchema,
  BacklogItemSchema,
  BacklogItemPopUserFieldSchema,
  BacklogItemPopSchema,
  BacklogItemUserFieldSchema,
  BacklogItemCreationSchema,
  OauthSchema,
  UserBase,
  UserSchema,
  ConfigSchema,
  StatsSchema,
  LogDataSchema,
  LogDataDTOSchema,
  TemplateDTOSchema,
} from "../zodSchemas/zod";

export type ItemsFormBacklogProp = {
  backlogFields: Field[];
  modifiers: ModifiersType;
  categories: BacklogCategory[];
  tags?: Omit<BacklogCategory, "protected" | "order">[];
};

export type ItemsFormProps<T> = {
  backlog: ItemsFormBacklogProp;
  defaultValues: T;
  type: "edit" | "create";
  view?: "page" | "modal";
  btnCancel?: () => void;
};

export type ResponseData<T> = {
  message?: string;
} & (
  | {
      success: true;
      data: T;
      errors?: null;
    }
  | {
      success: false;
      data?: null;
      errors?: unknown;
    }
);

export type UserCreationDTO = Pick<UserDB, "username" | "email" | "provider">;

export type ButtonColorVariants = keyof typeof btnStyleVariants.colors;

export type ButtonBaseProps = {
  text?: string;
  hideText?: boolean;
  size?: "small" | "medium" | "large" | "elarge";
  icon?: React.ReactElement;
  children?: React.ReactNode;
  variant?: ButtonColorVariants;
  onlyVisual?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type DndData<T> = Record<string, T[]>;

export type RenderItemProps<T> = {
  item: T;
  isSortingContainer: boolean;
  containerId: UniqueIdentifier;
  index: number;
  handle: boolean;
  getIndex: (id: UniqueIdentifier) => number;
};
export type DndListProps<T> = {
  data: Record<string, { order: number; items: T[] }>;
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  coordinateGetter?: KeyboardCoordinateGetter;
  containersOptions?: {
    style?: React.CSSProperties;
    handle?: boolean;
    customTitle?: React.FC<{ id: string }>;
    CustomAction?: ComponentType;
  };
  itemCount?: number;
  items?: T;
  view?: "full" | "compact";
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;

  actions: {
    addAction?: (newValue: string) => void;
    saveStrategy: "manual" | "onChange";
    handleSave: (containers: UniqueIdentifier[], items: DndData<T>) => void;
  };
  renderItem?: (args: RenderItemProps<T>) => React.ReactNode;
};

export type SteamApp = {
  type: string;
  name: string;
  steam_appid: string;
  short_description: string;
  header_image: string;
  website: string;
  categories: {
    id: string;
    description: string;
  }[];
  screenshots: {
    id: string;
    path_thumbnail: string;
    path_full: string;
  }[];
  movies: {
    id: string;
    name: string;
    thumbnail: string;
    webm: {
      "480": string;
      max: string;
    };
    mp4: {
      "480": string;
      max: string;
    };
  }[];
  background: string;
};

export type ModalContextProps = {
  isOpen: boolean;
  key: string;
  data?: unknown;
  setOpen: () => void;
  setClose: () => void;
  toggle: () => void;
  setData: Dispatch<SetStateAction<unknown>>;
  setKey: Dispatch<SetStateAction<string>>;
};

export type UserPrefsProps = {
  userPrefs: ConfigType;
};

export type FieldWithId<T> = T & { id: string };

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

export type UserBase = z.infer<typeof UserBase>;
export type UserDB = z.infer<typeof UserSchema>;
export type UserDTO = Partial<Omit<UserDB, "_id"> & { _id: string }>;

export type TemplateDTO = z.infer<typeof TemplateDTOSchema>;

export type ConfigType = z.infer<typeof ConfigSchema>;
export type StatsType = z.infer<typeof StatsSchema>;

export type Log = z.infer<typeof LogDataSchema>;
export type LogDTO = z.infer<typeof LogDataDTOSchema>;

type Layer = 1 | 2 | 3;

export type InputBaseProps = {
  layer?: Layer;
  isError?: boolean;
  variant?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputFieldBaseProps = {
  layer?: Layer;
  helperText?: { message: string; type: "text" | "error" };
  variant?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputFieldProps = InputFieldBaseProps & {
  label?: React.ReactNode;
  error?: string;
  isSimple?: boolean;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export type SearchBar = {
  layer?: Layer;
  variant?: "small" | "medium" | "large";
} & React.HTMLProps<HTMLInputElement>;

export type TextArea = {
  label?: string;
  layer?: Layer;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type ListItemInput = {
  onDelete: () => void;
} & InputFieldProps;
