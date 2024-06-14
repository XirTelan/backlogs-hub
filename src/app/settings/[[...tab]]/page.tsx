import UserSettings, { TabsType } from "@/containers/User/UserSettings";
import { routesList } from "@/data";
import { redirect } from "next/navigation";
import React from "react";

const Page = ({ params }: { params: { tab: [TabsType] } }) => {
  if (!params.tab || !params.tab[0]) redirect(`${routesList.settings}/account`);
  return (
    <main className=" container">
      <UserSettings tab={params.tab[0]} />
    </main>
  );
};

export default Page;
