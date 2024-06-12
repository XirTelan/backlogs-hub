import React from "react";

const Tag = ({ title, icon, color, ...props }: Props) => {
  return (
    <div
      className={`flex  h-6 items-center rounded-full  border border-neutral-700 bg-neutral-800 text-center`}
      {...props}
      style={{ background: color }}
    >
      <div className={`mx-2 my-1 h-4 text-xs leading-4`}>{title}</div>
      {icon && (
        <div className=" flex items-center justify-center rounded-full border-s-neutral-700 bg-green-800  p-1 text-white">
          {icon}
        </div>
      )}
    </div>
  );
};

type Props = {
  title: string;
  color?: string;
  icon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default Tag;
