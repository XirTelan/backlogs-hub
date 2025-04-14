"use client";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { BacklogNavProps } from "../model/types";

const PanelItem = ({ active, href, children, ...props }: BacklogNavProps) => {
  return (
    <Link
      {...props}
      href={href}
      className={classNames(
        "relative flex h-8 items-center px-4 text-sm  hover:bg-field-hover-1",
        {
          "bg-subtle-3/25 after:absolute after:left-0 after:h-full after:w-[3px] after:bg-btn-primary":
            active,
        }
      )}
    >
      <>{children}</>
    </Link>
  );
};

export default PanelItem;
