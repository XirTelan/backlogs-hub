import InputField from "@/components/Common/UI/InputField";
import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { FieldsBlockProps } from "@/types";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import TableBase from "@/components/Common/UI/TableBase";
import Title from "@/components/Common/Title";
import FieldsArrayItem from "./FieldsArrayItem";
import { Field } from "@/zodTypes";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserFieldsBlock = ({ errors, control, register }: FieldsBlockProps) => {
  const fieldsArray = useFieldArray({
    name: "fields",
    control,
    rules: {},
  });

  const fields: (Field & { id?: number })[] = useWatch({
    name: "fields",
    control,
  });
  return (
    <section>
      <Title variant={3} style={{ margin: ".5rem 0" }} title={"Fields"}>
        <ButtonBase
          variant="tertiary"
          style={{ width: "8rem" }}
          type="button"
          text="Add field"
          onClick={() =>
            fieldsArray.append({
              id: Math.floor(Math.random() * 100000),
              name: ``,
              type: "text",
              protected: false,
            })
          }
        />
      </Title>
      <TableBase
        headers={[
          { id: "index", title: "#", width: "1rem" },
          { id: "name", title: "Name", width: "auto" },
          { id: "type", title: "Type" },
          { id: "actions", title: <BsThreeDotsVertical />, width: "48px" },
        ]}
        description={""}
      >
        <>
          <tr className=" border-b border-subtle-1">
            <td colSpan={2} className="px-4">
              <InputField value={"Title"} variant="small" layer={2} readOnly />
            </td>
            <td className="px-4 text-secondary-text" colSpan={2}>
              This field is required and cannot be deleted
            </td>
          </tr>
          {fields.map((field, index) => (
            <FieldsArrayItem
              key={field._id ?? field.id ?? index}
              index={index}
              register={register}
              field={field}
              error={errors && errors[index]}
              remove={fieldsArray.remove}
              customAction={{
                update: () => {
                  if (field.type !== "select") return;
                  fieldsArray.update(index, {
                    ...field,
                    data: field.data ? [...field.data, ""] : [""],
                  });
                },
                remove: () => {
                  if (field.type !== "select") return;
                  fieldsArray.update(index, {
                    ...field,
                    data: [...field.data.slice(0, -1)],
                  });
                },
              }}
            />
          ))}
        </>
      </TableBase>
    </section>
  );
};

export default UserFieldsBlock;
