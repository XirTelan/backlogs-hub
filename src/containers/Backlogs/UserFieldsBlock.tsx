import InputField from "@/components/Common/UI/InputField";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FieldsBlockProps } from "@/types";
import ButtonBase from "@/components/Common/UI/ButtonBase";

const UserFieldsBlock = ({ errors, control, register }: FieldsBlockProps) => {
  const fieldsArray = useFieldArray({
    name: "fields",
    control,
    rules: {},
  });
  return (
    <>
      <div className=" flex  min-h-80 w-full flex-col bg-layer-1">
        <div className="px-4 pb-6 pt-4">
          <div className=" text-xl">Fields</div>
          <div className=" text-base text-secondary-text">Fields</div>
        </div>
        <section
          className="relative flex flex-col"
          aria-label="data table toolbar"
        >
          <div className="absolute hidden">1</div>
          <div className="flex w-full">
            2
            <div className="ms-auto">
              <ButtonBase
                type="button"
                text="Add field"
                onClick={() =>
                  fieldsArray.append({
                    name: "",
                    type: "text",
                    protected: false,
                  })
                }
              />
            </div>
          </div>
        </section>
        <table>
          <thead>
            <tr className=" h-16 bg-layer-accent-1">
              <th className="w-10 text-center">№</th>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" border-b border-subtle-1">
              <td colSpan={2} className="px-4">
                <InputField
                  value={"Title"}
                  variant="small"
                  layer={2}
                  readOnly
                />
              </td>
              <td className="text-center text-secondary-text" colSpan={2}>
                Is field is required and cant be deleted
              </td>
            </tr>
            {fieldsArray.fields.map((field, index) => (
              <tr key={field.id} className=" border-b border-subtle-1">
                <td className="text-center">{index + 1}</td>
                <td className="px-4">
                  <InputField
                    helperText={
                      errors &&
                      errors[index] && {
                        message: errors[index].name.message,
                        type: "error",
                      }
                    }
                    variant="small"
                    layer={2}
                    {...register(`fields.${index}.name`)}
                  />
                </td>
                <td className="px-4 text-center">
                  <select
                    className="rounded bg-neutral-800 p-2"
                    {...register(`fields.${index}.type`)}
                  >
                    <option value="text">Text</option>
                    <option value="timer">Timer</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </select>
                </td>
                <td className="px-4 text-center">
                  <button onClick={() => fieldsArray.remove(index)}>
                    <RiDeleteBack2Line size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserFieldsBlock;
