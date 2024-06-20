"use client";
import { BacklogNavProps } from "@/types";
import Link from "next/link";
import React from "react";

const PanelItem = ({
  activeBacklog,
  href,
  backlogSlug,
  children,
  ...props
}: BacklogNavProps) => {
  const itemLink = `${href}${backlogSlug}`;

  return (
    <Link
      {...props}
      href={itemLink}
      className={`${activeBacklog ? "bg-subtle-3/25 after:absolute after:left-0 after:h-full after:w-[3px] after:bg-primary-btn" : ""} relative flex h-8 items-center px-4 text-sm  hover:bg-field-hover-1`}
    >
      <>{children}</>
    </Link>
  );
};

export default PanelItem;
