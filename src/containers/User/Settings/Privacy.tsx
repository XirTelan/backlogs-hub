import Select from "@/components/Common/UI/Select";
import React from "react";

const Privacy = () => {
  return (
    <div>
      <div className=" flex items-center justify-between">
        <span>Profile visability:</span>
        <Select layer={2} id="asd" options={["Public", "Private"]} />
      </div>
    </div>
  );
};

export default Privacy;
