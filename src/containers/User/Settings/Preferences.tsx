"use client";
import Toggle from "@/components/Common/UI/Toggle";
import React from "react";
import Setting from "./Setting";
import { updateConfigOption } from "@/services/user";
import { ConfigType } from "@/zodTypes";

const Preferences = ({ data }: { data: ConfigType }) => {
  return (
    <div>
      <Setting label={"Show empty folders in the backlogs"}>
        <Toggle
          defaultValue={data.showEmptyFolders || false}
          action={(state) => {
            updateConfigOption("showEmptyFolders", state);
          }}
        />
      </Setting>
    </div>
  );
};

export default Preferences;
