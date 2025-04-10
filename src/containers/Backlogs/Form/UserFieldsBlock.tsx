import React from "react";
import { useFieldArray } from "react-hook-form";
import { FieldsBlockProps } from "@/types";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Title from "@/components/Common/Title";
import { BacklogFormData, Field } from "@/zodTypes";
import withWrap from "@/hoc/withWrap";
import UserFieldsTable from "./UserFieldsTable";

const FieldsTable = withWrap(UserFieldsTable);

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
      <FieldsTable userFields={userFields} remove={remove} update={update} />
    </section>
  );
};

export default UserFieldsBlock;
