import UserSettings from "@/containers/User/UserSettings";
import React from "react";

const Page = ({ params }: { params: { tab: string } }) => {
  return (
    <main className=" container">
      <div>{params.tab}</div>
      <UserSettings tab={params.tab || "account"} />
    </main>
  );
};

export default Page;
