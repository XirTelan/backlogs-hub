"use client";
import InputField from "@/components/InputField";
import ListItemInput from "@/containers/ListItemInput";
import { auth, useUser } from "@clerk/nextjs";
import { IoIosAddCircleOutline } from "react-icons/io";

import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

type FormData = {
  userId: string;
  backlogTitle: string;
  categories: { category: string }[];
  fields: {
    name: string;
    type: "text" | "number";
  }[];
};

const CreateBacklog = () => {
  const { user } = useUser();
  const router = useRouter();
  const defaultCategories = [
    { category: "Completed" },
    { category: "Playing" },
    { category: "Backlog" },
    { category: "Retired" },
  ];
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      userId: user?.id,
      backlogTitle: "",
      categories: defaultCategories,
      fields: [
        {
          name: "Title",
          type: "text",
        },
      ],
    },
    mode: "onBlur",
  });

  const fieldsArray = useFieldArray({
    name: "fields",
    control,
  });

  const categoriesArray = useFieldArray({
    name: "categories",
    control,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("cur user", user?.id);
    if (user) data.userId = user?.id;

    console.log("data", data);
    const res = await fetch("/api/backlogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Backlog Name"
          {...register("backlogTitle", { required: true })}
        />

        <ul>
          {categoriesArray.fields.map((item, index) => (
            <li key={item.id}>
              <ListItemInput
                onDelete={() => categoriesArray.remove(index)}
                {...register(`categories.${index}.category`)}
              />
            </li>
          ))}
        </ul>
        <div className="my-4 flex w-full items-center gap-1">
          <div className="h-0.5 w-1/2 bg-slate-500" />
          <button
            type="button"
            className=" hover:text-purple-800"
            onClick={() => categoriesArray.append({ category: "" })}
          >
            <IoIosAddCircleOutline size={28} />
          </button>
          <div className="h-0.5 w-1/2 bg-slate-500" />
        </div>
        <p>Backlog Fields</p>
        <ul>
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
        </ul>
        <button
          type="button"
          onClick={() => fieldsArray.append({ name: "Custom", type: "text" })}
        >
          +
        </button>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default CreateBacklog;
