import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const variants = {
  default: "flex-col pb-2",
  inline: "justify-between items-center bg-transparent w-full ",
  fluid: "",
};
const elevation = {
  1: "bg-field-1 border-b border-strong-1",
  2: "bg-field-2 border-b border-strong-2",
  3: "bg-field-3 border-b border-strong-3",
};
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, layer = 1, variant = "default", ...props }, ref) => {
    return (
      <div className={`${variants[variant]}   flex `}>
        {label && <label className="me-2 h-6   text-white ">{label}</label>}
        <div
          className={`${variant === "default" ? elevation[layer] : "bg-transparent"} relative flex items-center `}
        >
          <select
            {...props}
            ref={ref}
            className={` ${variant === "default" ? elevation[layer] : "bg-transparent"}  pe-8 ps-4 text-secondary-text  *:bg-layer-1 hover:cursor-pointer `}
          >
            {options.map((option, indx) => (
              <option key={indx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <IoIosArrowUp className="absolute right-2 pointer-events-none" />
        </div>
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
