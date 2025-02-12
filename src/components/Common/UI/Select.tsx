import classNames from "classnames";
import React, { JSX } from "react";
import { IoIosArrowDown } from "react-icons/io";

const variants = {
  default: "flex-col",
  inline: "justify-between items-center bg-transparent w-full ",
  fluid: "",
};
const elevation = {
  1: "bg-field-1 border-b border-border-strong-1",
  2: "bg-field-2 border-b border-border-strong-2",
  3: "bg-field-3 border-b border-border-strong-3",
};

const sizeVariants = {
  small: "h-8",
  medium: "h-10",
  large: "h-12",
};

const Select = ({
  label,
  options,
  layer = 1,
  variant = "default",
  sizeVariant = "medium",
  ref,
  ...props
}: SelectProps) => {
  const elevStyle = variant === "default" ? elevation[layer] : "bg-transparent";

  return (
    <div className={classNames(`flex `, variants[variant])}>
      {label && (
        <label className="me-2 h-6   text-text-primary ">{label}</label>
      )}
      <div className={`${elevStyle} relative flex items-center `}>
        <select
          {...props}
          ref={ref}
          className={classNames(
            sizeVariants[sizeVariant],
            elevStyle,
            `w-full pe-8 ps-4 text-text-secondary appearance-none outline-none m-0  *:bg-layer-1 hover:cursor-pointer `,
          )}
        >
          {options.map((option, indx) => (
            <option key={indx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="pointer-events-none absolute right-2" />
      </div>
    </div>
  );
};
Select.displayName = "SelectInput";
export default Select;

type Variants = keyof typeof variants;
type SelectProps = {
  label?: string;
  options: string[];
  layer?: 1 | 2 | 3;
  variant?: Variants;
  sizeVariant?: "small" | "medium" | "large";
} & JSX.IntrinsicElements["select"];
