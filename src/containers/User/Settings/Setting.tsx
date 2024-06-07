import React from "react";

const Setting = ({ label, children }) => {
  return (
    <div className="group flex items-center justify-between">
      <div className=" text-secondary-text">{label}</div>
      <div className=" ">{children}</div>
    </div>
  );
};

export default Setting;
