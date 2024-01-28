import Link from "next/link";
import React from "react";
import {
  UserButton,
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

export default async function NavBar() {
  const user = await currentUser();

  return (
    <nav className=" flex w-full justify-center gap-1 bg-neutral-900 p-2">
      <div className="container flex w-full items-center justify-between text-xl">
        <div className="flex gap-2">
          <Link href={"/"}>
            <span className=" font-sans font-bold	">BacklogsHub</span>
          </Link>
        </div>
        <div className="me-2 flex items-center justify-center">
          <SignedIn>
            <Link href={`/user/${user?.username}`}>Profile</Link>
            <Link href={"/"}>Backlogs</Link>
            <UserButton
              userProfileUrl={"/user-profile"}
              userProfileMode="navigation"
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
