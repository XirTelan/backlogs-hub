import { TabsType } from "@/containers/User/UserSettings";
import { routesList } from "@/shared/lib/routesList";
import { Session } from "@/shared/providers/sessionProvider";
import { getCurrentUserData } from "@/shared/services/api/user";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

const isPopulated = (
  arr: unknown[]
): arr is { _id: string; email: string; provider: string }[] => {
  return arr.every((item) => typeof item === "object");
};

const UserSettings = dynamic(() => import("@/containers/User/UserSettings"));

const Page = async (props: { params: Promise<{ tab: [TabsType] }> }) => {
  const params = await props.params;
  if (!params.tab || !params.tab[0]) redirect(`${routesList.settings}/account`);
  const res = await getCurrentUserData();
  if (!res.success)
    return <div>Something goes wrong: {JSON.stringify(res.message)}</div>;

  if (res.data.accounts && isPopulated(res.data.accounts)) {
    const convertToStringArr = res.data.accounts.map((item) => {
      item._id = item._id.toString();
      return item;
    });
    res.data = { ...res.data, accounts: convertToStringArr };
  }

  return (
    <div className=" container">
      <Session
        userData={{
          user: {
            _id: res.data._id || "",
            username: res.data.username || "",
          },
        }}
      >
        <UserSettings data={res.data} tab={params.tab[0]} />
      </Session>
    </div>
  );
};

export default Page;
