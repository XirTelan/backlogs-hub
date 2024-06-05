"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, label, variant = "line", children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const style = {
    line: {
      default: "md:border-b border-subtle-1",
      active:
        "border-l-[3px] md:border-b-[3px] md:border-0 border-borderinteractive",
    },
    contained: {
      default: "bg-layer-accent-1",
      active: "bg-layer-1 shadow-[inset_0_3px_0px_0_rgba(69,137,255,1)]",
    },
  };

  return (
    <li
      className={`${style[variant][isActive ? "active" : "default"]} relative h-12 list-none outline-offset-4 after:w-full hover:bg-subtle-3/15`}
    >
      <Link href={href} className="flex  items-center text-primary-text">
        {label && (
          <div className="px-4 py-[15px] text-[18px] leading-[18px]">
            {label}
          </div>
        )}
        {children && (
          <div className="ms-auto h-12 w-12 p-[14px]">{children}</div>
        )}
      </Link>
    </li>
  );
};

export default NavLink;

interface NavItemProps {
  href: string;
  label: string;
  variant?: "line" | "contained";
  children?: React.ReactElement;
}
