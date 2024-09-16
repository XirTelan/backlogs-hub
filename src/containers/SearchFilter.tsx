"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Select from "@/components/Common/UI/Select";
import SidePanel from "@/components/SidePanel";
import useChangeSearchParams from "@/hooks/useChangeParams";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

const ORDER = ["ascending", "descending"];
const SORT = ["Title", "Created", "Updated"];

const SearchFilter = () => {
  const { searchParams, changeParams } = useChangeSearchParams();
  const [order, setOrder] = useState(searchParams.get("order") ?? ORDER[0]);
  const [sort, setSort] = useState(searchParams.get("sort") ?? SORT[0]);

  const resetFilters = () => {
    setOrder(ORDER[0]);
    setSort(SORT[0]);
    changeParams(["order", "sort"], [ORDER[0], SORT[0]]);
  };
  const applyFilters = () => {
    changeParams(["order", "sort"], [order, sort]);
  };
  const changeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };
  const changeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className="bg-layer-1">
      <SidePanel keepOpen borders={false} position="none" icon={<FiFilter />}>
        <div className="p-2">
          <p className="mb-2 text-lg">Filters:</p>
          <Select
            label="Sort by"
            value={sort}
            onChange={changeSort}
            options={SORT}
          />
          <Select
            label="Order"
            value={order}
            onChange={changeOrder}
            options={ORDER}
          />
          <div className="flex">
            <ButtonBase
              onClick={resetFilters}
              size="small"
              variant="secondary"
              text="Reset"
            />
            <ButtonBase
              onClick={applyFilters}
              size="small"
              variant="accent"
              text="Apply"
            />
          </div>
        </div>
      </SidePanel>
    </div>
  );
};

export default SearchFilter;
