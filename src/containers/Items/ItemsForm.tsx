"use client";
import InputField from "@/components/Common/UI/InputField";
import { BacklogItemCreationDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../../components/FieldsBlock";
import { useRouter } from "next/navigation";
import { BacklogDTO } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { CgSpinner } from "react-icons/cg";
import Select from "@/components/Common/UI/Select";

const ItemsForm = <T extends BacklogItemCreationDTO>({
  backlogId,
  defaultValues,
  onSubmit,
}: {
  backlogId: string;
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
}) => {
  const router = useRouter();
  const [backlog, setBacklog] = useState<BacklogDTO>();
  const [fieldsTypeMap, setFieldsTypeMap] = useState<Map<string, string>>();
  const {
    handleSubmit,
    control,
    register,
    formState: { isValid, isSubmitting },
  } = useForm<BacklogItemCreationDTO>({
    defaultValues,
    mode: "onBlur",
  });
  const fieldsArray = useFieldArray({
    name: "userFields",
    control,
    rules: {},
  });

  useEffect(() => {
    if (!backlogId) return;
    const backlogData = async () => {
      const res = await fetch(`/api/backlogs/${backlogId}`);
      const data: BacklogDTO = await res.json();
      const mapFields = data.fields.reduce((mapAccumulator, obj) => {
        mapAccumulator.set(obj.name, obj.type);
        return mapAccumulator;
      }, new Map());
      setFieldsTypeMap(mapFields);
      setBacklog(data);
    };
    backlogData();
  }, [backlogId]);

  if (!backlog)
    return (
      <div className="flex w-full items-center justify-center">
        <div className=" animate-spin">
          <CgSpinner />
        </div>
      </div>
    );

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    onSubmit({ ...defaultValues, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
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
          options={backlog.categories.map((category) => category.name)}
          {...register("category")}
        />
      </div>
      <FieldsBlock title="Fields" status="disabled">
        <>
          {fieldsArray.fields.map((field, index) => (
            <li
              className={`${inputTypes[fieldsTypeMap?.get(field?.name)]}  w-auto`}
              key={field.name}
            >
              <InputField
                label={field.name}
                placeholder={field.name}
                type={fieldsTypeMap?.get(field.name)}
                {...register(`userFields.${index}.value`, {
                  required: false,
                })}
              />
            </li>
          ))}
        </>
      </FieldsBlock>

      <div className="flex w-1/4 flex-col gap-4 md:mt-4 ">
        <ButtonBase
          disabled={!isValid || isSubmitting}
          text="Create"
          type="submit"
        />
        <ButtonBase
          text="Cancel"
          variant="secondary"
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
  timer: "col-span-4",
};
