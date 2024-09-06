"use client";
import ColorPallete from "@/components/Common/ColorPallete";
import InputField from "@/components/Common/UI/Input/InputField";
import React from "react";
import { Controller, UseFieldArrayReturn } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import FieldsBlock from "../../components/FieldsBlock";
import { FieldsBlockProps } from "@/types";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const CategoriesFieldsBlock = ({
  name,
  title,
  placeholder,
  errors,
  control,
  register,
  data,
}: FieldsBlockProps & {
  name: "tags" | "categories";
  title: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: UseFieldArrayReturn<any, "categories" | "tags", "id">;
}) => {
  const move = (from: number, to: number) => {
    const max = data.fields.length;
    data.move(from, to < 0 ? max + to : to % max);
  };

  return (
    <>
      <FieldsBlock
        title={title}
        status="active"
        append={() =>
          data.append({
            name: "",
            color: "#0043CE",
            protected: false,
            order: data.fields.length,
          })
        }
      >
        <>
          {data.fields.map((item, index) => (
            <li
              className="group relative flex h-8 items-center gap-2 "
              key={item.id}
            >
              <div className=" relative w-8 text-sm text-secondary-text">
                {index + 1}
                {false && (
                  <div className="absolute inset-0 z-10 flex  ">
                    <ButtonBase
                      type="button"
                      size="small"
                      variant="ghost"
                      icon={<TiArrowSortedUp />}
                      onClick={() => move(index, index - 1)}
                    />
                    <ButtonBase
                      type="button"
                      size="small"
                      variant="ghost"
                      icon={<TiArrowSortedDown />}
                      onClick={() => move(index, index + 1)}
                    />
                  </div>
                )}
              </div>

              <InputField
                id={`category_${index}`}
                helperText={
                  errors &&
                  errors[index] && {
                    message: errors[index].name.message,
                    type: "error",
                  }
                }
                isSimple
                variant="small"
                placeholder={placeholder}
                {...register(`${name}.${index}.name`)}
              />
              <div className="flex gap-2">
                <Controller
                  control={control}
                  name={`${name}.${index}.color`}
                  render={({ field: { onChange, value } }) => (
                    <ColorPallete onChange={onChange} value={value} />
                  )}
                />
                <ButtonBase
                  type="button"
                  disabled={name === "categories" && data.fields.length === 1}
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    if (data.fields.length > 0) data.remove(index);
                  }}
                  icon={<IoClose />}
                />
              </div>
            </li>
          ))}
        </>
      </FieldsBlock>
    </>
  );
};

export default CategoriesFieldsBlock;
