import Title from "@/components/Common/Title";
import NavLink from "@/components/NavLink";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="container">
      <Title style={{ marginLeft: "1rem" }} title={"Settings"} />

      <div className="flex">
        <NavLink
          href={"/settings/account"}
          variant="contained"
          label={" Account"}
        />
        <NavLink
          href={"/settings/privacy"}
          variant="contained"
          label={" Privacy"}
        />
        <NavLink
          href={"/settings/preferences"}
          variant="contained"
          label={"Preferences"}
        />
      </div>
      <div className=" bg-layer-1 p-4">{children}</div>
    </div>
  );
}
