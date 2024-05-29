"use client";
import Select from "@/components/Common/UI/Select";
import { useSearchParams } from "next/navigation";
import React from "react";

const TABS = {
  account: <div>Acoount settings</div>,
  privacy: (
    <div>
      <div>
        <span>Profile visability:</span>
        <Select options={["Public", "Private"]} />
      </div>
    </div>
  ),
};
type TabsType = keyof typeof TABS;

const UserSettings = () => {
  const activeBar = (useSearchParams().get("tab") || "account") as TabsType;
  return <div>{TABS[activeBar]}</div>;
};

export default UserSettings;
