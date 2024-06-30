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
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, layer = 1, variant = "default", ...props }, ref) => {
    return (
      <div className={`${variants[variant]} flex  justify-between `}>
        {label && <label className="me-2 h-6  pb-2 text-white ">{label}</label>}
        <select
          {...props}
          ref={ref}
          className={`${elevation[layer]} rounded p-2 text-secondary-text hover:cursor-pointer `}
        >
          {options.map((option, indx) => (
            <option key={indx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
Select.displayName = "SelectInput";
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
