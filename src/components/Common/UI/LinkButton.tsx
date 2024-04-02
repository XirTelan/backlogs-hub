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
}: LinkButtonProps) => {
  return (
    <Link {...link} href={href}>
      <ButtonBase {...button} type="button" text={text}>
        {children}
      </ButtonBase>
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
};
