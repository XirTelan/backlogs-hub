import createTable from "@/lib/createTable";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemFormModalOpen } from "@/containers/Items/ItemFormModal";
import SearchFilter from "@/containers/SearchFilter";

const Table = createTable();

export const BacklogItemsTableToolbar = () => {
  return (
    <Table.ToolBar
      search
      customButton={
        <div className="flex">
          <SearchFilter />
          <ItemFormModalOpen />
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
          className="m-auto text-secondary-text"
        />
      ),
      width: "64px",
    },
  ];

  return (
    <>
      <Table.Wrap>
        <Table.Head headers={headers}></Table.Head>
        <Table.Body>{children}</Table.Body>
      </Table.Wrap>
    </>
  );
};

export default BacklogItemsTable;
