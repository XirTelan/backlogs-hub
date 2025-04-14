"use client";
import React from "react";
import { updateUserInfo } from "@/shared/api/user";
import { toastCustom } from "@/shared/lib/toast";
import Setting from "./Setting";
import { Toggle, Select } from "@/shared/ui";
import { OptionTab } from "../model/types";

const Preferences = ({ data }: OptionTab) => {
  const { config } = data;
  if (!config) return <div>Error</div>;
  const handleUpdate = async (key: string, state: boolean | string) => {
    const res = await updateUserInfo(key, state);
    if (res.success) toastCustom.success("Option changed");
  };

  return (
    <div>
      <Setting label={"Show empty folders in the backlogs:"}>
        <Toggle
          value={config.showEmptyFolders || false}
          action={async (state) => {
            await handleUpdate("showEmptyFolders", state);
          }}
        />
      </Setting>
      <Setting label="Pagination">
        <Select
          layer={2}
          defaultValue={config.pagination}
          options={["bottom", "top", "both"]}
          onChange={async (e) => {
            await handleUpdate("pagination", e.target.value);
          }}
        />
      </Setting>
      <Setting label="Category filter block view">
        <Select
          layer={2}
          defaultValue={config.categoryBlockView}
          onChange={async (e) => {
            const res = await updateUserInfo(
              "categoryBlockView",
              e.target.value
            );
            if (res.success) toastCustom.success("Option changed");
          }}
          options={["buttons", "dropDown", "dynamic"]}
        />
      </Setting>

      <Setting label="Items Category designation">
        <Select
          layer={2}
          defaultValue={config.categoryDesignation}
          onChange={async (e) => {
            const res = await updateUserInfo(
              "categoryDesignation",
              e.target.value
            );
            if (res.success) toastCustom.success("Option changed");
          }}
          options={["color", "colorMark", "explicit", "none"]}
        />
      </Setting>
    </div>
  );
};

export default Preferences;
