import React from "react";

const layers = {
  1: "bg-border-subtle-1",
  2: "bg-border-subtle-2",
  3: "bg-border-subtle-3",
};

export const Divider = ({ layer }: { layer?: keyof typeof layers }) => (
  <div className={`my-1 flex h-[1px] w-full ${layers[layer ?? 1]}`}></div>
);

