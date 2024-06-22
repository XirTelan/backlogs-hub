"use client";
import Select from "@/components/Common/UI/Select";
import { updateConfigOption } from "@/services/user";
import { ConfigType } from "@/zodTypes";
import React from "react";

const Privacy = ({ data }: { data: ConfigType }) => {
  console.log("asdasd", data);
  return (
    <div>
      <div className=" flex items-center justify-between">
        <span>Profile visability:</span>
        <Select
          defaultValue={data.profileVisibility}
          layer={2}
          id="profileVisibility"
          options={["public", "private"]}
          onChange={(e) => {
            updateConfigOption("profileVisibility", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Privacy;
