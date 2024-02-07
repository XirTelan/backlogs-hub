"use client";
import InputField from "@/components/InputField";
import { BacklogDTO, BacklogItemCreationDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../FieldsBlock";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";



const ItemsForm = () => {
  const { user } = useUser();
  const backlogTitle = useSearchParams().get("backlogTitle");
  const [backlog, setBacklog] = useState<BacklogDTO>();

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
  useEffect(() => {
    if (!backlog) return;
    reset({
      title: "",
      category: backlog.categories[0].name || "",
      userFields: backlog.fields.map((field) => ({
        name: field.name,
        value: "",
      })),
    });
  }, [backlog]);

  const defaultValues: BacklogItemCreationDTO = {
    title: "",
    category: "",
    userFields: [],
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`/api/backlogs/${backlog._id}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { handleSubmit, control, register, reset } =
    useForm<BacklogItemCreationDTO>({
      defaultValues,
      mode: "onBlur",
    });

  const fieldsArray = useFieldArray({
    name: "userFields",
    control,
    rules: {},
  });

  const handleFieldType = (
    field: {
      name: string;
      type: "number" | "text";
    },
    index: number,
  ) => {
    if (field.name === "Title") return;
    switch (field.type) {
      case "text":
        return (
          <input
            key={field.name}
            type="text"
            {...register(`userFields.${index}.value`)}
          />
        );
      case "number":
        return <input key={field.name} type="number" />;
    }
  };

  if (!backlog) return <div>Loading</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field group  relative mt-2 w-1/2 px-0 py-4  ">
          <InputField
            id="title"
            placeholder="Title"
            label="Title"
            {...register(`title`)}
          />
        </div>
        <div>
          {backlog.categories.map((cartegory) => (
            <div key={cartegory.name}>
              <input
                id={`radio_${cartegory.name}`}
                type="radio"
                value={cartegory.name}
                {...register("category")}
              />
              <label htmlFor={`radio_${cartegory.name}`}>
                {cartegory.name}
              </label>
            </div>
          ))}
        </div>
        <FieldsBlock status="disabled">
          <>
            {backlog.fields.map(handleFieldType)}

            {/* {fieldsArray.fields.map((item, index) => (
              <li key={item.id}>
                <ListItemInput
                  onDelete={() => fieldsArray.remove(index)}
                  disabled={item.name === "Title"}
                  {...register(`userFields.${index}.name`)}
                />
              </li>
            ))} */}
          </>
        </FieldsBlock>
        <button type="submit">Crate</button>
      </form>
    </div>
  );
};

export default ItemsForm;
