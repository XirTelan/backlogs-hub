"use client";
import Select from "@/components/Common/UI/Select";
import { updateUserInfo } from "@/services/user";
import { UserDTO } from "@/zodTypes";
import React from "react";

const Privacy = ({ data }: { data: Partial<UserDTO> }) => {
  return (
    <div>
      <div className=" flex items-center justify-between">
        <Select
          defaultValue={data.config?.profileVisibility}
          layer={2}
          label="Profile Visability"
          id="profileVisibility"
          options={["public", "private"]}
          onChange={(e) => {
            updateUserInfo("profileVisibility", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Privacy;
