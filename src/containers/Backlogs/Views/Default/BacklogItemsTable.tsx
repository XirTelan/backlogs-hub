import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemFormModalOpen } from "@/containers/Items/ItemFormModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  ToolBar,
} from "@/shared/ui/table";
import SearchFilter from "@/containers/SearchFilter";
import withWrap from "@/hoc/withWrap";

export const BacklogItemsTableToolbar = ({
  showFilters = true,
  showAction = true,
}: {
  showFilters?: boolean;
  showAction?: boolean;
}) => {
  return (
    <ToolBar
      search
      customButton={
        <div className="flex">
          {showFilters && <SearchFilter />}
          {showAction && <ItemFormModalOpen />}
        </div>
      }
    />
  );
};

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

export default withWrap(BacklogItemsTable);
