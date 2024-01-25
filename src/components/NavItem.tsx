import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({ href, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Link
      href={href}
      className={`${isActive ? " bg-green-500" : ""} px-1 hover:bg-neutral-700`}
    >
      {label}
    </Link>
  );
};

export default NavItem;

interface NavItemProps {
  href: string;
  label: string;
}
