import Switcher from "@/components/Common/UI/Switcher";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <main className="container ">
        <div className=" bg-on-primary  ">UserProfile</div>
        <div>
          <Switcher
            items={[{ title: "Options", key: "tab", value: "Options" }]}
          />
        </div>
        <Link href={"/user/test/backlogs/"}>Backlogs</Link>
      </main>
    </>
  );
}
