"use client";
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

export const Item = ({ id, ...props }) => {
  return (
    <div className=" flex h-10 w-full max-w-64 cursor-grab  items-center justify-center border border-borderinteractive bg-layer-2">
      {id}
    </div>
  );
};
