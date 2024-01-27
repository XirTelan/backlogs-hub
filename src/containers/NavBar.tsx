import Link from "next/link";
import React from "react";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function NavBar() {
  const user = await currentUser();

  return (
    <nav className=" flex justify-center gap-1 bg-neutral-900 p-2">
      <div className="flex w-full max-w-7xl  items-center justify-between text-xl">
        <div className="flex gap-2">
          <Link href={`/user/${user?.username}`}>Profile</Link>
          <Link href={"/"}>Backlogs</Link>
        </div>
        <div className="me-2 flex h-6  w-6 items-center justify-center rounded-full bg-slate-400 text-sm">
          <UserButton
            userProfileUrl={"/user-profile"}
            userProfileMode="navigation"
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </nav>
  );
}
