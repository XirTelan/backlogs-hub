"use client";
import { BacklogDTO, BacklogItemDTO } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterBlock from "../FilterBlock";
import Backloglist from "./BacklogList";

const BacklogHandler = () => {
  const { userName, backlog } = useParams();
  const [currentBacklog, setCurrentBacklog] = useState<BacklogDTO>();
  const [categoriesMap, setCategoriesMap] = useState<Map<string, string>>();
  const [backlogData, setBacklogData] = useState<BacklogItemDTO[]>([]);
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
    const categoriesMap = new Map();
    currentBacklog.categories.forEach((category) => {
      categoriesMap.set(category.name.toLowerCase(), category.color);
    });
    setCategoriesMap(categoriesMap);
    getBacklogData();
  }, [currentBacklog, search]);

  const isData = backlogData && backlogData.length > 0 && categoriesMap;
  
  return (
    <>
      <section className="mb-4 flex w-full  rounded border border-neutral-800 bg-neutral-900 p-4">
        {currentBacklog && (
          <FilterBlock backlogCategories={currentBacklog?.categories} />
        )}
      </section>
      <section className="mb-4 flex w-full  rounded border border-neutral-800 bg-neutral-900 p-4">
        {isData && (
          <Backloglist categoriesMap={categoriesMap} items={backlogData} />
        )}
      </section>
    </>
  );
};

export default BacklogHandler;
