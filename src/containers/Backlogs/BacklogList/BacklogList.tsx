"use client";

import BacklogListData from "./BacklogListData";

import { BacklogDTO } from "@/zodTypes";
import useSWR from "swr";
import { apiRoutesList } from "@/lib/routesList";
import { fetcher } from "@/utils";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import BacklogItemsTable, {
  BacklogItemsTableToolbar,
} from "./BacklogItemsTable";
import { useSearchParams } from "next/navigation";
import Pagination from "@/containers/Pagination";

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
          <p className=" text-secondary-text">Click Add new to get started</p>
        </div>
      </td>
    </tr>
  </>
);

const Backloglist = ({ id, backlog, isOwner }: BackloglistProps) => {
  const searchParams = new URLSearchParams(useSearchParams());
  searchParams.append("backlog", id);
  const requstUrl = `${apiRoutesList.items}?${searchParams.toString()}`;
  const searchTerm = searchParams.get("search");
  const { data, isLoading } = useSWR(requstUrl, fetcher);
  return (
    <>
      <BacklogItemsTableToolbar />
      {isLoading ? (
        <SkeletonDataTable />
      ) : (
        <>
          <BacklogItemsTable>
            {data.totalCount > 0 ? (
              <BacklogListData
                data={data.items}
                categories={backlog.categories}
                tags={backlog.tags}
                isOwner={isOwner}
              />
            ) : searchTerm ? (
              itemsNotFound
            ) : (
              itemsDoesntExist
            )}
          </BacklogItemsTable>
          <Pagination totalCount={data.totalCount} />
        </>
      )}
    </>
  );
};
export default Backloglist;

interface BackloglistProps {
  id: string;
  backlog: BacklogDTO;
  isOwner: boolean;
}
