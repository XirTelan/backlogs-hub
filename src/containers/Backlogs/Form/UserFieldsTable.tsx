import React from "react";
import { Table, TableHeader, TableHead, TableBody } from "@/shared/ui/table";
import InputField from "@/shared/ui/Input/InputField";
import FieldsArrayItem from "./FieldsArrayItem";
import Notification from "@/shared/ui/Notification";
import { BacklogFormData, Field } from "@/zodTypes";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FieldValues,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from "react-hook-form";
import { FieldWithId } from "@/types";

type UserFieldsTableProps<T extends FieldValues, U extends FieldValues> = {
  userFields: T[];
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<U>;
};

const headers = [
  { id: "index", title: "#", width: "1rem" },
  { id: "name", title: "Name", width: "auto" },
  { id: "type", title: "Type" },
  { id: "actions", title: <BsThreeDotsVertical />, width: "48px" },
];

export default function UserFieldsTable({
  userFields,
  remove,
  update,
}: UserFieldsTableProps<FieldWithId<Field>, BacklogFormData>) {
  return (
    <Table>
      <TableHeader>
        {headers.map((header) => (
          <TableHead
            style={{
              width: header.width,
            }}
            key={header.id}
          >
            {header.title}{" "}
          </TableHead>
        ))}
      </TableHeader>

      <TableBody>
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
            remove={remove}
            update={update}
          />
        ))}
      </TableBody>
    </Table>
  );
}
