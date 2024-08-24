import { FieldError } from "react-hook-form";
import { BacklogCategory, Field, UserDTO } from "./zodTypes";
import { buttonColorVariants } from "./lib/styles";
import React from "react";
type Layer = 1 | 2 | 3;

export type InputFieldProps = {
  label?: React.ReactNode;
  layer?: Layer;
  error?: string;
  helperText?: { message: string; type: "text" | "error" };
  variant?: "small" | "medium" | "large";
  isSimple?: boolean;
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
  children?: React.ReactElement;
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  index: number;
  title: string;
  handle: boolean;
  disabled?: boolean;
  style(args: unknown): React.CSSProperties;
  getIndex(id: UniqueIdentifier): number;
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

export type ButtonColorVariants = keyof typeof buttonColorVariants;

export type ButtonBaseProps = {
  text?: string;
  hideText?: boolean;
  size?: "small" | "medium" | "large" | "elarge";
  icon?: React.ReactElement;
  children?: React.ReactNode;
  variant?: keyof typeof buttonColorVariants;
  onlyVisual?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type DndListProps = {
  data: DndData;
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
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
