import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import useChangeSearchParams from "@/hooks/useChangeParams";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce(searchBar);
  const changesParams = useChangeSearchParams();

  useEffect(() => {
    changesParams("search", debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      <InputField
        placeholder="Search... "
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
