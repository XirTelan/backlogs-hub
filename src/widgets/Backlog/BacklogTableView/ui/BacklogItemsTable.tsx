import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/shared/ui/table";

const BacklogItemsTable = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableHead>Title</TableHead>
          <TableCell className="w-16 ">
            <BsThreeDotsVertical
              title="Actions"
              className="m-auto text-text-secondary"
            />
          </TableCell>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </>
  );
};

export default BacklogItemsTable;
