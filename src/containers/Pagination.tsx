"use client";
import Select from "@/components/Common/UI/Select";
import useChangeSearchParams from "@/hooks/useChangeParams";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalCount }: { totalCount: number }) => {
  const { changeParams, searchParams } = useChangeSearchParams();

  const pageSize = parseInt(searchParams.get("pageSize") ?? "50");
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageCount = Math.ceil(totalCount / pageSize);

  const onPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeParams("page", e.target.value);
  };
  const onPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeParams(["pageSize", "page"], [e.target.value, "1"]);
  };

  const nextPage = () => {
    changeParams("page", String(page + 1));
  };

  const prevPage = () => {
    changeParams("page", String(page - 1));
  };

  const selectOptions = Array.from({ length: pageCount }).map((_, indx) =>
    String(indx + 1),
  );

  return (
    <div className="my-2 flex flex-1 items-center border-t  border-border bg-layer-1   text-sm *:h-10 ">
      <div className=" hidden  border-e  border-border ps-4 text-primary-text md:flex">
        <span className="h-auto content-center whitespace-nowrap  text-center ">
          {" "}
          Items per page:
        </span>
        <Select
          variant="inline"
          defaultValue={pageSize}
          options={["10", "50", "100"]}
          onChange={onPageSizeChange}
        />
      </div>
      <div className="ms-2 flex flex-1 border-e border-border text-secondary-text  *:content-center">
        <span>
          {page * pageSize - pageSize + 1}-
          {Math.min(page * pageSize, totalCount)} of {totalCount} items
        </span>
      </div>
      <div className="flex *:content-center">
        <Select
          value={page}
          variant="inline"
          options={selectOptions}
          onChange={onPageChange}
        />
        <span className=" me-4 whitespace-nowrap ">of {pageCount} pages</span>
      </div>
      <div>
        <Btn disabled={page - 1 <= 0} onClick={prevPage}>
          <IoIosArrowBack />
        </Btn>
        <Btn disabled={page + 1 > pageCount} onClick={nextPage}>
          <IoIosArrowForward />
        </Btn>
      </div>
    </div>
  );
};

const Btn = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` relative h-10 w-10 border-s border-border text-primary-text hover:bg-field-hover-1 disabled:cursor-not-allowed disabled:text-neutral-700 disabled:hover:bg-layer-1 `}
    >
      <div className="flex items-center justify-center ">{children}</div>
    </button>
  );
};

export default Pagination;
