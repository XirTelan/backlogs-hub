"use client";
import ColorPallete from "@/features/colorPallete/ui/ColorPallete";
import { Controller, UseFieldArrayReturn } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import FieldsBlock from "../../../../entities/field/FieldsBlock";
import { BacklogFormData } from "@/zodTypes";
import { ButtonBase, InputField } from "@/shared/ui";
import { FieldsBlockProps } from "../../../../entities/backlog/model/types";

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
  data: UseFieldArrayReturn<BacklogFormData, "categories" | "tags", "id">;
}) => {
  const handleAppend = () => {
    return {
      name: "",
      color: "#0043CE",
      protected: name !== "categories" ? false : undefined,
      order: data.fields.length,
    };
  };

  return (
    <>
      <FieldsBlock
        title={title}
        status="active"
        append={() => data.append(handleAppend())}
      >
        <>
          {data.fields.map((item, index) => (
            <li className="relative flex h-8 items-center gap-2 " key={item.id}>
              <InputField
                id={`category_${index}`}
                helperText={
                  errors &&
                  errors[index] && {
                    message: errors[index].name?.message ?? "",
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
