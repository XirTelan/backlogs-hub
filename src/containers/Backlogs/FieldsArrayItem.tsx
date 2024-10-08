import ButtonBase from "@/components/Common/UI/ButtonBase";
import InputField from "@/components/Common/UI/Input/InputField";
import Select from "@/components/Common/UI/Select";
import { BacklogFormData, Field } from "@/zodTypes";
import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

type FieldsArrayItem = {
  index: number;
  register: UseFormRegister<BacklogFormData>;
  field: Field;
  error?: Merge<FieldError, FieldErrorsImpl<Field | Field>> | undefined;
  remove: (index: number) => void;
  customAction: {
    update: () => void;
    remove: () => void;
  };
};

const FIELD_TYPES: Field["type"][] = [
  "text",
  "timer",
  "number",
  "date",
  "markdown",
  "select",
];

const FieldsArrayItem = ({
  index,
  register,
  field,
  error,
  remove,
  customAction,
}: FieldsArrayItem) => {
  if (!field) return <div>error</div>;
  return (
    <>
      <tr key={index} className=" border-b border-subtle-1">
        <td className="text-center">{index + 1}</td>
        <td className="px-4">
          <InputField
            helperText={
              error && {
                message: error.name?.message || "",
                type: "error",
              }
            }
            variant="small"
            layer={2}
            {...register(`fields.${index}.name`)}
          />
        </td>
        <td className="px-2 ">
          <Select
            layer={2}
            {...register(`fields.${index}.type`)}
            options={FIELD_TYPES}
          />
        </td>
        <td>
          <div className="flex">
            <div className="m-auto ">
              <ButtonBase
                size="small"
                variant="dangerGhost"
                type="button"
                icon={<MdClose size={20} />}
                onClick={() => remove(index)}
              ></ButtonBase>
            </div>
          </div>
        </td>
      </tr>
      {field.type === "select" && (
        <>
          <tr>
            <td colSpan={2}></td>
            <td colSpan={2}>
              <div className="flex items-center justify-between mt-2">
                <div className="px-4">Options: {field.data?.length}</div>
                <div className="flex items-center justify-between">
                  <ButtonBase
                    type="button"
                    variant="ghost"
                    size="small"
                    onClick={customAction.remove}
                    icon={<FaMinus />}
                  />
                  <ButtonBase
                    type="button"
                    variant="ghost"
                    size="small"
                    onClick={customAction.update}
                    icon={<FaPlus />}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr className=" border-b border-subtle-1">
            <td colSpan={2}></td>
            <td colSpan={2}>
              <div className="my-2 flex flex-col gap-2">
                {field.data?.length > 0 &&
                  field.data.map((option, indx) => (
                    <div key={`${index}.${indx}`} className="px-4">
                      <InputField
                        variant={"small"}
                        layer={2}
                        isSimple
                        {...register(`fields.${index}.data.${indx}`)}
                      />
                    </div>
                  ))}
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default FieldsArrayItem;
