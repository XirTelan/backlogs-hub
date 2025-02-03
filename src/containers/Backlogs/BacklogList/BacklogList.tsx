"use client";

import BacklogListData from "./BacklogListData";

import useSWR from "swr";
import { apiRoutesList } from "@/lib/routesList";
import { fetcher } from "@/utils";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import BacklogItemsTable, {
  BacklogItemsTableToolbar,
} from "./BacklogItemsTable";
import { useSearchParams } from "next/navigation";
import Pagination from "@/containers/Pagination";
import { useSession } from "@/providers/sessionProvider";

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

const Backloglist = ({ id, isOwner }: BackloglistProps) => {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  searchParams.append("backlog", id);
  const { user } = useSession();
  const pagination = user?.config?.pagination ?? "bottom";
  const requstUrl = `${apiRoutesList.items}?${searchParams.toString()}`;
  const isSearching =
    searchParams.get("search") || searchParams.get("categories");
  const { data, isLoading } = useSWR(requstUrl, fetcher);

  return (
    <>
      <BacklogItemsTableToolbar />
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
export default Backloglist;

interface BackloglistProps {
  id: string;
  isOwner: boolean;
}
