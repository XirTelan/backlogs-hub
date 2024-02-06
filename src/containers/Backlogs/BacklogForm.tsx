"use client";

import ColorPallete from "@/components/ColorPallete";
import InputField from "@/components/InputField";
import React from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { RiDeleteBack2Line } from "react-icons/ri";
import FieldsBlock from "../FieldsBlock";
import ListItemInput from "../ListItemInput";
import { BacklogFormData } from "@/types";

const BacklogForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: BacklogFormData;
  onSubmit: SubmitHandler<BacklogFormData>;
}) => {
  const { register, handleSubmit, control } = useForm<BacklogFormData>({
    defaultValues,
    mode: "onBlur",
  });

  const fieldsArray = useFieldArray({
    name: "fields",
    control,
    rules: {},
  });

  const categoriesArray = useFieldArray({
    name: "categories",
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field group  relative mt-2 w-1/2 px-0 py-4  ">
        <InputField
          id="backlogTitle"
          placeholder="Backlog title"
          label="Backlog title"
          {...register(`backlogTitle`)}
        />
      </div>
      <FieldsBlock
        title="Categories"
        append={() => categoriesArray.append({ name: "", color: "#00ff00" })}
      >
        <>
          {categoriesArray.fields.map((item, index) => (
            <li className="flex items-center gap-2" key={item.id}>
              <div className=" text-sm text-neutral-500">{index + 1}</div>
              <Controller
                control={control}
                name={`categories.${index}.color`}
                render={({ field: { onChange, value } }) => (
                  <ColorPallete onChange={onChange} value={value} />
                )}
              />
              <InputField
                id={`category_${index}`}
                placeholder="Category name"
                {...register(`categories.${index}.name`)}
              />
              <div className="flex">
                <button
                  className="right-8  font-bold hover:text-red-800 active:text-red-600 "
                  onClick={() => {
                    categoriesArray.remove(index);
                  }}
                >
                  <RiDeleteBack2Line size={24} />
                </button>
              </div>
            </li>
          ))}
        </>
      </FieldsBlock>
      <FieldsBlock
        title="Backlog fields"
        append={() => fieldsArray.append({ name: "Custom", type: "text" })}
      >
        <>
          {fieldsArray.fields.map((item, index) => (
            <li key={item.id}>
              {/* {item.name=='Title' ? } */}
              <ListItemInput
                onDelete={() => fieldsArray.remove(index)}
                disabled={item.name === "Title"}
                {...register(`fields.${index}.name`)}
              />
            </li>
          ))}
        </>
      </FieldsBlock>
      <div className="flex justify-center">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default BacklogForm;
