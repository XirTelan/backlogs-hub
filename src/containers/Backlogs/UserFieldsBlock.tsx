import InputField from "@/components/Common/InputField";
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
      title="Backlog fields"
      status="active"
      className="w-full lg:w-3/4"
      append={() =>
        fieldsArray.append({ name: "", type: "text", protected: false })
      }
    >
      <>
        <li>
          <InputField name="Title" value={"Title"} disabled>
            <div className=" absolute bottom-0 right-0 top-0 flex items-center self-center text-neutral-600 ">
              <p>This field is required and cannot be changed or deleted.</p>
            </div>
          </InputField>
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
