import React from "react";
import SearchBar from "@/components/SearchBar";

const createTable = (title = "", description = "") => {
  const Title = () => {
    return (
      title && (
        <div className="px-4 pb-6  pt-4">
          <div className=" text-xl">{title}</div>
          <div className=" text-base text-secondary-text">{description}</div>
        </div>
      )
    );
  };
  const ToolBar = ({
    showButton = true,
    customButton,
    search = false,
  }: {
    search?: boolean;
    showButton?: boolean;
    customButton?: React.ReactElement;
  }) => {
    return (
      <section aria-label="data table  toolbar">
        <div className=" flex max-w-full  justify-between">
          {search && <SearchBar />}
          {customButton && showButton && <div>{customButton}</div>}
        </div>
      </section>
    );
  };

  const Head = ({
    headers,
  }: {
    headers: { id: string; title: string | React.ReactNode; width?: string }[];
  }) => {
    return (
      <thead>
        <tr className=" h-12 bg-layer-accent-1">
          {headers.map((header) => (
            <th
              key={header.id}
              style={{ width: header.width || "auto" }}
              className="p-4 text-start text-primary-text"
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const Body = ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => {
    return <tbody>{children}</tbody>;
  };
  const Wrap = ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => {
    return (
      <div className=" flex  w-full flex-col bg-layer-1">
        <table className="w-full table-fixed ">
          <>{children}</>
        </table>
      </div>
    );
  };
  return { Wrap, Head, Title, ToolBar, Body };
};

export default createTable;
