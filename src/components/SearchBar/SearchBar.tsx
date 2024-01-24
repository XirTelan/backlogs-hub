import debounce from "@/hooks/useDebounce";
import React, { InputHTMLAttributes, useEffect, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const SearchBar: InputProps = ({ name, ...rest }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <div>{name}</div>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(() => e.target.value);
        }}
        {...rest}
      />
    </div>
  );
};

export default SearchBar;
