"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const BacklogHandler = (id: string) => {
  const pathname = usePathname();
  const params = useParams();
  const getBacklogById = async (id: string) => {
    const data = await fetch(`/api/backlogs/${id}`);
  };

  return (
    <div>
      BacklogHandler
      <div>{pathname};</div>
      <div>{JSON.stringify(params)}</div>
    </div>
  );
};

export default BacklogHandler;
