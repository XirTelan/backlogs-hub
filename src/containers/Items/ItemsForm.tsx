"use client";
import InputField from "@/components/InputField";
import { BacklogDTO, BacklogItemCreationDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../FieldsBlock";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const ItemsForm = <T extends BacklogItemCreationDTO>({
  defaultValues,
  onSubmit,
}: {
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
}) => {
  const { user } = useUser();
  const backlogTitle = useSearchParams().get("backlogTitle");
  const [backlog, setBacklog] = useState<BacklogDTO>();
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
    if (!backlogTitle || !user) return;
    const backlogData = async () => {
      const res = await fetch(
        `/api/backlogs?userName=${user.username}&backlogTitle=${backlogTitle}`,
      );
      const data = await res.json();
      setBacklog(data);
    };
    backlogData();
  }, [user, backlogTitle]);

  if (!backlog) return <div>Loading</div>;

  const onSubmitInternal = (data: BacklogItemCreationDTO) =>
    onSubmit({ ...defaultValues, ...data });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitInternal)}>
        <div className="field group  relative mt-2 w-1/2 px-0 py-4  ">
          <InputField
            id="title"
            placeholder="Title"
            label="Title"
            {...(register(`title`), { required: true })}
          />
        </div>
        <div>
          {backlog.categories.map((cartegory) => (
            <div key={cartegory.name}>
              <label htmlFor={`radio_${cartegory.name}`}>
                <input
                  id={`radio_${cartegory.name}`}
                  type="radio"
                  value={cartegory.name}
                  {...register("category")}
                />
                {cartegory.name}
              </label>
            </div>
          ))}
        </div>
        <FieldsBlock status="disabled">
          <>
            {backlog.fields.map((field, index) => (
              <li className="  w-auto" key={field.name}>
                <InputField
                  label={field.name}
                  placeholder={field.name}
                  type={field.type}
                  {...register(`userFields.${index}.value`, {
                    required: false,
                  })}
                />
              </li>
            ))}
          </>
        </FieldsBlock>
        <button type="submit">Crate</button>
      </form>
    </div>
  );
};

export default ItemsForm;
