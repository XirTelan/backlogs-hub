"use client";
import { BacklogDTO } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterBlock from "../FilterBlock";

const BacklogHandler = () => {
  const { userName, backlog } = useParams();
  const [currentBacklog, setCurrentBacklog] = useState<BacklogDTO>();
  const [backlogData, setBacklogData] = useState([]);

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
        const res = await fetch(`/api/backlogs/${currentBacklog._id}/data`);
        const data = await res.json();

        setBacklogData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBacklogData();
  }, [currentBacklog]);

  return (
    <div>
      BacklogHandler
      <div className="flex ">
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
