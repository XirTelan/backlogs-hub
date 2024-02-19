"use client";
import { useParams } from "next/navigation";
import FilterBlock from "../FilterBlock";
import Backloglist from "./BacklogList";
import useBacklogData from "@/hooks/useBacklogData";
import toast from "react-hot-toast";

const BacklogHandler = () => {
  const { userName, backlog } = useParams<{
    userName: string;
    backlog: string;
  }>();
  let search = "";
  if (typeof window !== "undefined") {
    search = window.location.search;
  }

  const {
    currentBacklog,
    backlogData,
    categoriesMap,
    isLoading,
    updateBacklogData,
  } = useBacklogData(userName, backlog, search);
  const onDelete = async (id: string, backlogId: string) => {
    const res = await fetch(`/api/backlogs/${backlogId}/items/${id}`, {
      method: "DELETE",
    });
    await res.json();
    toast.success(`Deleted`);
    updateBacklogData();
  };

  const isData = backlogData && backlogData.length > 0 && categoriesMap;
  return (
    <>
      <section className="mb-4 flex w-full  rounded p-4">
        {currentBacklog && (
          <FilterBlock
            backlogSlug={currentBacklog.slug}
            backlogCategories={currentBacklog.categories}
          />
        )}
      </section>
      <section className="mb-4 flex w-full  rounded  p-4">
        {isData && !isLoading && (
          <Backloglist
            onDelete={onDelete}
            categoriesMap={categoriesMap}
            items={backlogData}
          />
        )}
        {isLoading && <div>Loading...</div>}
      </section>
    </>
  );
};

export default BacklogHandler;
