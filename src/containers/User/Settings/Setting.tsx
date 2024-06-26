import React from "react";

const Setting = ({
  label,
  children,
  action,
}: {
  label: string;
  children: React.ReactNode;
  action: () => void | Promise<void>;
}) => {
  return (
    <div
      onClick={action}
      className="group relative flex w-full  items-center justify-between"
    >
      <div className=" flex w-full  items-center justify-between">
        <div className=" text-secondary-text">{label}</div>
        <div className="group-hover:bg-field-hover-1 ">{children}</div>
      </div>
    </div>
  );
};

export default Setting;
