import { options } from "@/app/api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Page() {
  // const {} = useSession();
  return (
    <>
      <div>UserProfile</div>
      <Link href={"/user/test/backlogs/"}>Backlogs</Link>
    </>
  );
}
