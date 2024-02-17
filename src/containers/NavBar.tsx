"use client";
import Link from "next/link";
import React from "react";
import SignInButton from "./Auth/SignInButton";
import SignOutButton from "./Auth/SignOutButton";
import useSession from "@/hooks/useSession";

const NavBar = () => {
  const { user } = useSession();
  return (
    <nav className=" flex h-14 w-full justify-center gap-1 bg-neutral-900 p-2">
      <div className="container flex w-full items-center justify-between text-xl">
        <div className="flex gap-2">
          <Link href={"/"}>
            <span className=" font-sans font-bold	">BacklogsHub</span>
          </Link>
        </div>
        <div className="me-2 flex items-center justify-center">
          {user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
