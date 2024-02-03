"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({ href, label, mode = "include" }: NavItemProps) => {
  const pathname = usePathname();
  const isActive =
    mode === "include" ? pathname.includes(href) : pathname === href;
  return (
    <Link
      href={href}
      className={`${isActive ? " bg-green-500" : ""} p-2 rounded-sm hover:bg-neutral-700 `}
    >
      {label}
    </Link>
  );
};

export default NavItem;

interface NavItemProps {
  href: string;
  label: string;
  mode?: "equal" | "include";
}
