import InputField from "@/components/Common/UI/InputField";
import React from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { RiDeleteBack2Line } from "react-icons/ri";
import FieldsBlock from "../../components/FieldsBlock";
import { BacklogFormData } from "@/types";

const UserFieldsBlock = ({ control, register }: FieldsBlockProps) => {
  const fieldsArray = useFieldArray({
    name: "fields",
    control,
    rules: {},
  });

  return (
    <FieldsBlock
      title="Fields"
      status="active"
      className="w-full lg:w-3/4"
      append={() =>
        fieldsArray.append({ name: "", type: "text", protected: false })
      }
    >
      <>
        <li>
          <InputField
            readOnly
            label="Field name"
            name="Title"
            value={"Title"}
            disabled
          ></InputField>
        </li>
        {fieldsArray.fields.map((item, index) => (
          <li key={item.id} className="flex items-center  gap-2">
            <InputField
              disabled={item.protected}
              placeholder="Field name"
              {...register(`fields.${index}.name`)}
            />
            <select
              disabled={item.protected}
              className="rounded bg-neutral-800 p-2"
              {...register(`fields.${index}.type`)}
            >
              <option value="text">Text</option>
              <option value="timer">Timer</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
            {!item.protected && (
              <button onClick={() => fieldsArray.remove(index)}>
                <RiDeleteBack2Line size={24} />
              </button>
            )}
          </li>
        ))}
      </>
    </FieldsBlock>
  );
};

export default UserFieldsBlock;

type FieldsBlockProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<BacklogFormData, any>;
  register: UseFormRegister<BacklogFormData>;
};
