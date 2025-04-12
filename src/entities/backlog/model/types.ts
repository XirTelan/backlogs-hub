import { BacklogCategory, BacklogFormData, Field } from "@/zodTypes";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";

export type FieldsBlockProps = {
  errors?:
    | (FieldError &
        ((FieldError & FieldErrorsImpl<Field | BacklogCategory>) | undefined)[])
    | undefined;

  control: Control<BacklogFormData>;
  register: UseFormRegister<BacklogFormData>;
};
