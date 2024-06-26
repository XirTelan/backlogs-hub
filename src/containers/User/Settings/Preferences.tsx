"use client";
import Toggle from "@/components/Common/UI/Toggle";
import React from "react";
import { updateUserInfo } from "@/services/user";
import { toastCustom } from "@/lib/toast";
import { UserDTO } from "@/zodTypes";

const Preferences = ({ data }: { data: Partial<UserDTO> }) => {
  const { config } = data;
  if (!config) return <div>Error</div>;
  return (
    <div>
      <div className="flex justify-between">
        <span>Show empty folders in the backlogs:</span>
        <Toggle
          defaultValue={config.showEmptyFolders || false}
          action={async (state) => {
            const res = await updateUserInfo("showEmptyFolders", state);
            if (res.isSuccess) toastCustom.success("Option changed");
          }}
        />
      </div>
    </div>
  );
};

export default Preferences;
