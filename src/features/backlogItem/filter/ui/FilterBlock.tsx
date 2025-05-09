"use client";
import ToggleButton from "@/shared/ui/ToggleButton";
import { useChangeSearchParams } from "@/shared/hooks";
import { useSession } from "@/app_fsd/providers/sessionProvider";
import React, { useState } from "react";
import DropDown from "@/shared/ui/DropDown/DropDown";

type FilterBlockProps = {
  backlogSlug: string;
  backlogCategories: { name: string; color: string }[];
};
const FilterBlock = ({ backlogCategories }: FilterBlockProps) => {
  const [categories] = useState(backlogCategories);

  const { changeParams, searchParams } = useChangeSearchParams();
  const { user } = useSession();
  const categoryBlockView = user?.config?.categoryBlockView ?? "buttons";
  const searchCategories = searchParams.get("categories");
  const actviveCategories = new Set(searchCategories?.split("-") ?? []);

  const onToggleChange = (toggle: string) => {
    let newQuery;
    if (actviveCategories.has(toggle)) {
      newQuery = Array.from(actviveCategories)
        .filter((category) => category != toggle)
        .join("-");
    } else {
      newQuery = [...actviveCategories, toggle].join("-");
    }
    changeParams("categories", newQuery);
  };

  const handleDropDownChange = (categories: string[]) => {
    changeParams("categories", categories.join("-"));
  };

  return (
    <>
      {categoryBlockView === "buttons" ||
      (categoryBlockView === "dynamic" && categories.length < 5) ? (
        <div className="flex w-full  flex-wrap  gap-1 *:max-w-40 md:flex-row">
          {categories.map((category) => (
            <ToggleButton
              title={category.name}
              isActive={actviveCategories.has(category.name)}
              activeColor={category.color}
              key={category.name}
              size="medium"
              onClick={() => onToggleChange(category.name)}
            />
          ))}
        </div>
      ) : (
        <DropDown
          id={""}
          label={"Categories"}
          activeItems={Array.from(actviveCategories)}
          options={categories.map((category) => category.name)}
          onChange={handleDropDownChange}
        />
      )}
    </>
  );
};

export default FilterBlock;
