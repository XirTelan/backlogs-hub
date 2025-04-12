"use client";

import BacklogListData from "./BacklogListData";

import useSWR from "swr";
import { apiRoutesList } from "@/shared/lib/routesList";
import { fetcher } from "@/utils";
import SkeletonDataTable from "@/widgets/Backlog/BacklogTableView/ui/SkeletonDataTable";

import Pagination from "@/widgets/Backlog/BacklogTableView/ui/Pagination";
import { useSession } from "@/app_fsd/providers/sessionProvider";
import BacklogItemsTableToolbar from "./BacklogItemsTableToolbar";
import BacklogItemsTable from "./BacklogItemsTable";
import { useSearchParams } from "next/navigation";

const itemsNotFound = (
  <>
    <tr>
      <td colSpan={2} className=" p-4 text-center">
        <div className="flex w-full flex-col justify-center">
          <p className="mb-4 text-xl">Nothing found with selected filters</p>
        </div>
      </td>
    </tr>
  </>
);
const itemsDoesntExist = (
  <>
    <tr>
      <td colSpan={2} className=" p-4 text-center">
        <div className="flex w-full flex-col justify-center">
          <p className="mb-4 text-xl">Your backlog is empty yet</p>
          <p className=" text-text-secondary">Click Add new to get started</p>
        </div>
      </td>
    </tr>
  </>
);

export const BacklogDefaultView = ({ id, isOwner }: BackloglistProps) => {
  const searchParams = new URLSearchParams(useSearchParams()?.toString());
  searchParams.append("backlog", id);
  const { user } = useSession();
  const pagination = user?.config?.pagination ?? "bottom";
  const requstUrl = `${apiRoutesList.items}?${searchParams.toString()}`;
  const isSearching =
    searchParams.get("search") || searchParams.get("categories");
  const { data, isLoading } = useSWR(requstUrl, fetcher);

  return (
    <>
      <BacklogItemsTableToolbar showAction={!!user?._id} />
      {isLoading ? (
        <SkeletonDataTable />
      ) : (
        <>
          {["both", "top"].includes(pagination) && (
            <Pagination totalCount={data.totalCount} />
          )}

          <BacklogItemsTable>
            {data.totalCount > 0 ? (
              <BacklogListData data={data.items} isOwner={isOwner} />
            ) : isSearching ? (
              itemsNotFound
            ) : (
              itemsDoesntExist
            )}
          </BacklogItemsTable>
          {["both", "bottom"].includes(pagination) && (
            <Pagination totalCount={data.totalCount} />
          )}
        </>
      )}
    </>
  );
};

interface BackloglistProps {
  id: string;
  isOwner: boolean;
}
