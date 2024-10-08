import UserSettings, { TabsType } from "@/containers/User/UserSettings";
import { routesList } from "@/lib/routesList";
import { Session } from "@/providers/sessionProvider";
import { getCurrentUserData } from "@/services/user";
import { redirect } from "next/navigation";
import React from "react";

const isPopulated = (
  arr: unknown[],
): arr is { _id: string; email: string; provider: string }[] => {
  return arr.every((item) => typeof item === "object");
};

const Page = async ({ params }: { params: { tab: [TabsType] } }) => {
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
