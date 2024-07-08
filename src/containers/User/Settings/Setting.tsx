import React from "react";

const Setting = ({
  label,
  description,
  value,
  children,
}: {
  label: string;
  description?: string;
  value?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="group relative flex  w-full items-center  justify-between py-2">
      <div className=" flex w-full  items-center justify-between">
        <div className=" text-secondary-text">
          <div>{label}</div>
          <div>{description}</div>
        </div>
        <div className="flex items-center">
          {value && <div className="">{value}</div>}
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
};

export default Setting;
