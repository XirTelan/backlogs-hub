import React, { forwardRef } from "react";
import { MdDragIndicator } from "react-icons/md";

const Handle = forwardRef(({ children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className=" touch-none   items-center  border-y border-l border-neutral-700  bg-neutral-800 p-2  hover:cursor-grab"
      {...props}
    >
      {children}
    </button>
  );
});
Handle.displayName = "Handle";
export default Handle;
