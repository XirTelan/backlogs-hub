import React from "react";

const variants = {
  default: "",
  inline: "",
  fluid: "",
};
const elevation = {
  1: "bg-layer-1",
  2: "bg-layer-2",
  3: "bg-layer-3",
};
const Select = ({
  label,
  options,
  layer = 1,
  variant = "default",
  ...props
}: SelectProps) => {
  return (
    <div className={variants[variant]}>
      {label && (
        <label className="h-6 pb-2  text-secondary-text ">{label}</label>
      )}
      <select {...props} className={`${elevation[layer]} rounded p-2`}>
        {options.map((option, indx) => (
          <option key={indx} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

type Variants = keyof typeof variants;
type SelectProps = {
  label?: string;
  options: string[];
  layer?: 1 | 2 | 3;
  variant?: Variants;
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
