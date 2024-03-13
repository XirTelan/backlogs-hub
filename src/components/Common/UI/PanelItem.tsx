"use client";
import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";

const PanelItem = ({
  activeBacklog,
  href,
  backlogSlug,
  children,
  ...props
}: PanelItemProps) => {
  const itemLink = `${href}${backlogSlug}`;
  console.log(
    `${backlogSlug}:${activeBacklog} ${backlogSlug === activeBacklog} ${typeof backlogSlug} ${typeof activeBacklog}`,
  );
  return (
    <Link
      {...props}
      href={itemLink}
      className={`${backlogSlug === activeBacklog ? "bg-subtle-3/25 after:absolute after:left-0 after:h-full after:w-[3px] after:bg-primary-btn" : ""} relative flex h-8 items-center px-4 text-sm  hover:bg-field-hover-1`}
    >
      <>{children}</>
    </Link>
  );
};

export default PanelItem;

type PanelItemProps = {
  activeBacklog: string;
  backlogSlug: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;
