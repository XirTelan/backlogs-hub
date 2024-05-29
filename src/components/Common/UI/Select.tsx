import React from "react";

const Select = ({
  options,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: string[] }) => {
  return (
    <select {...props} className="rounded bg-neutral-800 p-2">
      {options.map((option, indx) => (
        <option key={indx} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
