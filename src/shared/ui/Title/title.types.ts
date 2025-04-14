import React, { CSSProperties } from "react";

export type TitleProps = {
  title: string;
  description?: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  titleOffset?: number | string;
  children?: React.ReactElement | null;
  style?: CSSProperties;
  width?: string | number;
} & React.HTMLAttributes<HTMLHeadingElement>;
