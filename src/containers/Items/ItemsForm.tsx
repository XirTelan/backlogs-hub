"use client";
import InputField from "@/components/Common/UI/InputField";
import { BacklogItemCreationDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../../components/FieldsBlock";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { BacklogDTO } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { CgSpinner } from "react-icons/cg";

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
  const user = useSession();
  const [backlog, setBacklog] = useState<BacklogDTO>();
  const [fieldsTypeMap, setFieldsTypeMap] = useState<Map<string, string>>();
  const { handleSubmit, control, register } = useForm<BacklogItemCreationDTO>({
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
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <div className="field group  relative mt-2 w-1/2 px-0 py-4  ">
        <InputField
          id="title"
          placeholder="Title"
          label="Title"
          {...register("title", { required: true })}
        />
      </div>
      <div>
        {backlog.categories.map((category) => (
          <div key={category.name}>
            <label htmlFor={`radio_${category.name}`}>
              <input
                id={`radio_${category.name}`}
                type="radio"
                value={category.name.toLowerCase()}
                {...register("category")}
              />
              {category.name}
            </label>
          </div>
        ))}
      </div>
      <FieldsBlock status="disabled">
        <>
          {fieldsArray.fields.map((field, index) => (
            <li className="  w-auto" key={field.name}>
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
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
      <div className="w-1/4 ">
        <ButtonBase text="Create" type="submit" />
      </div>
    </form>
  );
};

export default ItemsForm;
