import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemFormModalOpen } from "@/containers/Items/ItemFormModal";
import { TableBody, TableHeader, ToolBar } from "@/components/Common/UI/table";
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
  const headers = [
    { id: "title", title: "Title" },
    {
      id: "actions",
      title: (
        <BsThreeDotsVertical
          title="Actions"
          className="m-auto text-text-secondary"
        />
      ),
      width: "64px",
    },
  ];

  return (
    <>
      <TableHeader>
        <>
          {headers.map((header) => (
            <TableHeader key={header.id}>
              {header.title}
            </TableHeader>
          ))}
        </>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </>
  );
};

export default withWrap(BacklogItemsTable);
