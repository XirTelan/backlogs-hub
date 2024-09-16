import React, { CSSProperties, ReactElement, forwardRef } from "react";

type Props = {
  children: ReactElement;
  style: CSSProperties;
};
const Handle = forwardRef<HTMLButtonElement, Props>(
  ({ children, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className=" touch-none   items-center  border-y border-l border-neutral-700  bg-neutral-800 p-2  hover:cursor-grab "
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Handle.displayName = "Handle";
export default Handle;
