"use client";
import InputField from "@/components/Common/UI/InputField";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../../components/FieldsBlock";
import { useRouter } from "next/navigation";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Select from "@/components/Common/UI/Select";
import {
  BacklogCategory,
  BacklogItemCreationDTO,
  BacklogItemUserField,
  Field,
} from "@/zodTypes";
import { useCallback, useMemo } from "react";
import ProgressTimer from "@/components/Common/UI/ProgressTimer";

const ItemsForm = <T extends BacklogItemCreationDTO>({
  categories,
  fields,
  defaultValues,
  onSubmit,
}: {
  categories: BacklogCategory[];
  fields: Field[];
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
}) => {
  const router = useRouter();
  const mapFields: Map<string, Field> = useMemo(
    () =>
      fields.reduce((mapAccumulator, obj) => {
        mapAccumulator.set(obj.name, obj);
        return mapAccumulator;
      }, new Map()),
    [fields],
  );

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<BacklogItemCreationDTO>({
    defaultValues,
    mode: "onBlur",
  });
  const { fields: userFields } = useFieldArray({
    name: "userFields",
    control,
    rules: {},
  });

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    onSubmit({ ...defaultValues, ...data });
  };

  const getFieldInput = useCallback(
    (field: BacklogItemUserField, index: number) => {
      const backlogField = mapFields?.get(field.name);
      if (!backlogField) return <div>Error</div>;
      switch (backlogField.type) {
        case "timer":
          return (
            <ProgressTimer
              label={field.name}
              defaultValue={field.value}
              setValue={setValue as (name: string, val: string) => void}
              {...register(`userFields.${index}.value`, {
                required: false,
              })}
            />
          );
          break;
        case "text":
        case "number":
        case "date":
        default:
          return (
            <InputField
              label={field.name}
              placeholder={field.name}
              type={backlogField.type}
              {...register(`userFields.${index}.value`, {
                required: false,
              })}
            />
          );
        case "select":
          return (
            <Select
              label={field.name}
              options={backlogField.data || []}
              {...register(`userFields.${index}.value`, {
                required: false,
              })}
            />
          );
      }
    },
    [mapFields, register, setValue],
  );
  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 ">
        <div className="field group  relative mt-2 px-0 py-4 md:w-1/2  ">
          <InputField
            id="title"
            placeholder="Title"
            label="Title"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <Select
            label="Category"
            options={categories.map((category) => category.name)}
            {...register("category")}
          />
        </div>
      </div>
      <FieldsBlock title="Fields" status="disabled">
        <>
          {userFields.map((field, index) => (
            <li
              className={`${inputTypes[mapFields.get(field.name)?.type || "text"]}  w-auto`}
              key={index}
            >
              {getFieldInput(field, index)}
            </li>
          ))}
        </>
      </FieldsBlock>

      <div className="my-4 flex w-full flex-col md:w-1/4 md:gap-4 ">
        <ButtonBase
          disabled={!isValid || isSubmitting}
          text="Create"
          type="submit"
        />
        <ButtonBase
          text="Cancel"
          variant="secondary"
          type="button"
          onClick={() => router.back()}
        />
      </div>
    </form>
  );
};

export default ItemsForm;
const inputTypes = {
  text: "col-span-2",
  textArea: "col-span-4",
  date: "",
  number: "col-span-2",
  timer: "col-span-2 md:col-span-4",
  select: "col-span-2 ",
};
