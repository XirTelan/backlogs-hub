import Title from "@/components/Common/Title";
import Switcher from "@/components/Common/UI/Switcher";
import UserSettings from "@/containers/User/UserSettings";
import React from "react";

const Page = () => {
  return (
    <main className=" container">
      <Title title={"Settings"} />
      <Switcher
        options={{
          key: "tab",
          items: [
            { title: "Account", value: "account" },
            { title: "Privacy", value: "privacy" },
            { title: "Preferences", value: "preferences" },
          ],
        }}
      />
      <UserSettings />
    </main>
  );
};

export default Page;
