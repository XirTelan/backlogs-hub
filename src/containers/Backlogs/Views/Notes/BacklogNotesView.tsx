"use client";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import SearchBar from "@/components/SearchBar";
import SearchFilter from "@/containers/SearchFilter";
import { apiRoutesList } from "@/lib/routesList";
import { fetcher } from "@/utils";
import { BacklogItemDTO } from "@/zodTypes";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import BacklogNoteCard from "./BacklogNoteCard";
import { ItemFormModalOpen } from "@/containers/Items/ItemFormModal";

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
  const searchParams = new URLSearchParams(useSearchParams().toString());
  searchParams.append("backlog", backlogId);
  const requstUrl = `${apiRoutesList.items}?${searchParams.toString()}`;

  const { data, isLoading } = useSWR<items>(requstUrl, fetcher);

  if (isLoading) return <LoadingAnimation />;

  if (!data || !("items" in data)) return <p>Empty</p>;

  return (
    <div>
      <div className=" flex">
        <SearchBar />
        <SearchFilter />
        <ItemFormModalOpen btnOptions={{ style: { width: "25%" } }} />
      </div>
      <div className="flex gap-4 p-4 flex-wrap">
        {data.items.map((item) => {
          return <BacklogNoteCard item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default BacklogNotesView;
