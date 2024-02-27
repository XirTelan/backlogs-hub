import { SearchBar } from "@/types";
import { GoSearch } from "react-icons/go";
import React from "react";

const SearchField = React.forwardRef<HTMLInputElement, SearchBar>(
  ({ id, variant = "large", placeholder, children, ...props }, ref) => {
    const sizes = {
      small: "h-8 px-4 py-[7px] ",
      medium: "h-10 px-4 py-[11px] ",
      large: "h-12 p-4",
    };

    return (
      <div className="flex w-full items-center focus-within:outline  focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-white">
        <div className="hover:bg-field-hover-1 group flex  grow bg-layer-1">
          <div className="p-4">
            <GoSearch />
          </div>
          <input
            type="input"
            className={` ${sizes[variant]} group-hover:bg-field-hover-1 flex grow bg-layer-1 text-secondary-text  outline-none placeholder:text-strong-1   read-only:bg-transparent `}
            placeholder={placeholder}
            name={id}
            id={id}
            {...props}
            ref={ref}
          />
          {children}
        </div>
      </div>
    );
  },
);
SearchField.displayName = "SearchField";
export default SearchField;
