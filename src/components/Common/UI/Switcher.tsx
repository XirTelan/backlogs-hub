"use client";
import useChangeSearchParams from "@/hooks/useChangeParams";
import classNames from "classnames";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

const Switcher = ({
  initial,
  options,
}: {
  initial?: number;
  options: Options;
}) => {
  const { key, items, callback } = options;
  const [active, setActive] = useState<number>(initial ?? 0);
  const { changeParams, searchParams } = useChangeSearchParams();

  const countMaxItem = useMemo(() => {
    let max = 0;
    items.forEach((item) => {
      const length = typeof item.title === "string" ? item.title.length : 1;
      if (length > max) max = length;
    });
    return max;
  }, [items]);

  useEffect(() => {
    const activeKey = searchParams.get(key) ?? "";
    const indx = Math.max(
      0,
      items.findIndex((item) => item.value === activeKey),
    );
    setActive(indx);
  }, []);

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
      {items.map((item, index) => (
        <button
          key={index}
          onClick={handleClick(item, index)}
          data-active={active === index}
          className="sw-btn group relative cursor-pointer  border-b border-t first:rounded-s first:border-l	last:rounded-e last:border-r hover:bg-bg-hover"
          style={{ width: `calc(${countMaxItem}ch + 3rem)` }}
        >
          {active === index && (
            <motion.div
              initial={{ bottom: 0, left: 0, right: 0 }}
              animate={{ inset: 0 }}
              transition={{ duration: 0.1 }}
              className="group-last: absolute bg-white  transition-shadow ease-in-out	   group-focus:ring-2  group-focus:ring-inset group-focus:ring-black group-focus:ring-offset-2  "
            ></motion.div>
          )}
          <div className="py-[11px]">
            <p
              className={classNames(
                { "text-[#161616]": active === index },
                "relative  h-[18px] px-4 text-base leading-4 ",
              )}
            >
              {item.title}
            </p>
          </div>
        </button>
      ))}
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
export default Switcher;
