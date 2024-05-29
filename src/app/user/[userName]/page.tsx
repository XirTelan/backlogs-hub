
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <main className="container ">
        <div className=" bg-on-primary  ">UserProfile</div>
        <div>

        </div>
        <Link href={"/user/test/backlogs/"}>Backlogs</Link>
      </main>
    </>
  );
}
