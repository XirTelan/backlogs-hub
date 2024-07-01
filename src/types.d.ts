import { FieldError } from "react-hook-form";
import { BacklogCategory, Field, UserDTO } from "./zodTypes";
import React from "react";

export type InputFieldProps = {
  label?: string;
  layer?: 1 | 2 | 3;
  error?: string;
  helperText?: { message: string; type: "text" | "error" };
  variant?: "small" | "medium" | "large";
  isSimple?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type SearchBar = {
  layer?: 1 | 2 | 3;
  variant?: "small" | "medium" | "large";
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextArea = {
  label?: string;
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
      isSuccess: true;
      data: T;
      errors?: null;
    }
  | {
      isSuccess: false;
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
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "dangerPrimary"
    | "dangerTertiary"
    | "dangerGhost";
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
