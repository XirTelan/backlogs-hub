import TopTitle from "@/components/Common/UI/TopTitle";
import NavLink from "@/components/NavLink";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <TopTitle title="Settings" />
      <main className="container self-center">
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
    </>
  );
}
