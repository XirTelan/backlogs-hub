"use client";
import React from "react";
import ButtonBase from "./Common/UI/ButtonBase";

const BacklogListAdd = () => {
  return (
    <ButtonBase
      type="button"
      text="Add new"
      onClick={() => console.log("test")}
    />
  );
};

export default BacklogListAdd;
