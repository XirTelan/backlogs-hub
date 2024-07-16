import React from "react";

const DemoBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p className="w-1/2 border-e border-s border-t border-border-1 bg-layer-1 p-2">
        Demo
      </p>
      <div className=" border border-border-1 bg-layer-1 p-1">
        <div className="bg-background p-4">{children}</div>
      </div>
    </div>
  );
};

export default DemoBlock;
