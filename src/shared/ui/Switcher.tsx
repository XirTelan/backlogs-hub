"use client";
import { useChangeSearchParams } from "@/shared/hooks";
import classNames from "classnames";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";

export const Switcher = ({
  initial,
  options,
}: {
  initial?: number;
  options: Options;
}) => {
  const { key, items, callback } = options;
  const { changeParams, searchParams } = useChangeSearchParams();

  const activeKey = searchParams.get(key) ?? "";
  const indx = activeKey
    ? items.findIndex((item) => item.value === activeKey)
    : -1;

  const [active, setActive] = useState<number>(
    indx > 0 ? indx : (initial ?? 0)
  );

  const countMaxItem = useMemo(() => {
    let max = 0;
    items.forEach((item) => {
      const length = typeof item.title === "string" ? item.title.length : 1;
      if (length > max) max = length;
    });
    return max;
  }, [items]);

  const handleClick =
    (item: Options["items"][0], index: number) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (callback) callback(item.value);
      else changeParams(key, item.value);
      setActive(index);
    };

  return (
    <div className=" flex w-full self-center">
      {items.map((item, index) => {
        const isActive = active === index;
        const defautlAnimationState = { bottom: 0, left: 0, right: 0 };
        const len = items.length;
        return (
          <button
            key={index}
            onClick={handleClick(item, index)}
            data-active={isActive}
            className={classNames(
              "sw-btn group relative cursor-pointer overflow-hidden focus:border-focus focus:border border-b border-t first:rounded-s first:border-l	last:rounded-e last:border-r hover:bg-bg-hover"
            )}
            style={{ width: `calc(${countMaxItem}ch + 3rem)` }}
          >
            <motion.div
              initial={defautlAnimationState}
              animate={isActive ? { inset: 0 } : defautlAnimationState}
              transition={{ duration: 0.2 }}
              className="group-last: absolute bg-layer-selected-inverse  group-focus:border-focus transition-shadow ease-in-out	   group-focus:ring-1  group-focus:ring-inset group-focus:ring-focus-inset  group-focus:ring-offset-1  "
            ></motion.div>
            <div className="py-[11px]">
              <p
                className={classNames(
                  "relative  h-[18px] px-4 text-base leading-4 group-focus:text-text-inverse   ",
                  isActive
                    ? "text-text-inverse"
                    : "text-text-secondary hover:text-text-primary",
                  {
                    "border-r border-border-subtle-1":
                      !isActive && index < len && len > 2,
                  }
                )}
              >
                {item.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
type Options = {
  key: string;
  callback?: (value: string) => void;
  items: {
    title: React.ReactNode;
    value: string;
  }[];
};
