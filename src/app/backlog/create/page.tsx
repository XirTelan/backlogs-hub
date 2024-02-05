"use client";
import InputField from "@/components/InputField";
import ListItemInput from "@/containers/ListItemInput";
import { useUser } from "@clerk/nextjs";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useRouter } from "next/navigation";
import React from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { RiDeleteBack2Line } from "react-icons/ri";
import ColorPallete from "@/components/ColorPallete";

type FormData = {
  userId: string;
  userName: string;
  backlogTitle: string;
  categories: { name: string; color: string }[];
  fields: {
    name: string;
    type: "text" | "number";
  }[];
};

const CreateBacklog = () => {
  const { user } = useUser();
  const router = useRouter();
  const defaultCategories = [
    { name: "Completed", color: "#00ff00" },
    { name: "Playing", color: "#00ff00" },
    { name: "Backlog", color: "#00ff00" },
    { name: "Retired", color: "#00ff00" },
  ];
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      userId: user?.id,
      userName: user?.username || "",
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
    if (user) {
      data.userName = user.username!;
      data.userId = user?.id;
    }
    console.log(data);
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
        <div className="field group  relative mt-2 w-1/2 px-0 py-4  ">
          <input
            type="input"
            className=" peer w-full border-0 border-b border-b-neutral-600 bg-transparent px-0 py-2 outline-0 transition-colors placeholder:text-transparent"
            placeholder="backlogTitle"
            id="backlogTitle"
            required
            {...register(`backlogTitle`)}
          />
          <label
            htmlFor="backlogTitle"
            className=" absolute left-0 top-0 text-base  transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-xl  peer-focus:top-0 peer-focus:text-base peer-focus:transition-all peer-focus:duration-200"
          >
            Name
          </label>
        </div>
        <div className=" left-0 top-0  w-full  rounded-t border-t  border-green-700 bg-green-800">
          <h2 className="ms-4 p-2">Categories</h2>
        </div>
        <div className="  mb-4 rounded border border-neutral-800 bg-neutral-900 p-4">
          <ul>
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
          </ul>
          <div className="my-4 flex w-full items-center gap-1">
            <div className="h-0.5 w-1/2 bg-slate-500" />
            <button
              type="button"
              className=" hover:text-purple-800"
              onClick={() =>
                categoriesArray.append({ name: "", color: "#00ff00" })
              }
            >
              <IoIosAddCircleOutline size={28} />
            </button>
            <div className="h-0.5 w-1/2 bg-slate-500" />
          </div>
        </div>

        <div className=" left-0 top-0  w-full  rounded-t border-t  border-green-700 bg-green-800">
          <h2 className="ms-4 p-2">Backlog fields</h2>
        </div>
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

        <div className="flex justify-center">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};
export default CreateBacklog;
