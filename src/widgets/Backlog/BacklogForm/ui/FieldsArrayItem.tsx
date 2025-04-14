import { Field } from "@/shared/model";
import { InputField, Select, ButtonBase } from "@/shared/ui";
import classNames from "classnames";
import { produce } from "immer";
import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

type FieldsArrayItemProps<T> = {
  index: number;
  error?: Merge<FieldError, FieldErrorsImpl<Field | Field>> | undefined;
  remove: (index: number) => void;
  update: (index: number, value: T) => void;
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
  error,
  remove,
  update,
}: FieldsArrayItemProps<Field>) => {
  const { register, control } = useFormContext();

  const field: Field = useWatch({ name: `fields.${index}`, control: control });
  if (!field) return;

  const handleUpdateField = (
    index: number,
    field: Field,
    action: "add" | "remove"
  ) => {
    if (field.type !== "select") return;

    update(
      index,
      produce(field, (draft) => {
        draft.data ??= [];
        if (action === "add") draft.data.push("");
        else draft.data.pop();
      })
    );
  };

  return (
    <>
      <tr
        key={index}
        className={classNames({
          "border-b border-border-subtle-1": field.type !== "select",
        })}
      >
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
          <div className="mt-1">
            <Select
              sizeVariant="small"
              layer={2}
              {...register(`fields.${index}.type`)}
              options={FIELD_TYPES}
            />
          </div>
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
              <div className="flex items-center justify-between mt-2 me-4">
                <div className="px-4">Options: {field.data?.length}</div>
                <div className="flex items-center justify-between ">
                  <ButtonBase
                    type="button"
                    variant="ghost"
                    size="small"
                    onClick={() => handleUpdateField(index, field, "remove")}
                    icon={<FaMinus />}
                  />
                  <ButtonBase
                    type="button"
                    variant="ghost"
                    size="small"
                    onClick={() => handleUpdateField(index, field, "add")}
                    icon={<FaPlus />}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr className=" border-b border-border-subtle-1">
            <td colSpan={2}></td>
            <td colSpan={2}>
              <div className="my-2 flex flex-col gap-2">
                {field.data?.length > 0 &&
                  field.data.map((_, indx) => (
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
