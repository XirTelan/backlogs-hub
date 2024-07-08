import Title from "@/components/Common/Title";
import NavLink from "@/components/NavLink";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <main className="container self-center">
      <Title style={{ marginLeft: "1rem" }} title={"Settings"} />

      <ul role="tablist" className="flex">
        <NavLink
          href={"/settings/account"}
          variant="contained"
          label={"Account"}
        />
        <NavLink
          href={"/settings/profile"}
          variant="contained"
          label={"Profile"}
        />
        <NavLink
          href={"/settings/privacy"}
          variant="contained"
          label={"Privacy"}
        />
        <NavLink
          href={"/settings/preferences"}
          variant="contained"
          label={"Preferences"}
        />
      </ul>
      <div className=" max-w-3xl bg-layer-1 p-4">{children}</div>
    </main>
  );
}
