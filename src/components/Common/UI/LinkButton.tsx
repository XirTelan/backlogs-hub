import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes } from "react";

import ButtonBase from "./ButtonBase";
import { ButtonBaseProps } from "@/types";

const LinkButton = ({
  href,
  text,
  children,
  button,
  link,
  ...props
}: LinkButtonProps) => {
  return (
    <Link {...link} {...props} href={href}>
      <ButtonBase {...button} type="button" text={text} icon={children} />
    </Link>
  );
};

export default LinkButton;
type LinkButtonProps = {
  href: string;
  text: string;
  children?: React.ReactElement;
  button?: ButtonBaseProps;
  link?: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;
} & React.DetailedHTMLProps<
  React.LinkHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
