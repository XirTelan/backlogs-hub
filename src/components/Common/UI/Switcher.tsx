"use client";
import useChangeSearchParams from "@/hooks/useChangeParams";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

const Switcher = ({ items }: { items: Item[] }) => {
  const [active, setActive] = useState<number>(0);
  const countMaxItem = useMemo(() => {
    let max = 0;
    items.forEach((item) => {
      const length = item.title.length;
      if (length > max) max = length;
    });
    return max;
  }, [items]);
  const { changeParams, searchParams } = useChangeSearchParams();

  useEffect(() => {
    const active = searchParams.get("filter");
    items.forEach((item, index) => {
      if (item.value === active) {
        setActive(index);
        return;
      }
    });
  }, [items, searchParams]);

  return (
    <div className=" flex">
      {items.map((item, index) => (
        <button
          key={item.title}
          onClick={() => {
            setActive(index);
            changeParams(item.key, item.value);
          }}
          className={`${active === index ? "active " : ""}${index === active - 1 ? "preactive " : ""}  sw-btn group relative  border-b border-t first:rounded-s  
        first:border-l	last:rounded-e 
          last:border-r hover:bg-subtle-3 
          `}
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
              className={`${active === index ? "text-[#161616]" : ""} relative  h-[18px] px-4 text-base leading-4 `}
            >
              {item.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
type Item = {
  title: string;
  key: string;
  value: string;
};
export default Switcher;
