"use client";
import useDebounce from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";
import useChangeSearchParams from "@/shared/hooks/useChangeParams";
import SearchField from "../../../shared/ui/SearchField";
import ButtonBase from "../../../shared/ui/ButtonBase";
import { IoClose } from "react-icons/io5";

const SearchBar = () => {
  const { searchParams, changeParams } = useChangeSearchParams();
  const [searchBar, setSearchBar] = useState(searchParams.get("search") ?? "");
  const debouncedValue = useDebounce(searchBar);

  useEffect(() => {
    changeParams("search", debouncedValue);
  }, [debouncedValue, changeParams]);

  const clearSearch = () => {
    setSearchBar("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

  return (
    <>
      <SearchField
        placeholder="Search... "
        value={searchBar}
        onChange={handleChange}
      >
        {searchBar && (
          <div className="absolute right-0">
            <ButtonBase
              variant="ghost"
              icon={<IoClose />}
              onClick={clearSearch}
            />
          </div>
        )}
      </SearchField>
    </>
  );
};

export default SearchBar;
