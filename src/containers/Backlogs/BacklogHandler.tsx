"use client";
import { BacklogDTO } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BacklogHandler = () => {
  const { userName, list } = useParams();
  const [currentBacklog, setCurrentBacklog] = useState<BacklogDTO>();
  const [backlogData, setBacklogData] = useState([]);

  useEffect(() => {
    if (!userName || !list) return;
    const getBacklogInfo = async () => {
      try {
        const data = await fetch(
          `/api/backlogs?userName=${userName}&backlogTitle=${list[0]}`,
        ).then((data) => data.json());
        setCurrentBacklog(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBacklogInfo();
  }, [userName, list]);

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
        {/* <FilterBlock/> */}
        {currentBacklog?.categories.map((item) => <div key={item}>{item}</div>)}
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
