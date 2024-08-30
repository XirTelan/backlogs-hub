"use client";
import ToggleButton from "@/components/Common/UI/ToggleButton";
import useChangeSearchParams from "@/hooks/useChangeParams";
import React, { useEffect, useState } from "react";

type FilterBlockProps = {
  backlogSlug: string;
  backlogCategories: { name: string; color: string }[];
};
const FilterBlock = ({ backlogCategories }: FilterBlockProps) => {
  const [categories] = useState(backlogCategories);
  const [actviveCategories, setActiveCategories] = useState<string[]>([]);
  const { changeParams, searchParams } = useChangeSearchParams();

  const searchCategories = searchParams.get("categories");

  const onToggleChange = (toggle: string) => {
    const toggleLower = toggle.toLowerCase();
    let newQuery;
    if (actviveCategories.includes(toggleLower)) {
      newQuery = actviveCategories
        .filter((category) => category != toggleLower)
        .join("-");
    } else {
      newQuery = [...actviveCategories, toggleLower].join("-");
    }
    changeParams("categories", newQuery);
  };

  useEffect(() => {
    setActiveCategories(searchCategories ? searchCategories.split("-") : []);
  }, [searchCategories]);

  return (
    <div className="flex w-full  flex-wrap  gap-1 *:max-w-40 md:flex-row">
      {categories.map((category) => (
        <ToggleButton
          title={category.name}
          isActive={actviveCategories.includes(category.name.toLowerCase())}
          activeColor={category.color}
          key={category.name}
          onClick={() => onToggleChange(category.name)}
        />
      ))}
    </div>
  );
};

export default FilterBlock;
