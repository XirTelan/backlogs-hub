"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, label, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const style = isActive
    ? " after:top-[calc(100%-3px)] after:h-[3px] after:bg-borderinteractive "
    : "after:top-[calc(100%-1px)]  after:h-[1px] after:top-full after:bg-subtle-1";

  return (
    <li
      className={`${style} fter:bg-border-interactive relative h-12  list-none   after:absolute after:w-full hover:bg-subtle-3/15   `}
    >
      <Link href={href} className="flex  items-center text-primary-text">
        {label && (
          <div className="px-4 py-[15px] text-[18px] leading-[18px]">
            {label}
          </div>
        )}
        {children && <div className="h-12 w-12 p-[14px]">{children}</div>}
      </Link>
    </li>
  );
};

export default NavLink;

interface NavItemProps {
  href: string;
  label: string;
  children?: React.ReactElement;
}
