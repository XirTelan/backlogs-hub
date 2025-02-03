import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const variants = {
  default: "flex-col pb-2",
  inline: "justify-between items-center bg-transparent w-full ",
  fluid: "",
};
const elevation = {
  1: "bg-field-1 border-b border-border-strong-1",
  2: "bg-field-2 border-b border-border-strong-2",
  3: "bg-field-3 border-b border-border-strong-3",
};
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, layer = 1, variant = "default", ...props }, ref) => {
    const elevStyle =
      variant === "default" ? elevation[layer] : "bg-transparent";

    return (
      <div className={`${variants[variant]}   flex `}>
        {label && <label className="me-2 h-6   text-white ">{label}</label>}
        <div className={`${elevStyle} relative flex items-center `}>
          <select
            {...props}
            ref={ref}
            className={` ${elevStyle}  pe-8 ps-4 text-text-secondary  *:bg-layer-1 hover:cursor-pointer `}
          >
            {options.map((option, indx) => (
              <option key={indx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <IoIosArrowUp className="pointer-events-none absolute right-2" />
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
