import Link from "next/link";
import React from "react";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function NavBar() {
  const session = await getServerSession(options);
  return (
    <nav className=" flex gap-1">
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      {session ? (
        <Link href="/api/auth/signout?callbackUrl=/">LogOut</Link>
      ) : (
        <Link href="/api/auth/signin">LogIn</Link>
      )}
    </nav>
  );
}
