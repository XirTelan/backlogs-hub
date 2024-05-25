import React, { ComponentType, ReactElement, useEffect } from "react";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { CSS } from "@dnd-kit/utilities";

import Handle from "./Handle";
import router from "next/router";
import { MdEdit, MdDeleteForever, MdDragIndicator } from "react-icons/md";
import ButtonBase from "../Common/UI/ButtonBase";

export type Props = {
  dragOverlay?: boolean;
  color?: string;
  children?: ReactElement;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
};

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        children,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref,
    ) => {
      return (
        <li
          className="flex  touch-manipulation items-center"
          ref={ref}
          style={{
            transform: CSS.Translate.toString(transform),
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
            <span>{value}</span>
            {children}
          </div>
        </li>
      );
    },
  ),
);
