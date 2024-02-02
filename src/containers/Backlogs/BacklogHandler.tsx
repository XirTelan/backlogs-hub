"use client";
import { BacklogDTO } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterBlock from "../FilterBlock";

const BacklogHandler = () => {
  const { userName, backlog } = useParams();
  const [currentBacklog, setCurrentBacklog] = useState<BacklogDTO>();
  const [backlogData, setBacklogData] = useState([]);
  let search = "";
  if (typeof window !== "undefined") {
    search = window.location.search;
  }

  useEffect(() => {
    if (!userName || !backlog) return;
    const getBacklogInfo = async () => {
      try {
        const data = await fetch(
          `/api/backlogs?userName=${userName}&backlogTitle=${backlog}`,
        ).then((data) => data.json());
        setCurrentBacklog(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBacklogInfo();
  }, [userName, backlog]);

  useEffect(() => {
    if (!currentBacklog) return;
    const getBacklogData = async () => {
      try {
        const res = await fetch(
          `/api/backlogs/${currentBacklog._id}/data${search}`,
        );
        const data = await res.json();

        setBacklogData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBacklogData();
  }, [currentBacklog, search]);

  return (
    <div className="w-full">
      <div className="mb-2 flex w-full  rounded bg-neutral-900 p-4">
        {currentBacklog && (
          <FilterBlock backlogCategories={currentBacklog?.categories} />
        )}
      </div>
      <div>
        {backlogData &&
          backlogData.length > 0 &&
          backlogData.map((item) => <div key={item._id}>{item.title}</div>)}
      </div>
    </div>
  );
};

export default BacklogHandler;
