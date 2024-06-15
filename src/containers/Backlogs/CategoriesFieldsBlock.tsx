import ColorPallete from "@/components/Common/ColorPallete";
import InputField from "@/components/Common/UI/InputField";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import FieldsBlock from "../../components/FieldsBlock";
import { FieldsBlockProps } from "@/types";
import ButtonBase from "@/components/Common/UI/ButtonBase";

const CategoriesFieldsBlock = ({
  errors,
  control,
  register,
}: FieldsBlockProps) => {
  const categoriesArray = useFieldArray({
    name: "categories",
    control,
  });

  return (
    <>
      <FieldsBlock
        title="Categories"
        status="active"
        append={() =>
          categoriesArray.append({
            name: "",
            color: "#0043CE",
            protected: false,
          })
        }
      >
        <>
          {categoriesArray.fields.map((item, index) => (
            <li className="relative flex h-8 items-center gap-2 " key={item.id}>
              <div className=" w-8 text-sm text-secondary-text">
                {index + 1}
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
                layer={2}
                placeholder="Category name"
                {...register(`categories.${index}.name`)}
              />
              <div className="flex gap-2">
                <Controller
                  control={control}
                  name={`categories.${index}.color`}
                  render={({ field: { onChange, value } }) => (
                    <ColorPallete onChange={onChange} value={value} />
                  )}
                />
                <ButtonBase
                  disabled={categoriesArray.fields.length === 1}
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    if (categoriesArray.fields.length > 1)
                      categoriesArray.remove(index);
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
