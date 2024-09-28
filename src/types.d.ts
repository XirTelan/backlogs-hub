import { FieldError } from "react-hook-form";
import {
  BacklogCategory,
  ModifiersType,
  Field,
  UserDTO,
  DndData,
  ConfigType,
} from "./zodTypes";
import { btnStyleVariants } from "./lib/styles";
import React, { ComponentPropsWithRef, ComponentType, ReactNode } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
type Layer = 1 | 2 | 3;

export type InputFielBasedProps = {
  layer?: Layer;
  helperText?: { message: string; type: "text" | "error" };
  variant?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputFieldProps = InputFielBasedProps & {
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

export type TextArea = {
  label?: string;
  layer?: Layer;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type BacklogNavProps = {
  activeBacklog: boolean;
  backlogSlug: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ListItemInput = {
  onDelete: () => void;
} & InputFieldProps;

export type SortableItemProps = {
  children?: React.ReactNode | ReactNode[];
  id: UniqueIdentifier;
  index: number;
  title: string;
  handle: boolean;
  handpleProps?: ComponentPropsWithRef<"button">;
  disabled?: boolean;
  style?: React.CSSProperties;
  renderItem?: () => React.ReactElement;
};

export type FieldsBlockProps = {
  errors?:
    | Merge<
        FieldError,
        (
          | Merge<FieldError, FieldErrorsImpl<Field | BacklogCategory>>
          | undefined
        )[]
      >
    | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<BacklogFormData, any>;
  register: UseFormRegister<BacklogFormData>;
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

export type UserCreationDTO = Pick<UserDTO, "username" | "email" | "provider">;

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

type RenderItemProps = {
  item: T;
  isSortingContainer: boolean;
  containerId: UniqueIdentifier;
  index;
  handle: boolean;
  getIndex;
};
export type DndListProps<T> = {
  data: Record<string, { order: number; items: T[] }>;
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  coordinateGetter?: KeyboardCoordinateGetter;
  containersOptions?: {
    style?: React.CSSProperties;
    handle?: boolean;
    customTitle?: (id: string) => React.ReactNode | React.ReactNode[];
    CustomAction?: ComponentType;
  };
  itemCount?: number;
  items?: Items;
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
  renderItem?: (args: RenderItemProps) => React.ReactNode;
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
