"use client";
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

export const Item = ({ id, ...props }) => {
  const style = {
    width: "100%",
    maxWidth: "250px",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "0 0",
    background: "white",
  };

  return (
    <div className=" flex justify-center border cursor-grab  border-layer-accent-1 h-10 w-full max-w-64 items-center bg-layer-2">
      {id}
    </div>
  );
};
