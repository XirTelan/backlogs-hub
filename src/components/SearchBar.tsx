"use client";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import useChangeSearchParams from "@/hooks/useChangeParams";
import SearchField from "./Common/UI/SearchField";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce(searchBar);
  const { changeParams } = useChangeSearchParams();

  useEffect(() => {
    changeParams("search", debouncedValue);
  }, [debouncedValue, changeParams]);

  return (
    <>
      <SearchField
        placeholder="Search... "
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
