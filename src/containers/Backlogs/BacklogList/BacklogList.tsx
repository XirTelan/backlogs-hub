"use client";

import BacklogListData from "./BacklogListData";

import { BacklogDTO } from "@/zodTypes";
import { ModalProvider } from "@/providers/modalProvider";
import useSWR from "swr";
import { apiRoutesList } from "@/lib/routesList";
import { fetcher } from "@/utils";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import BacklogItemsTable, {
  BacklogItemsTableToolbar,
} from "./BacklogItemsTable";
import { useSearchParams } from "next/navigation";
import ItemChangeCategoryModal from "@/containers/Items/ItemChangeCategoryModal";
import ItemFormModal from "@/containers/Items/ItemFormModal";

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
      <ModalProvider>
        <BacklogItemsTableToolbar />
        {isLoading ? (
          <SkeletonDataTable />
        ) : (
          <BacklogItemsTable>
            {data.length > 0 ? (
              <BacklogListData
                data={data}
                categories={backlog.categories}
                isOwner={isOwner}
              />
            ) : searchTerm ? (
              itemsNotFound
            ) : (
              itemsDoesntExist
            )}
          </BacklogItemsTable>
        )}
        <ItemFormModal backlog={backlog} />
        <ItemChangeCategoryModal categories={backlog.categories} />
      </ModalProvider>
    </>
  );
};
export default Backloglist;

interface BackloglistProps {
  id: string;
  backlog: BacklogDTO;
  isOwner: boolean;
}
