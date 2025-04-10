import { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

export type BacklogNavProps = {
  active: boolean;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;
