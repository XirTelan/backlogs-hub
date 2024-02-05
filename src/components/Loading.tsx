import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-40 w-full items-center justify-center">
      <div className="flex items-center gap-1">
        <div className="animate-wiggle h-80 w-4 rounded-sm bg-neutral-700 delay-300"></div>
        <div className="animate-wiggle h-8 w-4 rounded-sm bg-neutral-700"></div>
        <div className="animate-wiggle h-4 w-4 rounded-sm bg-neutral-700"></div>
        <div className="animate-wiggle h-8 w-4 rounded-sm bg-neutral-700"></div>
        <div className="animate-wiggle h-8 w-4 rounded-sm bg-neutral-700"></div>
      </div>
    </div>
  );
};

export default Loading;
