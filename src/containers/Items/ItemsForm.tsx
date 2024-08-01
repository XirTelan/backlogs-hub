"use client";
import InputField from "@/components/Common/UI/InputField";
import { useForm } from "react-hook-form";
import FieldsBlock from "../../components/FieldsBlock";
import { useRouter } from "next/navigation";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Select from "@/components/Common/UI/Select";
import { BacklogCategory, BacklogItemCreationDTO, Field } from "@/zodTypes";
import { useCallback } from "react";
import ProgressTimer from "@/containers/Fields/ProgressTimer";
import { toastCustom } from "@/lib/toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import MarkdownEditor from "../Fields/MarkdownEditor";

const ItemsForm = <T extends BacklogItemCreationDTO>({
  categories,
  backlogFields,
  mapFields,
  defaultValues,
  type,
}: {
  categories: BacklogCategory[];
  backlogFields: Field[];
  mapFields: Map<string, string>;
  defaultValues: T;
  type: "edit" | "create";
}) => {
  const router = useRouter();

  const onSubmit = useCallback(
    async (
      data: BacklogItemCreationDTO & { _id?: string },
      type: "edit" | "create",
      router: AppRouterInstance,
    ) => {
      try {
        const url = `/api/items${type === "edit" ? `/${data._id}` : ""}`;
        const res = await fetch(url, {
          method: type === "edit" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          toastCustom.success("Saved");
          router.back();
        } else {
          const error = await res.json();
          console.error(error);
          toastCustom.error(res.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<BacklogItemCreationDTO>({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    onSubmit(
      {
        ...defaultValues,
        ...data,
      },
      type,
      router,
    );
  };

  const getFieldInput = useCallback(
    (field: Field, index: number) => {
      const fieldValue = mapFields?.get(field._id || "") || "";
      switch (field.type) {
        case "timer":
          return (
            <ProgressTimer
              layer={2}
              label={field.name}
              defaultValue={fieldValue}
              setValue={setValue as (name: string, val: string) => void}
              {...register(`userFields.${index}.value`, {
                required: false,
              })}
            />
          );
          break;
        case "markdown":
          return (
            <MarkdownEditor
              defaultValue={fieldValue}
              setValue={setValue as (name: string, val: string) => void}
              {...register(`userFields.${index}.value`, {
                required: false,
              })}
            />
          );
          break;
        case "select":
          return (
            <Select
              layer={2}
              label={field.name}
              options={field.data || []}
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
              layer={2}
              label={field.name}
              placeholder={field.name}
              type={field.type}
              {...register(`userFields.${index}.value`, {
                required: false,
              })}
            />
          );
          break;
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
      {backlogFields.length > 0 && (
        <FieldsBlock title="Fields" status="disabled">
          <>
            {backlogFields.map((field, index) => {
              return (
                <li
                  className={`${inputTypes[field.type || "text"]}  w-auto bg-layer-1 p-2 `}
                  key={index}
                >
                  {getFieldInput(field, index)}
                </li>
              );
            })}
          </>
        </FieldsBlock>
      )}

      <div className="my-4 flex w-full flex-col md:w-1/4 md:gap-4 ">
        <ButtonBase
          disabled={!isValid || isSubmitting}
          text={type === "create" ? "Create" : "Save"}
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

const inputTypes: Record<Field["type"], string> = {
  text: "col-span-2",
  markdown: "col-span-4",
  date: "",
  number: "col-span-2",
  timer: "col-span-2 md:col-span-4",
  select: "col-span-2 ",
};
