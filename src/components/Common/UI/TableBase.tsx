import React from "react";
import SearchBar from "@/components/SearchBar";

const TableBase = ({
  title,
  description,
  headers,
  children,
  showButton = true,
  customButton,
  search = false,
}: TableBaseProps) => {
  return (
    <>
      <div className=" flex  w-full flex-col bg-layer-1">
        {title && (
          <div className="px-4 pb-6  pt-4">
            <div className=" text-xl">{title}</div>
            <div className=" text-base text-secondary-text">{description}</div>
          </div>
        )}
        {customButton && (
          <section aria-label="data table  toolbar">
            <div className="flex max-w-full justify-between">
              {search && <SearchBar />}
              {showButton && <div>{customButton}</div>}
            </div>
          </section>
        )}
        <div className=" max-h-[calc(100svh-20rem)] overflow-auto ">
          <table className="w-full table-fixed ">
            <thead>
              <tr className=" h-12 bg-layer-accent-1">
                {headers.map((header) => (
                  <th
                    key={header.title}
                    style={{ width: header.width || "auto" }}
                    className="p-4 text-start text-primary-text"
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableBase;

type TableBaseProps = {
  title?: string;
  description?: string;
  headers: { title: string; width?: string }[];
  search?: boolean;
  showButton?: boolean;
  customButton?: React.ReactElement;
  children: React.ReactNode;
};
