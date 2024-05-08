/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

export const Item = ({ id, ...props }) => {
  const style = {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "10px 0",
    background: "white",
  };

  return <div style={style}>{id}</div>;
};
