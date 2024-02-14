import ColorPallete from "@/components/Common/ColorPallete";
import InputField from "@/components/Common/InputField";
import React from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { RiDeleteBack2Line } from "react-icons/ri";
import FieldsBlock from "../../components/FieldsBlock";
import { BacklogFormData } from "@/types";

const CategoriesFieldsBlock = ({ control, register }: FieldsBlockProps) => {
  const categoriesArray = useFieldArray({
    name: "categories",
    control,
  });

  return (
    <FieldsBlock
      title="Categories"
      status="active"
      className="grow"
      append={() =>
        categoriesArray.append({
          name: "",
          color: "#00ff00",
          protected: false,
        })
      }
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
  );
};

export default CategoriesFieldsBlock;

type FieldsBlockProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<BacklogFormData, any>;
  register: UseFormRegister<BacklogFormData>;
};
