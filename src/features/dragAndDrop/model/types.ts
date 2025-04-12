import { UniqueIdentifier } from "@dnd-kit/core";
import { CSSProperties, JSX, ReactElement, ReactNode } from "react";

export type SortableItemProps = {
  children?: React.ReactNode | ReactNode[];
  id: UniqueIdentifier;
  index: number;
  title: string;
  handle: boolean;
  handpleProps?: HandleProps;
  disabled?: boolean;
  style?: React.CSSProperties;
  renderItem?: () => React.ReactElement;
};

export type HandleProps = {
  children: ReactElement;
  style: CSSProperties;
} & JSX.IntrinsicElements["button"];
