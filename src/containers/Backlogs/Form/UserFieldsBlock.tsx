import InputField from "@/components/Common/UI/Input/InputField";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { FieldsBlockProps } from "@/types";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Title from "@/components/Common/Title";
import FieldsArrayItem from "./FieldsArrayItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import createTable from "@/lib/createTable";
import { BacklogFormData, Field } from "@/zodTypes";
import Notification from "@/components/Common/UI/Notification";

const Table = createTable();
const headers = [
  { id: "index", title: "#", width: "1rem" },
  { id: "name", title: "Name", width: "auto" },
  { id: "type", title: "Type" },
  { id: "actions", title: <BsThreeDotsVertical />, width: "48px" },
];

const UserFieldsBlock = ({ errors, control }: FieldsBlockProps) => {
  const { fields, append, remove, update } = useFieldArray<
    BacklogFormData,
    "fields",
    "id"
  >({
    name: "fields",
    control,
  });

  const userFields = fields as (Field & { id: string })[];
  return (
    <section>
      <Title variant={3} style={{ margin: ".5rem 0" }} title={"Fields"}>
        <ButtonBase
          variant="tertiary"
          style={{ width: "8rem" }}
          type="button"
          text="Add field"
          onClick={() =>
            append({
              name: ``,
              type: "text",
              protected: false,
            })
          }
        />
      </Title>
      <Table.Wrap>
        <Table.Head headers={headers}></Table.Head>
        <Table.Body>
          <tr className=" border-b border-border-subtle-1">
            <td colSpan={2} className="px-4">
              <InputField value={"Title"} variant="small" layer={2} readOnly />
            </td>
            <td className="px-4 text-text-secondary" colSpan={2}>
              <Notification
                text={" This field is required and cannot be deleted"}
                type={"info"}
                options={{ showBtn: false }}
              />
            </td>
          </tr>
          {userFields.map((field, index) => (
            <FieldsArrayItem
              key={field.id}
              index={index}
              error={errors && errors[index]}
              remove={remove}
              update={update}
            />
          ))}
        </Table.Body>
      </Table.Wrap>
    </section>
  );
};

export default UserFieldsBlock;
