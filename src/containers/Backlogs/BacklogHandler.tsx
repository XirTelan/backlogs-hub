"use client";
import React from "react";

const BacklogHandler = (id: string) => {
  const getBacklogById = async (id: string) => {
    const data = await fetch(`/api/backlogs/${id}`);
  };

  return <div>BacklogHandler</div>;
};

export default BacklogHandler;
