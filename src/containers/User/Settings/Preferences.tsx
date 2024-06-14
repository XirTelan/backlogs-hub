"use client";
import Toggle from "@/components/Common/UI/Toggle";
import React from "react";
import Setting from "./Setting";
import { updateConfigOption } from "@/services/user";
import { ConfigType } from "@/zodTypes";
import { toastCustom } from "@/lib/toast";

const Preferences = ({ data }: { data: ConfigType }) => {
  return (
    <div>
      <Setting label={"Show empty folders in the backlogs"}>
        <Toggle
          defaultValue={data.showEmptyFolders || false}
          action={async (state) => {
            const res = await updateConfigOption("showEmptyFolders", state);
            if (res.status === "ok") toastCustom.success("Option changed");
          }}
        />
      </Setting>
    </div>
  );
};

export default Preferences;
