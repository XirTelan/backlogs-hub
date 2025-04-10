import React, { ReactElement } from "react";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { CSS } from "@dnd-kit/utilities";

import Handle, { HandleProps } from "./Handle";
import { MdDragIndicator } from "react-icons/md";

export type Props = {
  dragOverlay?: boolean;
  color?: string;
  children?: ReactElement;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: Partial<HandleProps>;
  height?: number;
  index?: number;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
} & { ref?: React.HTMLProps<HTMLLIElement>["ref"] };

export const Item = React.memo(
  ({
    children,
    dragOverlay,
    dragging,
    handle,
    handleProps,
    listeners,
    transform,
    ref,
    ...props
  }: Props) => {
    return (
      <li
        className="flex touch-manipulation items-center  hover:cursor-grabbing"
        ref={ref}
        style={{
          transform: CSS.Translate.toString(transform || null),
          opacity: dragging ? 0.5 : 1,
        }}
      >
        <span>
          {handle ? (
            <Handle
              style={{ border: 0, background: "transparent" }}
              {...handleProps}
              {...listeners}
            >
              <MdDragIndicator className="text-neutral-600" size={24} />
            </Handle>
          ) : null}
        </span>
        <div
          className={`flex w-full touch-manipulation items-center border ${dragOverlay ? "border-border-subtle-3 bg-layer-2" : "border-border-subtle-1 bg-layer-1"} `}
          {...(!handle ? listeners : undefined)}
          {...props}
          tabIndex={!handle ? 0 : undefined}
        >
          {children}
        </div>
      </li>
    );
  },
);
Item.displayName = "Item";
