import { FieldError } from "react-hook-form";
import { BacklogCategory, Field, UserDTO } from "./zodTypes";
import { ButtonColorVariants } from "./components/Common/UI/ButtonBase";
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
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type ItemsFormBacklogProp = {
  backlogFields: Field[];
  modifiers: ModifiersType;
  categories: BacklogCategory[];
};

export type ItemsFormProps<T> = {
  backlog: ItemsFormBacklogProp;
  mapFields: Map<string, string>;
  defaultValues: T;
  type: "edit" | "create";
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

export type ButtonBaseProps = {
  children?: React.ReactElement;
  text?: string;
  hideText?: boolean;
  size?: "small" | "medium" | "large" | "elarge";
  icon?: React.ReactElement;
  variant?: ButtonColorVariants;
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
