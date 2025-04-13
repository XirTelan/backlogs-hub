"use client";
import { LoadingAnimation } from "@/shared/ui";
import SearchBar from "@/features/search/searchBar/SearchBar";
import SearchFilter from "@/features/search/searchFilter/SearchFilter";
import { apiRoutesList } from "@/shared/constants/routesList";
import { fetcher } from "@/shared/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import BacklogNoteCard from "./BacklogNoteCard";
import { ItemFormModalOpen } from "@/features/backlogItem/createBacklogItem/ui/ItemFormModal";
import { BacklogItemDTO } from "@/shared/types";

type items =
  | {
      message: string;
      error: unknown;
    }
  | {
      totalCount: number;
      items: BacklogItemDTO[];
    };

const BacklogNotesView = ({ backlogId }: { backlogId: string }) => {
  const searchParams = new URLSearchParams(useSearchParams()?.toString());
  searchParams.append("backlog", backlogId);
  const requstUrl = `${apiRoutesList.items}?${searchParams.toString()}`;

  const { data, isLoading } = useSWR<items>(requstUrl, fetcher);

  if (isLoading)
    return (
      <>
        <FilterBlock />
        <LoadingAnimation />
      </>
    );

  if (!data || !("items" in data)) return <p>Empty</p>;

  return (
    <>
      <FilterBlock />
      <div className="flex gap-4 p-4 flex-wrap">
        {data.items.map((item) => {
          return <BacklogNoteCard item={item} key={item._id} />;
        })}
      </div>
    </>
  );
};

export default BacklogNotesView;

const FilterBlock = () => (
  <div className=" flex">
    <SearchBar />
    <SearchFilter />
    <ItemFormModalOpen btnOptions={{ style: { width: "25%" } }} />
  </div>
);
