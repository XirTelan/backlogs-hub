"use client";
import Select from "@/components/Common/UI/Select";
import Toggle from "@/components/Common/UI/Toggle";
import { toastCustom } from "@/lib/toast";
import { updateUserInfo } from "@/services/user";
import { UserDTO } from "@/zodTypes";
import React from "react";

const Privacy = ({ data }: { data: Partial<UserDTO> }) => {
  const { config } = data;
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-between">
        <Select
          defaultValue={data.config?.profileVisibility}
          layer={2}
          label="Profile Visability"
          id="profileVisibility"
          options={["public", "private"]}
          onChange={async (e) => {
            const res = await updateUserInfo(
              "profileVisibility",
              e.target.value,
            );
            if (res.isSuccess) toastCustom.success("Option changed");
          }}
        />
      </div>

      <div className="flex justify-between">
        <span>Hide folders name:</span>
        <Toggle
          defaultValue={config?.showEmptyFolders || false}
          action={async (state) => {
            const res = await updateUserInfo("hideFolderNames", state);
            if (res.isSuccess) toastCustom.success("Option changed");
          }}
        />
      </div>
    </div>
  );
};

export default Privacy;
