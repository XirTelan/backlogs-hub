import { FieldError } from "react-hook-form";
import { BacklogCategory } from "./zodTypes";
import { Field } from "./zodTypes";
import React from "react";

export type InputField = {
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
  activeBacklog: string;
  backlogSlug: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ListItemInput = {
  onDelete: () => void;
} & InputField;

export type BacklogCreationDTO = Omit<
  BacklogDTO,
  "_id" | "updatedAt" | "createdAt"
>;

type ItemField = {
  name: string;
  value: string;
};

export type BacklogItemCreationDTO = {
  title: string;
  category: string;
  userFields: ItemField[];
};

export type BacklogItemDTO = {
  _id: string;
  backlogId: string;
} & BacklogItemCreationDTO;

export type TemplateDTO = {
  _id: string;
} & TemplateCreationDTO;

export type TemplateCreationDTO = {
  templateTitle: string;
  fields: Field[];
  description: string;
  features: string;
  categories: BacklogCategory[];
  author: string;
  visibility: string;
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

export type UserDTO = {
  id: string;
  username: string;
  email: string;
  profileVisibility: string;
};

export type UserCreationDTO = {
  password?: string;
  folders?: string[];
} & Omit<UserDTO, "id">;

export type ButtonBaseProps = {
  children?: React.ReactElement;
  text?: string;
  size?: "small" | "medium" | "large";
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
