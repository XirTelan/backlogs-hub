import React, { CSSProperties, JSX, ReactElement } from "react";

export type HandleProps = {
  children: ReactElement;
  style: CSSProperties;
} & JSX.IntrinsicElements["button"];

const Handle = ({ children, style, ref, ...props }: HandleProps) => {
  return (
    <button
      ref={ref}
      type={"button"}
      className=" touch-none   items-center  border-y border-l border-neutral-700  bg-neutral-800 p-2  hover:cursor-grab "
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
export default Handle;
