import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className=" flex justify-center gap-1 bg-neutral-900 p-2">
      <div className="flex w-full max-w-7xl  items-center justify-between text-xl">
        <div className="flex gap-2">
          <Link href={"/"}>Profile</Link>
          <Link href={"/"}>Backlogs</Link>
        </div>
        <div className="me-2 flex h-6  w-6 items-center justify-center rounded-full bg-slate-400 text-sm">
          L
        </div>
      </div>
    </nav>
  );
}
