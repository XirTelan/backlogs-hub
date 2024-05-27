/* eslint-disable react/prop-types */
import React, { ReactElement } from "react";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { CSS } from "@dnd-kit/utilities";

import Handle from "./Handle";
import { MdDragIndicator } from "react-icons/md";

export type Props = {
  dragOverlay?: boolean;
  color?: string;
  children?: ReactElement;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  height?: number;
  index?: number;
  title: string;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
};

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        children,
        dragOverlay,
        dragging,
        handle,
        handleProps,
        listeners,
        title,
        transform,
        ...props
      },
      ref,
    ) => {
      return (
        <li
          className="flex  touch-manipulation items-center"
          ref={ref}
          style={{
            transform: CSS.Translate.toString(transform || null),
            scale: dragOverlay ? "0.95" : 1,
            opacity: dragging ? 0.5 : 1,
          }}
        >
          <span>
            {handle ? (
              <Handle
                {...handleProps}
                {...listeners}
                style={{ borderRight: 0 }}
              >
                <MdDragIndicator className=" text-neutral-600 " size={24} />
              </Handle>
            ) : null}
          </span>
          <div
            className={`flex w-full touch-manipulation items-center border ${dragOverlay ? " border-layer-3 bg-layer-2" : " border-layer-2 bg-layer-1"}   p-1`}
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <span className="ms-2">{title}</span>
            {children}
          </div>
        </li>
      );
    },
  ),
);
