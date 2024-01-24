import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className=" flex gap-1">
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/"}>Home</Link>
    </nav>
  );
}
