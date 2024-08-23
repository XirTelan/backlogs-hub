"use client";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import useChangeSearchParams from "@/hooks/useChangeParams";
import SearchField from "./Common/UI/SearchField";
import ButtonBase from "./Common/UI/ButtonBase";
import { IoClose } from "react-icons/io5";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce(searchBar);
  const { changeParams } = useChangeSearchParams();

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
