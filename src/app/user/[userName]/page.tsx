import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <div>UserProfile</div><Link href={"/user/test/backlogs/"}>Backlogs</Link>
    </>
  );
}
