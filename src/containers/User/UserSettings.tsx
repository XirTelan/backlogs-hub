import React from "react";
import Privacy from "./Settings/Privacy";
import Account from "./Settings/Account";
import Preferences from "./Settings/Preferences";
import { getConfigOptions } from "@/services/user";
import { ConfigType } from "@/zodTypes";

const TABS = {
  account: Account,
  privacy: Privacy,
  preferences: Preferences,
};
export type TabsType = keyof typeof TABS;

type UserSettingsProps = {
  tab: TabsType;
};

const renderTab = (
  TabComponent: React.ComponentType<{ data: ConfigType }>,
  data: ConfigType,
) => {
  return <TabComponent data={data} />;
};

const UserSettings = async ({ tab }: UserSettingsProps) => {
  const data = await getConfigOptions();
  if (data.status === "error")
    return <div>Something goes wrong: {JSON.stringify(data.message)}</div>;
  const TabComponent = TABS[tab];
  return <>{renderTab(TabComponent, data.data)}</>;
};

export default UserSettings;
