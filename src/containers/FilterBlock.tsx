import InputField from "@/components/InputField";
import ToggleButton from "@/components/ToggleButton";
import useChangeSearchParams from "@/hooks/useChangeParams";
import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type FilterBlockProps = {
  backlogCategories: string[];
};
const FilterBlock = ({ backlogCategories }: FilterBlockProps) => {
  const [categories] = useState(backlogCategories);
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce(searchBar);
  const changesParams = useChangeSearchParams();

  const [actviveCategories, setActiveCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
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
    changesParams("categories", newQuery);
  };

  useEffect(() => {
    changesParams("search", debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setActiveCategories(searchCategories ? searchCategories.split("-") : []);
  }, [searchCategories]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-1">
        {categories.map((category) => (
          <ToggleButton
            title={category}
            isActive={actviveCategories.includes(category.toLowerCase())}
            key={category}
            onClick={() => onToggleChange(category)}
          />
        ))}
      </div>
      <div>
        <InputField
          placeholder="Search... "
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBlock;
