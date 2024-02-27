import React from "react";
import { CgSpinner } from "react-icons/cg";

const loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className=" animate-spin">
        <CgSpinner />
      </div>
    </div>
  );
};

export default loading;
