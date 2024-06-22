"use client";
import useChangeSearchParams from "@/hooks/useChangeParams";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

const Switcher = ({ options }: { options: Options }) => {
  const { key, items, callback } = options;
  const [active, setActive] = useState<number>(0);
  const countMaxItem = useMemo(() => {
    let max = 0;
    items.forEach((item) => {
      const length = typeof item.title==='string' ? item.title.length : 1;
      if (length > max) max = length;
    });
    return max;
  }, [items]);
  const { changeParams, searchParams } = useChangeSearchParams();

  useEffect(() => {
    const activeKey = searchParams.get(key);
    let indx = items.findIndex((item) => {
      item.value === activeKey;
    });
    indx = indx === -1 ? 0 : indx;
    setActive(indx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.preventDefault();
            if (callback) callback(item.value);
            else changeParams(key, item.value);
            setActive(index);
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
type Options = {
  key: string;
  callback?: (value: string) => void;
  items: {
    title: React.ReactNode;
    value: string;
  }[];
};
export default Switcher;
