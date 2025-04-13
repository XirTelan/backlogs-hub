import React from "react";
import { Field, useFieldArray } from "react-hook-form";

import withWrap from "@/hoc/withWrap";
import UserFieldsTable from "./UserFieldsTable";
import { Title, ButtonBase } from "@/shared/ui";
import { FieldsBlockProps } from "@/entities/backlog/model/types";
import { BacklogFormData, FieldWithId } from "@/shared/types";

const FieldsTable = withWrap(UserFieldsTable);

const UserFieldsBlock = ({ control }: FieldsBlockProps) => {
  const { fields, append, remove, update } = useFieldArray<
    BacklogFormData,
    "fields",
    "id"
  >({
    name: "fields",
    control,
  });

  const userFields = fields as unknown as FieldWithId<Field>[];

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
