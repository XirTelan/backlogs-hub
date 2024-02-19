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
      className={`${isActive ? " bg-secondary-container text-on-secondary-container hover:bg-on-secondary-container/10" : "hover:bg-on-surface/10"}  rounded-sm p-2 `}
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
