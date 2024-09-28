"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import DropDown from "@/components/Common/UI/DropDown/DropDown";
import Select from "@/components/Common/UI/Select";
import SidePanel from "@/components/SidePanel";
import useChangeSearchParams from "@/hooks/useChangeParams";
import { BacklogInfoContext } from "@/providers/backlogInfoProvider";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";

const ORDER = ["ascending", "descending"];
const SORT = ["Title", "Created", "Updated"];

const SearchFilter = () => {
  const { searchParams, changeParams } = useChangeSearchParams();
  const { backlog } = useContext(BacklogInfoContext);
  const backlogTags = useMemo(
    () => backlog?.tags?.map((tag) => tag.name) ?? [],
    [backlog],
  );
  const [order, setOrder] = useState(searchParams.get("order") ?? ORDER[0]);
  const [sort, setSort] = useState(searchParams.get("sort") ?? SORT[0]);
  const tagsInitial = searchParams.get("tags")?.split("-") ?? [];
  const [selectedTags, setSelectedTags] = useState(tagsInitial);

  const resetFilters = () => {
    setSelectedTags([]);
    setOrder(ORDER[0]);
    setSort(SORT[0]);
    changeParams(["order", "sort", "tags"], [ORDER[0], SORT[0], ""]);
  };
  const applyFilters = () => {
    changeParams(
      ["order", "sort", "tags"],
      [order, sort, selectedTags.join("-")],
    );
  };
  const changeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };
  const changeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const changeTags = useCallback((newTags: string[]) => {
    setSelectedTags(newTags);
  }, []);

  return (
    <div className="bg-layer-1">
      <SidePanel keepOpen borders={false} position="none" icon={<FiFilter />}>
        <div className="flex flex-col gap-2 px-2">
          <DropDown
            id={""}
            label={"Tags"}
            activeItems={tagsInitial}
            options={backlogTags}
            onChange={changeTags}
          />
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
