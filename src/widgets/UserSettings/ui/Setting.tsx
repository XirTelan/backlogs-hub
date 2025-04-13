import React from "react";
type SettingProps = {
  label: string;
  description?: string;
  value?: string;
  children?: React.ReactNode;
};
const Setting = ({ label, description, value, children }: SettingProps) => {
  return (
    <div className="group relative flex  w-full items-center  justify-between py-2">
      <div className=" flex w-full  items-center justify-between">
        <div className=" text-text-secondary w-4/5">
          <label className=" text-text-primary">{label}</label>
          <p className=" text-sm text-text-secondary pe-4">{description}</p>
        </div>
        <div className="flex items-center">
          {value && <div className="">{value}</div>}
          <>{children}</>
        </div>
      </div>
    </div>
  );
};

export default Setting;
