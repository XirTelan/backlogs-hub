"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const style = {
  line: {
    default: "md:border-b border-border-1 h-[49px]",
    active:
      "border-l-[3px] md:border-b-[3px] h-[49px] md:border-0 border-border-interactive",
  },
  contained: {
    default: "bg-layer-accent-1",
    active: "bg-layer-1 shadow-[inset_0_3px_0px_0_rgba(69,137,255,1)]",
  },
  simple: {
    default: "",
    active: "",
  },
};
const textSizes = {
  primary: "text-[18px] leading-[18px] text-primary-text",
  secondary: "text-base text-secondary-text ",
};
const NavLink = ({
  href,
  label,
  text = "primary",
  variant = "line",
  children,
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`${style[variant][isActive ? "active" : "default"]} relative list-none outline-offset-4 after:w-full hover:bg-subtle-3/15`}
    >
      <Link href={href} className={`flex  items-center  ${textSizes[text]}`}>
        {label && (
          <div
            className={`px-4 ${variant === "simple" ? "py-2 " : "py-[15px]"}`}
          >
            {label}
          </div>
        )}
        {children && <div className="ms-auto w-12 p-[14px]">{children}</div>}
      </Link>
    </li>
  );
};

export default NavLink;

interface NavItemProps {
  href: string;
  label: string;
  text?: "primary" | "secondary";
  variant?: "line" | "contained" | "simple";
  children?: React.ReactElement;
}
