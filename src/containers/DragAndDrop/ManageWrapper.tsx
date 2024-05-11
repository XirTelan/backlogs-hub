"use client";
import SortableContainer from "@/components/dnd/SortableContainer";
import React from "react";
import DnDList from "./DnDList";

const ManageWrapper = ({ items, ...props }) => {
  return <DnDList data={items} />;
};

export default ManageWrapper;
