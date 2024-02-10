"use client";

import ColorPallete from "@/components/Common/ColorPallete";
import InputField from "@/components/Common/InputField";
import React from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { RiDeleteBack2Line } from "react-icons/ri";
import FieldsBlock from "../FieldsBlock";
import { BacklogFormData } from "@/types";

const BacklogForm = <T extends BacklogFormData>({
  defaultValues,
  onSubmit,
}: {
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
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

  const onSubmitInternal = (data: BacklogFormData) =>
    onSubmit({ ...defaultValues, ...data });

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <div className="field group relative my-4  w-full rounded border border-neutral-800 bg-neutral-900 px-2 py-2 ">
        <InputField
          id="backlogTitle"
          placeholder="Backlog title"
          label="Backlog title"
          {...register(`backlogTitle`, { required: true })}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-4 ">
        <FieldsBlock
          title="Categories"
          status="active"
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
          status="active"
          append={() => fieldsArray.append({ name: "", type: "text" })}
        >
          <>
            <li>
              <InputField name="asd" value={"Title"} disabled />
            </li>
            {fieldsArray.fields.map((item, index) => (
              <li key={item.id} className="flex items-center  gap-2">
                {/* {item.name=='Title' ? } */}
                <InputField
                  placeholder="Field name"
                  {...register(`fields.${index}.name`)}
                />
                <select
                  className="rounded bg-neutral-800 p-2"
                  {...register(`fields.${index}.type`)}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                </select>
                <button onClick={() => fieldsArray.remove(index)}>
                  {" "}
                  <RiDeleteBack2Line size={24} />
                </button>
              </li>
            ))}
          </>
        </FieldsBlock>
      </div>

      <div className="flex justify-center">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default BacklogForm;
