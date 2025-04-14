import { BacklogCategory, BacklogFormData, Field } from "@/shared/model";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

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

  control: Control<BacklogFormData>;
  register: UseFormRegister<BacklogFormData>;
};
