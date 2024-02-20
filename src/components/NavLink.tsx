"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li className="after:bg-borderinteractive after:top-100 relative h-full after:absolute after:h-[1px] after:w-full ">
      <Link
        href={href}
        className="text-primary-text flex h-full items-center p-4"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavLink;

interface NavItemProps {
  href: string;
  label: string;
}
