import { GoSearch } from "react-icons/go";
import React from "react";
import { SearchBar } from "@/shared/model";

const SearchField = ({
  id,
  variant = "large",
  placeholder,
  children,
  ref,
  ...props
}: SearchBar) => {
  const sizes = {
    small: "h-8 px-4 py-[7px] ",
    medium: "h-10 px-4 py-[11px] ",
    large: "h-12 p-4",
  };

  return (
    <div className="flex w-full items-center   focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-white">
      <div className="group relative flex grow bg-layer-1 hover:bg-field-hover-1">
        <div className="p-4 pe-0">
          <GoSearch />
        </div>
        <input
          type="input"
          className={` ${sizes[variant]} flex grow bg-layer-1 text-text-secondary outline-hidden  placeholder:text-strong-1 read-only:bg-transparent   group-hover:bg-field-hover-1 `}
          placeholder={placeholder}
          name={id}
          id={id}
          {...props}
          ref={ref}
          style={{
            minWidth: 0,
            maxWidth: "calc(100vw - 128px)",
          }}
        />
        {children}
      </div>
    </div>
  );
};
SearchField.displayName = "SearchField";
export default SearchField;
