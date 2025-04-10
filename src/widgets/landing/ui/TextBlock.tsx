import React from "react";

export default function TextBlock({
  children,
  dir,
}: {
  dir: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dir === "left" ? " col-start-1 col-end-4" : " col-start-10 col-end-13 "} row-start-1  bg-btn-primary-hover`}
    >
      <div className="p-4">{children}</div>
    </div>
  );
}
