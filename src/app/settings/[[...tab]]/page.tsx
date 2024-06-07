import UserSettings from "@/containers/User/UserSettings";
import React from "react";

const Page = ({ params }: { params: { tab: [string] } }) => {
  const tab = params.tab ? params.tab[0] : "account";
  return (
    <main className=" container">
      <UserSettings tab={tab} />
    </main>
  );
};

export default Page;