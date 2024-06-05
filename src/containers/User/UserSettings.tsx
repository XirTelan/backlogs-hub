"use client";

import React from "react";
import Privacy from "./Settings/Privacy";
import Account from "./Settings/Account";
import Preferences from "./Settings/Preferences";

const TABS = {
  account: <Account />,
  privacy: <Privacy />,
  preferences: <Preferences />,
};
type TabsType = keyof typeof TABS;

const UserSettings = ({ tab }: { tab: TabsType }) => {
  return <div>{TABS[tab]}</div>;
};

export default UserSettings;
