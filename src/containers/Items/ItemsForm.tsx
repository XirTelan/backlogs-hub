"use client";
import InputField from "@/components/Common/InputField";
import { BacklogDTO, BacklogItemCreationDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../FieldsBlock";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  const { user } = useUser();
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
    if (!backlogId || !user) return;
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
  }, [user, backlogId]);

  if (!backlog) return <div>Loading</div>;

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    onSubmit({ ...defaultValues, ...data });
    router.back();
  };

  return (
    <div>
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
        <button type="submit">Crate</button>
      </form>
    </div>
  );
};

export default ItemsForm;
