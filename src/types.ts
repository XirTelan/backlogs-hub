import {
  BacklogCategory,
  ModifiersType,
  Field,
  UserDB,
  ConfigType,
} from "./zodTypes";
import { btnStyleVariants } from "./shared/lib/styles";
import React, { ComponentType, Dispatch, SetStateAction } from "react";
import {
  CancelDrop,
  KeyboardCoordinateGetter,
  Modifiers,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortingStrategy } from "@dnd-kit/sortable";

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

export type ColorRGB = { r: number; g: number; b: number };
export type ColorPickerValue = {
  color: ColorRGB;
  pos: [number, number];
  initiator: "init" | "pointer" | "input" | "hueChange";
};

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
