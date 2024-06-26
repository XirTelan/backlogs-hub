import UserSettings, { TabsType } from "@/containers/User/UserSettings";
import { routesList } from "@/data";
import { getCurrentUserData } from "@/services/user";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { tab: [TabsType] } }) => {
  if (!params.tab || !params.tab[0]) redirect(`${routesList.settings}/account`);
  const res = await getCurrentUserData();
  if (!res.isSuccess)
    return <div>Something goes wrong: {JSON.stringify(res.message)}</div>;
  return (
    <main className=" container">
      <UserSettings data={res.data} tab={params.tab[0]} />
    </main>
  );
};

export default Page;
